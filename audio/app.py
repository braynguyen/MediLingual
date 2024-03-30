from audio.speechToText import transcribe_long_running_audio
from audio.testAudio import create_audio

def main():
    create_audio()

    transcribe_long_running_audio()

if __name__ == '__main__':
    main()