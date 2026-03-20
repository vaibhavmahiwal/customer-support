from crewai import Agent

def make_reply_drafter_agent(llm=None, tools=None):
    return Agent(
        role="Customer Reply Drafter",
        goal=(
            "Write a helpful, empathetic, and accurate reply to a customer "
            "support ticket using the knowledge base and ticket context."
        ),
        backstory=(
            "You are a senior customer success specialist known for writing "
            "replies that are clear, warm, and solve the customer's problem "
            "on the first response. You always search the knowledge base "
            "before drafting."
        ),
        verbose=True,
        allow_delegation=False,
        tools=tools or [],
        llm=llm,
    )
