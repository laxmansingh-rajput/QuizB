from ..models.quiz import Quiz
from datetime import datetime,UTC
from fastapi_clerk_auth import  HTTPAuthorizationCredentials
from fastapi import Depends
from fastapi.exceptions import HTTPException
from ..services.Clerk_services import clerk_auth_guard
from ..db.add_query import insert_quiz
from ..config.logger import logger
from ..utils.basic_utils import get_secret_sting
import traceback

def addQuiz(quizData:Quiz, credentials: HTTPAuthorizationCredentials = Depends(clerk_auth_guard)):
    try:
        quiz = quizData.model_dump()
        user_id = credentials.decoded["sub"]
        quiz_string = get_secret_sting(6)

        payload = {
            'quiz_title' :quiz['quiz_title'], 
            'published_date':datetime.now(UTC) , 
            'quiz_type' :quiz['quiz_type'], 
            'start_date'  :quiz['start'], 
            'expiry_date':quiz['end'] , 
            'quiz_duration':quiz['quiz_duration'] , 
            'quiz_password' :quiz['password'], 
            'publish_code': None if quiz['quiz_type'] == 'Saved' else quiz_string
        }

        status = insert_quiz(payload, quiz['questions'],user_id)

        if status:
            return {
                'success':True,
                'message':'Recived the data successs fully'
            }
        
        else: 
            raise Exception('Failed to add data in the db')
        
    except Exception as e :
        logger.error(f"unable to process the addQuiz: {e}")
        traceback.print_exc()

        raise HTTPException(
            status_code=400,
            detail="Some thing went wrong"
        )
    
