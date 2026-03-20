from crewai import Agent

def make_classifier_agent(llm=None):
    return Agent(
        role="Support Ticket Classifier",
        goal="Read a customer support ticket and classify it accurately.",
        backstory="Expert support analyst with 10 years triaging customer issues.",
        verbose=True,
        allow_delegation=False,
        llm=llm,
    )