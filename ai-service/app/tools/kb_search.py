from crewai_tools import BaseTool

class KBSearchTool(BaseTool):
    name: str = "Knowledge Base Search"
    description: str = (
        "Search the company knowledge base for relevant articles, "
        "FAQs, and documentation to help answer customer questions."
    )

    def _run(self, query: str) -> str:
        # TODO: connect to Chroma or Pinecone vector store
        # For now returns a placeholder
        return f"No KB results found for: {query}. Use your general knowledge to respond."
