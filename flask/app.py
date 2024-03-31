from flask import app, Flask
from speechToText import transcribe_long_running_audio
from recordAudio import create_audio
from fixInput import fix_input


app = Flask(__name__)

@app.route("/doctor")
def main():
    # create_audio()

    text = transcribe_long_running_audio()

    fixed_input = fix_input(text)

if __name__ == '__main__':
    app.run()