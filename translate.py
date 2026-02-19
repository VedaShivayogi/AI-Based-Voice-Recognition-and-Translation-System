from flask import Blueprint, request, jsonify
from deep_translator import GoogleTranslator
from gtts import gTTS
import base64
import io

translatebp = Blueprint("translate", __name__)

@translatebp.route("/translate", methods=["POST"])
def translate_text():
    data = request.get_json()
    text = data.get("text", "")
    target = data.get("target", "kn")

    try:
        translated = GoogleTranslator(source="auto", target=target).translate(text)
        return jsonify({"translated": translated})
    except Exception as e:
        print(f"Translation error: {e}")
        return jsonify({"translated": "Translation failed"}), 500

@translatebp.route("/gtts-speech", methods=["POST"])
def gtts_speech():
    data = request.get_json()
    text = data.get("text", "")
    lang = data.get("lang", "en")
    
    if not text:
        return jsonify({"error": "No text provided"}), 400
    
    try:
        # Create gTTS object
        tts = gTTS(text=text, lang=lang, slow=False)
        
        # Save to bytes buffer
        audio_bytes = io.BytesIO()
        tts.write_to_fp(audio_bytes)
        audio_bytes.seek(0)
        
        # Convert to base64
        audio_data = base64.b64encode(audio_bytes.read()).decode('utf-8')
        
        return jsonify({
            "audio": audio_data,
            "format": "mp3"
        })
        
    except Exception as e:
        print(f"gTTS error: {e}")
        return jsonify({"error": "Text-to-speech failed"}), 500