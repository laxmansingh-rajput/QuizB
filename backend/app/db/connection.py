from ..config.logger import logger
from ..utils.basic_utils import table_creation_on_server_start



def getConnection(connection_pool):
    try:
        if connection_pool is None:
            raise Exception("Connection pool not initialized")
        return connection_pool.getconn()
    except Exception as e:
        logger.error(f"Unable to get connection: {e}")
        return None

def returnConnection(connection_pool ,conn):
    try:
        if conn:
            connection_pool.putconn(conn)
    except Exception as e:
        logger.error(f"Unable to return connection: {e}")

