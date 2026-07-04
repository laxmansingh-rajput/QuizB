from fastapi import APIRouter ,HTTPException
from ..models.quiz import Quiz
creationRouter = APIRouter()

@creationRouter.post('/add_quiz')
def addQuiz(quizData:Quiz):
    try:
        print(quizData)
        return {
            'success':True,
            'message':'Recived the data successs fully'
        }
    except ValueError as e:
        print(e)  
        raise HTTPException(
            status_code=400,
            detail="Invalid quiz data."
        )