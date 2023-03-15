from flask import Flask;
import base64

app = Flask(__name__)

@app.route('/members')
def members():
    return {"members": ["Member1", "Member2", "Member3"]}

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