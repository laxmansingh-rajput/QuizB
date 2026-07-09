from ..utils.basic_utils import table_creation_on_server_start
from ..config.logger import logger

# language=SQL
create_quiz_table = """
CREATE TABLE IF NOT EXISTS Quiz_table (
    quiz_id SERIAL PRIMARY KEY,
    quiz_title VARCHAR(255),
    published_date TIMESTAMPTZ,
    quiz_type VARCHAR(255),
    start_date TIMESTAMPTZ,
    expiry_date TIMESTAMPTZ,
    quiz_duration INTEGER,
    quiz_password INTEGER,
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
    last_edited TIMESTAMPTZ DEFAULT NOW()
);
"""

async def create_query_table(conn):
        try:
            await conn.fetch(create_quiz_table)
            await conn.fetch(create_question_table)
            await conn.fetch(create_quiz_question_map_table)
            await conn.fetch(create_quiz_user_map_table)
        except Exception as e:
            logger.error(f"Unable to create table : {e}")
