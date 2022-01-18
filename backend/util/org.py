#! /usr/bin/env python

# coding=UTF-8
# import requests

# import cv2
# from av import VideoFrame
# from aiortc import MediaStreamTrack

from env import HOST_IP,HOST_PORT,APPLICATION_ID,ORDER_TRANSATION_MERT_ID,TRANSTYPE

class OrderBox:
    def __init__(self,data = None):
        self.application_id = APPLICATION_ID
        self.mert_id = ORDER_TRANSATION_MERT_ID
        self.notifyurl = "http://{}:{}/orders/callback".format(HOST_IP, HOST_PORT)
        self.order_details = []
        self.order_id = str(data.id)
        self.order_ip = HOST_IP
        self.pay_mode = data.paytype
        self.remark =""
        self.total_money = data.money
        self.transtype = TRANSTYPE
        
        order_detail_box = [
            {"bank_name":"陕西中豪公户","bank_number":"123456789","good_details":data.order_details}
        ]
        for order in order_detail_box:
            list_good = []
            keys = ['category', 'good_id','good_title','price','remark']
                
            for good in order["good_details"]:

                values = ["柜机服务", str(good.gridid), f"{good.grid}号格子", good.price, ""]
                data = dict(zip(keys, values))
                list_good.append(data)
            order["good_details"] = list_good
            
            self.order_details.append(order)
        
        

# class VideoTransformTrack(MediaStreamTrack):
#     """
#     A video stream track that transforms frames from an another track.
#     """

#     kind = "video"

#     def __init__(self, track, transform):
#         super().__init__()  # don't forget this!
#         self.track = track
#         self.transform = transform

#     async def recv(self):
#         frame = await self.track.recv()

#         if self.transform == "cartoon":
#             img = frame.to_ndarray(format="bgr24")

#             # prepare color
#             img_color = cv2.pyrDown(cv2.pyrDown(img))
#             for _ in range(6):
#                 img_color = cv2.bilateralFilter(img_color, 9, 9, 7)
#             img_color = cv2.pyrUp(cv2.pyrUp(img_color))

#             # prepare edges
#             img_edges = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
#             img_edges = cv2.adaptiveThreshold(
#                 cv2.medianBlur(img_edges, 7),
#                 255,
#                 cv2.ADAPTIVE_THRESH_MEAN_C,
#                 cv2.THRESH_BINARY,
#                 9,
#                 2,
#             )
#             img_edges = cv2.cvtColor(img_edges, cv2.COLOR_GRAY2RGB)

#             # combine color and edges
#             img = cv2.bitwise_and(img_color, img_edges)

#             # rebuild a VideoFrame, preserving timing information
#             new_frame = VideoFrame.from_ndarray(img, format="bgr24")
#             new_frame.pts = frame.pts
#             new_frame.time_base = frame.time_base
#             return new_frame
#         elif self.transform == "edges":
#             # perform edge detection
#             img = frame.to_ndarray(format="bgr24")
#             img = cv2.cvtColor(cv2.Canny(img, 100, 200), cv2.COLOR_GRAY2BGR)

#             # rebuild a VideoFrame, preserving timing information
#             new_frame = VideoFrame.from_ndarray(img, format="bgr24")
#             new_frame.pts = frame.pts
#             new_frame.time_base = frame.time_base
#             return new_frame
#         elif self.transform == "rotate":
#             # rotate image
#             img = frame.to_ndarray(format="bgr24")
#             rows, cols, _ = img.shape
#             M = cv2.getRotationMatrix2D((cols / 2, rows / 2), frame.time * 45, 1)
#             img = cv2.warpAffine(img, M, (cols, rows))

#             # rebuild a VideoFrame, preserving timing information
#             new_frame = VideoFrame.from_ndarray(img, format="bgr24")
#             new_frame.pts = frame.pts
#             new_frame.time_base = frame.time_base
#             return new_frame
#         else:
#             return frame