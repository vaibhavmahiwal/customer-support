from crewai import Task

def make_classification_task(agent, ticket):
    return Task(
        description=f"""
        Classify this customer support ticket:

        Subject: {ticket.subject}
        Body: {ticket.body}
        Priority: {ticket.priority}

        Return ONLY a JSON object with these exact fields:
        {{
            "category": "billing|technical|shipping|general",
            "urgency": "low|medium|high|critical",
            "sentiment": "frustrated|neutral|happy",
            "confidence": 0.0 to 1.0
        }}
        """,
        agent=agent,
        expected_output="A JSON object with category, urgency, sentiment, and confidence fields.",
    )

def make_draft_reply_task(agent, ticket, classification_result):
    return Task(
        description=f"""
        Write a customer support reply for this ticket:

        Subject: {ticket.subject}
        Body: {ticket.body}
        Customer Email: {ticket.customerEmail}
        Classification: {classification_result}

        Guidelines:
        - Be empathetic and professional
        - Address every question or issue raised
        - Keep it concise (under 150 words)
        - End with an offer to help further

        Return ONLY the plain text reply, no subject line needed.
        """,
        agent=agent,
        expected_output="A plain text customer reply under 150 words.",
    )

def make_qa_review_task(agent, draft_reply, ticket):
    return Task(
        description=f"""
        Review this draft reply for quality:

        Original ticket: {ticket.subject} — {ticket.body}
        Draft reply: {draft_reply}

        Check for:
        1. Empathetic tone
        2. Accuracy (no false promises)
        3. All issues addressed
        4. Professional language

        If the reply passes, return: {{"approved": true, "final_reply": "<the reply text>"}}
        If it fails, return: {{"approved": false, "feedback": "<what needs fixing>", "final_reply": "<improved reply>"}}
        """,
        agent=agent,
        expected_output="A JSON object with approved boolean and final_reply string.",
    )
