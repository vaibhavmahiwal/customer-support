from crewai import Agent

def make_qa_reviewer_agent(llm=None):
    return Agent(
        role="Reply Quality Reviewer",
        goal=(
            "Review a drafted customer reply for tone, accuracy, and "
            "completeness. Approve it or return it with specific feedback."
        ),
        backstory=(
            "You are a quality assurance specialist who ensures every "
            "customer reply meets the highest standards. You check for "
            "empathy, accuracy, and whether all parts of the question "
            "were addressed."
        ),
        verbose=True,
        allow_delegation=False,
        llm=llm,
    )
