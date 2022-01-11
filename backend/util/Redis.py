import env
import redis


class Redis:
    def __init__(self):
        self._redis: redis = None

    def get_redis_connection(self):
        if not self._redis:
            self._redis = redis.StrictRedis(host=env.REDIS_HOST, port=env.REDIS_PORT, db=env.REDIS_DB,
                                            password=env.REDIS_PASSWORD)
        return self._redis

    async def get_value(self, key: str):
        value = await self._redis.get(key)
        return value
