from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
import base64
import cv2
import numpy as np
import logging
import sys


from flask_cors import CORS

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/api/upload_image', methods=['POST'])
def upload_file():
    # Get the uploaded file from the request
    file = request.files['file']
    print(file)
    
    # Save the uploaded file to the upload directory
    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)
    
    # Get the expected file path
    expected_file_path = os.path.join(os.getcwd(), file_path)
    
    # Return a response
    return jsonify({'message': 'File uploaded successfully', 'file_path': expected_file_path})

# function to check if the file has an allowed extension
def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

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

@app.route('/test', methods=['GET'])
def test():
    return "CORS WORKS!"

@app.post('/convert-to-sketch')
def convert_to_sketch():
    '''This endpoint will take the uploaded image and convert it into a sketch using OpenCV.'''
    return     


if __name__ == "__main__":
    app.logger.addHandler(logging.StreamHandler(sys.stdout))
    app.logger.setLevel(logging.ERROR)
    app.run(debug=True)