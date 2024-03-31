from flask import app, Flask
from speechToText import transcribe_long_running_audio
from testOpenAISTT import speech_to_text
from recordAudio import create_audio
from fixInput import fix_input


app = Flask(__name__)

@app.route("/doctor")
def main():
    # create_audio()

    # original speech to text
    text = speech_to_text()

    # cleans up speech to text
    fixed_input = fix_input(text)
    
    print(fixed_input)

if __name__ == '__main__':
    app.run()