#! /usr/bin/env python

# coding=UTF-8

import requests
import json


class CommonReq:
    """
        向url发送请求
        :param url: 接口地址
        :param headers: 请求头文件
        :param data: 接口请求参数
        :response: 结果
    """
    headers = {'Content-Type': 'application/json'}

    def __init__(self, url=None, method="get", data=None, headers=None, token=None) -> None:
        response_data = None
        if headers is None:
            headers = headers
        method = method.upper()
        if method == "POST":
            response_data = requests.post(url=url, data=data, headers=headers)
        elif method == "GET":
            response_data = requests.get(url=url, params=data, headers=headers)
        elif method == "PATCH":
            response_data = requests.patch(url=url, data=data, headers=headers)
        self.data = json.loads(response_data.text)
