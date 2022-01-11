import api
import service
from loguru import logger
from starlette.middleware.cors import CORSMiddleware
import os
from fastapi import FastAPI
from env import HOST_IP, HOST_PORT, REDIS_DB
from util.Redis import Redis
from service import static_folder
from starlette.staticfiles import StaticFiles

app = FastAPI()

app.mount("/static", StaticFiles(directory=static_folder()), name="static")  # 挂载静态文件，指定目录

app.include_router(api.code_router, tags=["AUth Common"], prefix="/auth")
app.include_router(api.admin_router, tags=["Admin"], prefix="/admin")
app.include_router(api.warehouse_router, tags=["WareHouse"], prefix="/warehouse")
app.include_router(api.freight_router, tags=["Freight"], prefix="/freight")
app.include_router(api.application_router, prefix="/application")
app.include_router(api.uploading_router, tags=['uploading'], prefix="/uploading")


# 解决跨域问题
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
redis = Redis()

# 获取redis连接
redis_connection = redis.get_redis_connection()
# 监听过期事件
# pubsub = redis_connection.pubsub()
# pubsub.psubscribe(**{f'__keyevent@{REDIS_DB}__:expired': service.event_handler})
# pubsub.run_in_thread(sleep_time=0.01)

if __name__ == '__main__':
    import uvicorn

    logger.add(os.path.expanduser("logger.log"))
    uvicorn.run(app, host=HOST_IP, port=HOST_PORT, debug=True)