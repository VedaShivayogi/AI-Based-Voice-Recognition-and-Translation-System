// OVERRIDE existing translateText() without touching dashboard.html

window.translateText = async function () {
    const text = document.getElementById("text")?.innerText || "";
    const targetLang =
        document.getElementById("targetLang")?.value || "kn";
    const output =
        document.getElementById("translated") || document.getElementById("text");

    if (!text.trim()) {
        output.innerText = "No text to translate";
        return;
    }

    output.innerText = "Translating...";

    try {
        const res = await fetch("/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text: text,
                target: targetLang
            })
        });

        const data = await res.json();
        output.innerText = data.translated || "Translation failed";

    } catch (err) {
        output.innerText = "Backend translation error";
    }
};

