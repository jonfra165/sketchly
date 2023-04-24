from flask import Flask, request, jsonify
import cv2
import numpy as np
import base64

app = Flask(__name__)

@app.route('/api/upload', methods=['POST'])
def upload():
    # Get the uploaded file from the request
    file = request.files['file']

    # Convert the image to a numpy array
    img = np.frombuffer(file.read(), np.uint8)

    # Read the image using OpenCV
    img = cv2.imdecode(img, cv2.IMREAD_COLOR)

    # Convert the image to base64 string
    _, buffer = cv2.imencode('.jpg', img)
    img_base64 = base64.b64encode(buffer).decode('utf-8')

    # Return the base64-encoded image
    return jsonify({'image': img_base64})

@app.route('/api/sketch', methods=['POST'])
def sketch():
    # Get the uploaded file from the request
    file = request.files['image']

    # Convert the image to a numpy array
    img = np.frombuffer(file.read(), np.uint8)

    # Read the image using OpenCV
    img = cv2.imdecode(img, cv2.IMREAD_COLOR)

    # Convert the image to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Invert the image
    inverted_gray = 255 - gray

    # Apply Gaussian blur
    blurred = cv2.GaussianBlur(inverted_gray, (21, 21), 0)

    # Blend the grayscale image with the blurred image using color dodge blend mode
    blend = cv2.divide(gray, 255 - blurred, scale=256)

    # Convert the blended image to base64 string
    _, buffer = cv2.imencode('.jpg', blend)
    blend_base64 = base64.b64encode(buffer).decode('utf-8')

    # Return the base64-encoded blended image
    return jsonify({'sketch': blend_base64})

if __name__ == '__main__':
    app.run(debug=True) 
