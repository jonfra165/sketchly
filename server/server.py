from flask import Flask;
import base64
import cv2
import numpy as np


app = Flask(__name__)

@app.route('/show-image')
def show_image():
    img = cv2.imread('server/images/scoccish.png')
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, thresh_img = cv2.threshold(gray_img, 127, 255, cv2.THRESH_BINARY)
    new_img = cv2.resize(thresh_img, (500, 700))

    # Encode the image data as a base64 string
    retval, buffer = cv2.imencode('.png', new_img)
    img_str = base64.b64encode(buffer).decode()

    return {'image': img_str }

@app.post('/upload-image')
def upload_image():
    '''This endpoint will handle the image upload from the user's browser.'''
    return 

@app.post('/convert-to-sketch')
def convert_to_sketch():
    '''This endpoint will take the uploaded image and convert it into a sketch using OpenCV.'''
    return     


if __name__ == "__main__":
    app.run(debug=True)