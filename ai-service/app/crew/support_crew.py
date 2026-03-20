import json
import re
from crewai import Crew, Process
from app.agents.classifier import make_classifier_agent
from app.agents.reply_drafter import make_reply_drafter_agent
from app.agents.qa_reviewer import make_qa_reviewer_agent
from app.crew.tasks import (
    make_classification_task,
    make_draft_reply_task,
    make_qa_review_task,
)
from app.schemas.result import TicketResult

def extract_json(text: str) -> dict:
    """Extract JSON from agent output which may contain extra text."""
    try:
        return json.loads(text.strip())
    except Exception:
        match = re.search(r'\{.*\}', text, re.DOTALL)
        if match:
            return json.loads(match.group())
        return {}

def run_support_crew(ticket) -> TicketResult:
    # 1. Make agents
    classifier = make_classifier_agent()
    drafter = make_reply_drafter_agent()
    reviewer = make_qa_reviewer_agent()

    # 2. Make tasks
    classify_task = make_classification_task(classifier, ticket)
    draft_task = make_draft_reply_task(drafter, ticket, "")
    qa_task = make_qa_review_task(reviewer, "", ticket)

    # 3. Assemble and run crew
    crew = Crew(
        agents=[classifier, drafter, reviewer],
        tasks=[classify_task, draft_task, qa_task],
        process=Process.sequential,
        verbose=True,
    )

    result = crew.kickoff()

    # 4. Parse results from each task output
    try:
        classify_output = extract_json(classify_task.output.raw)
        category   = classify_output.get("category", "general")
        urgency    = classify_output.get("urgency", "medium")
        sentiment  = classify_output.get("sentiment", "neutral")
        confidence = float(classify_output.get("confidence", 0.75))
    except Exception:
        category, urgency, sentiment, confidence = "general", "medium", "neutral", 0.75

    try:
        qa_output   = extract_json(qa_task.output.raw)
        final_reply = qa_output.get("final_reply", str(result))
    except Exception:
        final_reply = str(result)

    return TicketResult(
        ticket_id=ticket.id,
        category=category,
        urgency=urgency,
        sentiment=sentiment,
        confidence=confidence,
        draft_reply=final_reply,
        kb_sources=[],
    )
