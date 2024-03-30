from speechToText import transcribe_long_running_audio
from testAudio import create_audio
from fixInput import fix_input

def main():
    create_audio()

    text = transcribe_long_running_audio()

    fixed_input = fix_input(text)

if __name__ == '__main__':
    main()