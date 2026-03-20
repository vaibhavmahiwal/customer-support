from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from app.main import app

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"

def test_process_ticket():
    mock_result = {
        "ticket_id": "test-123",
        "category": "technical",
        "urgency": "medium",
        "sentiment": "frustrated",
        "confidence": 0.91,
        "draft_reply": "Hi, sorry to hear that. Here is how to fix it...",
        "kb_sources": []
    }
    with patch("app.api.routes.run_support_crew", return_value=MagicMock(**mock_result)):
        response = client.post("/process-ticket", json={
            "id": "test-123",
            "subject": "Cannot login",
            "body": "I keep getting an error when I try to login.",
            "customerEmail": "test@example.com"
        })
    assert response.status_code == 200
