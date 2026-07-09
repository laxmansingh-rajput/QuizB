from fastapi import APIRouter 
from ..services.creation import addQuiz

creationRouter = APIRouter()

creationRouter.add_api_route("/add_quiz", addQuiz, methods=["POST"])