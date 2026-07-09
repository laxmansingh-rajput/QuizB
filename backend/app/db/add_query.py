from ..config import postgres
from ..db.connection import getConnection,returnConnection
from ..config.logger import logger 

insert_into_query = """
INSERT INTO Quiz_table
( quiz_title , published_date , quiz_type , start_date , expiry_date , quiz_duration , quiz_password , publish_code )
VALUES
(%s,%s,%s,%s,%s,%s,%s,%s)
RETURNING quiz_id
"""

inserting_into_question_query = """
INSERT INTO Question_table
( question , option1 , option2 , option3 , option4 , question_type , correct_option)
VALUES
(%s,%s,%s,%s,%s,%s,%s)
RETURNING question_id
"""

insert_into_quiz_question_map_query = """
INSERT INTO Quiz_Question_map_table
( quiz_id , question_id )
VALUES
(%s,%s)
"""

insert_into_quiz_user_map_query = """
INSERT INTO Quiz_User_map_table
( quiz_id , user_id )
VALUES
(%s,%s)
"""

def insert_into_question(questions,cur,quiz_id):
    try:
        for question in questions:
            option1,option2,option3,option4 = question['option']
            cur.execute(inserting_into_question_query,
                        (question['question'],option1,option2,option3,option4,question['question_type'],question['correct_option'])
                        )
            question_id = cur.fetchone()
            cur.execute(insert_into_quiz_question_map_query,(quiz_id,question_id))
        return True
    except Exception as e:
        logger.error(f"Unable to insert question : {e}")
        return False


def insert_quiz(payload, questions,user_id):
    connection_pool = postgres.connection_pool
    connection = getConnection(connection_pool)
    if connection is None:
        logger.error("failed to get connection to insert quiz {e}")
        return False
        
    try:
        cur = connection.cursor();
        cur.execute(insert_into_query,(payload['quiz_title'],payload['published_date'],payload['quiz_type'],
        payload['start_date'],payload['expiry_date'],payload['quiz_duration'],payload['quiz_password'],payload['publish_code']))
        quiz_id = cur.fetchone()
        status = insert_into_question(questions,cur,quiz_id)

        if status:
            cur.execute(insert_into_quiz_user_map_query,(quiz_id,user_id))
            connection.commit()
            return True
        else:
            raise Exception("Failed to insert questions")
        
    except Exception as e:
        logger.error(f"Unable to insert quiz : {e}")
        connection.rollback()
        return False
    
    finally:
        cur.close()
        returnConnection(connection_pool,connection)