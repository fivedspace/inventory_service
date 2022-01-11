#! /usr/bin/env python

# coding=UTF-8
# import requests
from fastapi import WebSocket
from typing import Dict

active_connections: Dict[int, WebSocket] = {}


async def connect(order_id, websocket: WebSocket):
    await websocket.accept()
    # 存储ws连接对象
    active_connections[order_id] = (websocket)


def disconnect(order_id, websocket: WebSocket):
    # 关闭时 移除ws对象
    active_connections[order_id].remove(websocket)


async def send_data(order_id, message: str):
    # 发送个人消息
    await active_connections[order_id].send_text(message)


async def broadcast(message):
    print(active_connections)
    for connection in active_connections:
        await connection.send_text(message)
