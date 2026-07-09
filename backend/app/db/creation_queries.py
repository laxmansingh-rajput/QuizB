from ..utils.basic_utils import table_creation_on_server_start
from ..config.logger import logger

# language=SQL
create_quiz_table = """
CREATE TABLE IF NOT EXISTS Quiz_table (
    quiz_id SERIAL PRIMARY KEY,
    quiz_title VARCHAR(255),
    published_date TIMESTAMP,
    quiz_type VARCHAR(255),
    start_date TIMESTAMP,
    expiry_date TIMESTAMP,
    quiz_duration INTEGER,
    quiz_password VARCHAR(255),
    publish_code VARCHAR(255) UNIQUE,
    attempted_count INTEGER DEFAULT 0,
    average_score NUMERIC(5,2) DEFAULT 0
);
"""

create_question_table = """
CREATE TABLE IF NOT EXISTS Question_table (
    question_id SERIAL PRIMARY KEY,
    question VARCHAR(255),
    option1 VARCHAR(255),
    option2 VARCHAR(255),
    option3 VARCHAR(255),
    option4 VARCHAR(255),
    question_type VARCHAR(255),
    correct_option VARCHAR(255)[]
);
"""
create_quiz_question_map_table = """
CREATE TABLE IF NOT EXISTS Quiz_Question_map_table (
    qq_id SERIAL PRIMARY KEY,
    quiz_id INTEGER NOT NULL REFERENCES Quiz_table(quiz_id),
    question_id INTEGER NOT NULL REFERENCES Question_table(question_id));
"""

create_quiz_user_map_table = """
CREATE TABLE IF NOT EXISTS Quiz_User_map_table (
    qu_id SERIAL PRIMARY KEY,   
    quiz_id INTEGER NOT NULL REFERENCES Quiz_table(quiz_id),
    user_id VARCHAR(255) NOT NULL,
    last_edited TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
"""

def create_query_table(conn):
        cur = conn.cursor()
        try:
            cur.execute(create_quiz_table)
            cur.execute(create_question_table)
            cur.execute(create_quiz_question_map_table)
            cur.execute(create_quiz_user_map_table)
            conn.commit()
        except Exception as e:
            conn.rollback()
            logger.error(f"Unable to create table : {e}")
        finally:
            cur.close()
