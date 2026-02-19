let recognition;

// 🎤 Voice → Text
function startSpeech() {
    if (!('webkitSpeechRecognition' in window)) {
        document.getElementById("text").innerText = "❌ Browser not supported";
        return;
    }

    recognition = new webkitSpeechRecognition();
    recognition.lang = document.getElementById("language").value;
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
        let finalText = "";
        for (let i = 0; i < event.results.length; i++) {
            finalText += event.results[i][0].transcript;
        }
        document.getElementById("text").innerText = finalText;
    };

    recognition.start();
    document.getElementById("text").innerText = "🎧 Listening...";
}

function stopSpeech() {
    if (recognition) recognition.stop();
}

// 🌐 Text → Translate (Flask backend)
async function translateText() {
    const text = document.getElementById("text").innerText.trim();
    const target = document.getElementById("targetLang").value;
    const output = document.getElementById("translated");

    if (!text) {
        output.innerText = "⚠️ No text to translate";
        return;
    }

    output.innerText = "Translating...";

    try {
        const res = await fetch("/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, target })
        });

        const data = await res.json();
        output.innerText = data.translated || "Translation failed";

    } catch (err) {
        output.innerText = "❌ Backend error";
    }
}

// 🔊 Translated Text → Voice
function speakTranslated() {
    const text = document.getElementById("translated").innerText.trim();
    const lang = document.getElementById("targetLang").value;

    if (!text || text.includes("Translated text will appear")) {
        alert("⚠️ No translated text to speak");
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    const langMap = {
        en: "en-IN",
        kn: "kn-IN",
        hi: "hi-IN",
        ta: "ta-IN",
        te: "te-IN",
        ml: "ml-IN"
    };

    utterance.lang = langMap[lang] || "en-IN";

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
}

// 📋 Copy
function copyText(id) {
    navigator.clipboard.writeText(document.getElementById(id).innerText);
    alert("Copied!");
}

// 🗑 Clear
function clearAll() {
    document.getElementById("text").innerText = "";
    document.getElementById("translated").innerText = "";
}