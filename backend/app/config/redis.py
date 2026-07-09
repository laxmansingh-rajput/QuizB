import redis
from logger import logger

try:
    redis_store = redis.Redis(host='localhost', port=6379, decode_responses=True)
except Exception as e:
    logger.error(f"unable to create a redis store: {e}")
