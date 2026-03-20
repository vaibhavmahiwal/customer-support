from crewai import Agent

def make_reply_drafter_agent(llm=None, tools=None):
    return Agent(
        role="Customer Reply Drafter",
        goal="Write a helpful, empathetic reply to a customer support ticket.",
        backstory="Senior customer success specialist known for clear, warm replies.",
        verbose=True,
        allow_delegation=False,
        tools=tools or [],
        llm=llm,
    )