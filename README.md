# QuizB - Interactive AI-Powered Quiz Platform

QuizB is a modern, feature-rich web application designed for creating, practicing, sharing, and hosting interactive quizzes, surveys, and assessments. By combining a clean, responsive React frontend with a high-performance Python FastAPI backend, QuizB makes quiz creation and play engaging, seamless, and dynamic.

### 🌐 Live Demo
> [!NOTE]
> **Live Link:** Uploading the live link and deploying the platform soon! Stay tuned!

---

## ✨ Features

- **Intuitive Workspace Builder:** Craft quizzes with advanced settings, single/multiple-correct question types, custom options, passwords, and custom time frames (start/end dates).
- **Flexible Modes:**
  - **Practice:** Self-paced learning modules for skill reinforcement.
  - **Host:** Live scheduled quiz sessions requiring code/passcode authentication.
  - **Compete:** Fast-paced competitive matches for testing skills against time.
  - **Saved Drafts:** Manage unpublished or in-progress creations in your personalized workspace.
- **Dynamic Dashboard:** Custom user dashboard containing navigation sidebars, custom branding, premium tier highlights, and quick-join portals.
- **Stunning UI/UX:** Powered by Tailwind CSS v4, smooth animations, and context-driven appearance controls for a high-fidelity visual experience.
- **Robust Schema Validation:** Pydantic models in the backend guarantee strict validation of question structure, choice bounds, and date restrictions.

---

## 🛠️ Technology Stack

- **Frontend:** React 19, Vite, Tailwind CSS v4, React Router 7, Axios, Context API
- **Backend:** FastAPI (Python), Pydantic
- **Auth Service:** Clerk Authentication

---

## 🚀 Upcoming & Planned Integrations

We are actively expanding the functionality of QuizB. The following advanced integrations are currently in progress:

- **Redis Caching:** Incorporating Redis caching to accelerate session lookups, store active quiz states, and handle high-traffic host events with minimal database load.
- **RAG (Retrieval-Augmented Generation) with LangChain:** Implementing LangChain-driven RAG workflows to ingest document assets (PDFs, documents, class notes) and automatically generate relevant, high-quality contextual quizzes.
- **Qdrant Vector Database:** Integrating Qdrant vector database to store and search document embeddings, enabling semantic search and similarity retrieval for contextual question creation.
- **Expanded AI Creation Types:** Smarter automated quiz drafting from custom user prompts, articles, and websites.

---

## 💻 Getting Started

### Setup Backend
1. Navigate to the `backend` directory.
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure environment variables in the `.env` file:
   ```env
   ENVIRONMENT=development
   FRONTEND_URL=http://localhost:5173/
   LOCAL_FRONTEND_URL=http://localhost:5173/
   ```
5. Start the FastAPI server:
   ```bash
   fastapi dev app/main.py
   ```

### Setup Frontend
1. Navigate to the `frontend` directory.
2. Install the packages using npm:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
