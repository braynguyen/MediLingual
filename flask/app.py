from flask import app, Flask
from speechToText import transcribe_long_running_audio
from recordAudio import create_audio
from fixInput import fix_input
from removeJargon import removeJargon
from translate import translateForDoctor
from translate import translateForPatient

app = Flask(__name__)

@app.route("/doctor/<string:langauge>")
def doctor(langauge):
    # create_audio()

    text = transcribe_long_running_audio()

    fixed_input = fix_input(text)

    jargon_removed = removeJargon(fixed_input)

    translated_to_patient_language = translateForDoctor(langauge, jargon_removed)

    return translated_to_patient_language



@app.route("/patient/<string:langauge>")
def patient(language):
    # create_audio()

    text = transcribe_long_running_audio()

    fixed_input = fix_input(text)

    # JSON object
    # {
    #     "translation": "translated text",
    #     "symptoms": ["symptom1", "symptom2", "symptom3"]
    # }
    translated_to_patient_lang = translate(language, fixed_input)

    return translated_to_patient_lang

if __name__ == '__main__':
    app.run()