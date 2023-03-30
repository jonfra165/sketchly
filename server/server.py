from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
import base64
import cv2
import numpy as np


from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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


@app.route('/api/upload_image', methods=['POST'])
def upload_file():
    # Get the uploaded file from the request
    file = request.files['file']
    
    # Get the current working directory
    current_dir = os.getcwd()
    
    # Define the upload directory
    upload_dir = os.path.join(current_dir, 'uploads')
    
    # Create the upload directory if it doesn't exist
    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir)
    
    # Save the uploaded file to the upload directory
    filename = secure_filename(file.filename)
    file_path = os.path.join(upload_dir, filename)
    file.save(file_path)
    
    # Get the expected file path
    expected_file_path = os.path.join(current_dir, file_path)
    
    # Return a response
    return jsonify({'message': 'File uploaded successfully', 'file_path': expected_file_path})


@app.post('/convert-to-sketch')
def convert_to_sketch():
    '''This endpoint will take the uploaded image and convert it into a sketch using OpenCV.'''
    return     


if __name__ == "__main__":
    app.run(debug=True)