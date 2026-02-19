# AI-Based-Voice-Recognition-and-Translation-System

- A web-based application that converts voice input → text → translated text → audio output using speech recognition and translation APIs.

#### 📌 Project Description

- 🎙 Capture voice through microphone

- 📝 Convert speech into text

- 🌍 Translate text into selected language

- 🔊 Convert translated text into speech

- 📄 Download translation report as PDF

#### 🛠 Technologies Used

- Backend: Flask

- Speech Recognition: SpeechRecognition

- Translation: googletrans

- Text-to-Speech: gTTS

- Frontend: HTML, CSS, JavaScript

#### 🔄 System Workflow
##### 1️⃣ Voice Input
- User clicks the microphone button to record speech.

<b> 2️⃣ Speech to Text </b>

- Audio is processed using the SpeechRecognition library to convert speech into text.

<b> 3️⃣ Text Translation </b>

- Text is translated into the selected language using Google Translate API.

<b> 4️⃣ Text to Speech </b>

- Translated text is converted into audio using gTTS and saved as an .mp3 file.

<b> 5️⃣ PDF Report (Optional)</b>

- System generates a downloadable PDF containing:

- Original text

- Translated text

- Language selected

- Timestamp

#### 🚀 Installation & Setup
Step 1: Clone the Repository

```
git clone https://github.com/VedaShivayogi/AI-Based-Voice-Recognition-and-Translation-System
cd voice-translation-project
``` 

Step 2: Install Dependencies
```
pip install flask speechrecognition googletrans==4.0.0-rc1 gtts
```

Step 3: Run the Application
```
python app.py
```

Open browser and visit:
```
http://127.0.0.1:5000/
```

📡 APIs & Libraries Used

| Feature           | Library/API                    |
| ----------------- | ------------------------------ |
| Voice Recognition | SpeechRecognition              |
| Translation       | Google Translate (googletrans) |
| Text-to-Speech    | gTTS                           |
| Backend           | Flask                          |


