# Support AI Service — Python + FastAPI + CrewAI

## Quick start

# 1. Create virtual environment
python -m venv venv

# 2. Activate it
# Mac/Linux:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# 3. Install packages
pip install -r requirements.txt

# 4. Set up env
cp .env.example .env
# Add your OPENAI_API_KEY to .env

# 5. Run the server
uvicorn app.main:app --reload --port 8000

## Endpoints
POST  /process-ticket   Receives ticket, runs CrewAI crew, returns result
GET   /health           Health check

## Test
pytest tests/
