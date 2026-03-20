from crewai import Agent

def make_qa_reviewer_agent(llm=None):
    return Agent(
        role="Reply Quality Reviewer",
        goal="Review a drafted reply for tone, accuracy, and completeness.",
        backstory="QA specialist ensuring every reply meets the highest standards.",
        verbose=True,
        allow_delegation=False,
        llm=llm,
    )