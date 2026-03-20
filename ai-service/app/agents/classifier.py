from crewai import Agent

def make_classifier_agent(llm=None):
    return Agent(
        role="Support Ticket Classifier",
        goal=(
            "Read a customer support ticket and classify it accurately. "
            "Output the category, urgency level, and customer sentiment."
        ),
        backstory=(
            "You are an expert support analyst with 10 years of experience "
            "triaging customer issues. You instantly recognize patterns in "
            "support tickets and categorize them precisely."
        ),
        verbose=True,
        allow_delegation=False,
        llm=llm,
    )
