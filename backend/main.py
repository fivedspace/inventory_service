import api
from loguru import logger
from starlette.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from env import HOST_IP, HOST_PORT
from util.Redis import Redis
from service import static_folder
from starlette.staticfiles import StaticFiles

app = FastAPI(docs_url="/inventory/docs", openapi_url="/inventory/openapi.json")

app.mount("/mediafile", StaticFiles(directory=static_folder()), name="mediafile")  # 挂载静态文件，指定目录

app.include_router(api.code_router, tags=["AUth Common"], prefix="/inventory/auth")
app.include_router(api.admin_router, tags=["Admin"], prefix="/inventory/admin")
app.include_router(api.warehouse_router, tags=["WareHouse"], prefix="/inventory/warehouse")
app.include_router(api.freight_router, tags=["Freight"], prefix="/inventory/freight")
app.include_router(api.application_router, tags=["Applications"], prefix="/inventory/application")
app.include_router(api.uploading_router, tags=['uploading'], prefix="/inventory/uploading")

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

if __name__ == '__main__':
    import uvicorn

    logger.add("./log/{time}.log", rotation='00:00', compression='zip')
    uvicorn.run(app="main:app", host=HOST_IP, port=HOST_PORT, debug=True, reload=True)
