from pydantic import BaseModel,Field,field_validator,model_validator
from typing import List,Optional
from datetime import datetime
from .question import Question

class Quiz(BaseModel):
    quiz_title : str = Field(max_length =200,min_length=1)
    questions: List[Question]
    start:  Optional[datetime]=None
    end: Optional[datetime]=None
    quiz_type: str
    password:Optional[int] # it is in minutes
    quiz_duration:Optional[int] =None

    @field_validator('quiz_type')
    @classmethod
    def quiz_type_validator(cls,value):
        valid_type = ['Practice','Normal','Compete','Saved']

        if value not in valid_type :
            raise ValueError('Please Enter a Valid Quiz type')
        
        return value
    
    @field_validator('quiz_duration',mode="after")
    @classmethod
    def quiz_duration_validator(cls,value):
        if not (1 <= value <= 300): 
            raise ValueError('Please Enter a Valid Quiz Duration')
        return value
    
    @model_validator(mode="after")
    def check_passwords(self):
        if self.quiz_type != 'Saved' and (self.start is None or self.end  is  None or self.password  is  None or 
                                          self.quiz_duration  is  None  ) :
            raise ValueError("start, end and password are required for non-Saved quizzes.")
        return self 