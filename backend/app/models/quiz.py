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
    password:Optional[int] 

    @field_validator('quiz_type')
    @classmethod
    def quiz_type_validator(cls,value):
        valid_type = ['Practice','Host','Compete','Saved']

        if value not in valid_type :
            raise ValueError('Please Enter a Valid Quiz_type')
        
        return value
    
    @model_validator(mode="after")
    def check_passwords(self):
        print(self)
        if self.quiz_type != 'Saved' and (self.start is None or self.end  is  None or self.password  is  None ) :
            raise ValueError("start, end and password are required for non-Saved quizzes.")
        return self 