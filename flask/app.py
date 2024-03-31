from flask import app, Flask, request
# from speechToText import transcribe_long_running_audio
from testOpenAISTT import speech_to_text
from recordAudio import create_audio
from fixInput import fix_input
from removeJargon import removeJargon
from translate import translateForDoctor
from translate import translateForPatient
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins='http://localhost:3000')

@app.route('/upload', methods=['POST'])
def upload_audio():
    if 'audio_file' not in request.files:
        return 'No audio file provided', 400

    audio_file = request.files['audio_file']
    

    audio_file.save('flask/recordings/recording.wav')

    return "audio file saved", 200


@app.route("/doctor/<string:language>", methods=["GET"])
def doctor(language):
    # create_audio()

    text = speech_to_text()
    print("speech to text: ", text)

    fixed_input = fix_input(text)
    print("fixed input: ", fixed_input)

    jargon_removed = removeJargon(fixed_input)
    print("jargon removed: ", jargon_removed)


    translated_to_patient_language = translateForDoctor(language, jargon_removed)
    print("translated to patient language: ", translated_to_patient_language)

    return translated_to_patient_language



@app.route("/patient/<string:language>", methods=["GET"])
def patient(language):
    # create_audio()

    text = speech_to_text()
    print("speech to text: ", text)

    fixed_input = fix_input(text)
    print("fixed input: ", fixed_input)

    # JSON object
    # {
    #     "translation": "translated text",
    #     "symptoms": ["symptom1", "symptom2", "symptom3"]
    # }
    translated_to_doctor_lang = translateForPatient(language, fixed_input)
    print("translated to doctor language: ", translated_to_doctor_lang)

    return translated_to_doctor_lang

if __name__ == '__main__':
    app.run()