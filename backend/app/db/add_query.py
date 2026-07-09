from ..config import postgres
from ..config.logger import logger 

insert_into_query = """
INSERT INTO Quiz_table
(
    quiz_title,
    published_date,
    quiz_type,
    start_date,
    expiry_date,
    quiz_duration,
    quiz_password,
    publish_code
)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING quiz_id;
"""
inserting_into_question_query = """
INSERT INTO Question_table
(
    question,
    option1,
    option2,
    option3,
    option4,
    question_type,
    correct_option
)
VALUES
($1, $2, $3, $4, $5, $6, $7)
RETURNING question_id;
"""
insert_into_quiz_question_map_query = """
INSERT INTO Quiz_Question_map_table
(
    quiz_id,
    question_id
)
VALUES
($1, $2);
"""
insert_into_quiz_user_map_query = """
INSERT INTO Quiz_User_map_table
(
    quiz_id,
    user_id
)
VALUES
($1, $2);
"""

data_with_userid_and_user_title ="""
    SELECT 1 FROM 
    Quiz_User_map_table LEFT JOIN Quiz_table
    ON Quiz_User_map_table.quiz_id = Quiz_table.quiz_id
    WHERE 
    quiz_title = $1
"""


async def insert_into_question(questions,connection,quiz_id):
    try:
        for question in questions:
            option1,option2,option3,option4 = question['option']
            question_id= await connection.fetchval(inserting_into_question_query,
                        question['question'],option1,option2,option3,option4,question['question_type'],question['correct_option']
                        )
            await connection.fetch(insert_into_quiz_question_map_query,quiz_id,question_id)

        return True
    except Exception as e:
        logger.error(f"Unable to insert question : {e}")
        return False


async def insert_quiz(payload, questions,user_id):
    connection_pool = postgres.connection_pool
    try:
        async with connection_pool.acquire() as connection:      
            async with connection.transaction():
                try:
                    rows = await connection.fetch(
                        data_with_userid_and_user_title,
                        payload["quiz_title"]
                    )
                    if len(rows) is not 0:
                        return {
                            'success': False,
                                'message': 'Quiz with the same title already exists'
                                }
                    print(len(rows))
                    quiz_id =await connection.fetchval(insert_into_query,payload['quiz_title'],payload['published_date'],payload['quiz_type'],
                    payload['start_date'],payload['expiry_date'],payload['quiz_duration'],payload['quiz_password'],payload['publish_code'])

                    status = await insert_into_question(questions,connection,quiz_id)
                    if status:
                        await connection.fetch(insert_into_quiz_user_map_query,quiz_id,user_id)
                        return {'success': True}
                    else:
                        raise Exception("Failed to insert questions")
                
                except Exception as e:
                    logger.error(f"Unable to insert quiz : {e}")
                    return {'success': False, 'message': 'Something went wrong'}
                
    except Exception as e:
        logger.error(f"Failed to insert the quiz and question due: {e}")