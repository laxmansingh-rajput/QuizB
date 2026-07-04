from pydantic import BaseModel,field_validator,Field
from typing import List

class Question(BaseModel):
    question: str = Field(max_length = 500 , min_length = 10)
    option: List[str]
    correct_option:List[str] = Field(max_length = 4)
    question_type : str

    @field_validator('option')
    @classmethod
    def  option_length_validator(cls, value:str):
        if(len(value)<=0 or len(value)>150):
            raise ValueError("The Length of the question must be greater than 0 and less than 150 characters")
        return value
    
    @field_validator('question_type')
    @classmethod
    def  quiz_type_validator(cls, value:str):
        if(value not in ['Single','Multiple']):
            raise ValueError("Please mention the correct question type")
        return value
    

