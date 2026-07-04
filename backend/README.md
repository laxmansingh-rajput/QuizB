# QuizB Backend

This is the FastAPI backend application for QuizB, utilizing FastAPI, Pydantic for data validation, and Clerk Services.

For full project details, roadmap, and frontend setup instructions, please refer to the main [Root README.md](../README.md).

## 🚀 Quick Start

### Installation & Environment Setup

Navigate to the `backend` directory, create a virtual environment, and install package dependencies:
```bash
# Create virtual environment
python -m venv .venv

# Activate virtual environment
# On Linux/macOS:
source .venv/bin/activate
# On Windows:
.venv\Scripts\activate

# Install requirements
pip install -r requirements.txt
```

### Running Locally

To spin up the FastAPI development server:
```bash
fastapi dev app/main.py
```
The server will run locally at [http://127.0.0.1:8000](http://127.0.0.1:8000).
