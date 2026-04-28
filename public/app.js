let currentAnswer = "";

window.onload = loadQuestion;

function loadQuestion() {
    document.getElementById("status").textContent = "Loading...";

    fetch("/api/trivia")
        .then(res => res.json())
        .then(data => {
            document.getElementById("question").innerHTML = decodeHTML(data.question);

            currentAnswer = data.answer; // True / False

            document.getElementById("userAnswer").value = "";
            document.getElementById("result").textContent = "";

            document.getElementById("status").textContent = "Answer T or F";
        });
}

function submitAnswer() {
    const input = document.getElementById("userAnswer").value.trim().toLowerCase();
    const result = document.getElementById("result");

    if (input !== "t" && input !== "f") {
        result.textContent = "Please enter t for true or f for false";
        return;
    }

    const userAnswer = input === "t" ? "True" : "False";

    if (userAnswer === currentAnswer) {
        result.textContent = "✅ Correct!";
    } else {
        result.textContent = `❌ Wrong! Answer was ${currentAnswer}`;
    }

    // wait a moment then load next question
    setTimeout(loadQuestion, 1000);
}

function decodeHTML(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}