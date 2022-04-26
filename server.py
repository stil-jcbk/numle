from distutils.log import debug
from flask import Flask, request, render_template

app = Flask(__name__)
@app.route("/")
def index():
    return open("index.html", "r").read()
if __name__ == "__main__":
    app.run(host="192.168.50.133", port=8080)