from flask import app, Flask
from speechToText import transcribe_long_running_audio
from recordAudio import create_audio
from fixInput import fix_input
from removeJargon import removeJargon
from translate import translate

app = Flask(__name__)

@app.route("/doctor/<string:langauge>")
def doctor(langauge):
    # create_audio()

    text = transcribe_long_running_audio()

    fixed_input = fix_input(text)

    jargon_removed = removeJargon(fixed_input)

    translated_to_patient_language = translate(langauge, jargon_removed)


    output = {
        "translation": translated_to_patient_language
    }

    return output

@app.route("/patient/<string:langauge>")
def patient(language):
    # create_audio()

    text = transcribe_long_running_audio()

    fixed_input = fix_input(text)

    translated_to_doctor_language = translate(language, fixed_input)

    # symptoms = getSymptomsFromText(translated)

    output = {
        "translation": translated_to_doctor_language,
        "symptoms": symptoms
    }

    return output

if __name__ == '__main__':
    app.run()