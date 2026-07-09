import asyncpg
from ..utils.basic_utils import table_creation_on_server_start
from ..db.creation_queries import create_quiz_table
from .logger import logger

connection_pool =  None

async def getConnectionPool():
    global connection_pool
    try:
        connection_pool = await asyncpg.create_pool(
            min_size=1,
            max_size=10,
            database="quizB",
            user="postgres",
            password="1234",
            host="127.0.0.1",
            port=5432,
        )   
    except Exception as e:
        logger.error(f"Unable to create connection pool: {e}")
        return None



