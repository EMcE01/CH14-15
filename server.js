const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/trivia", async (req, res) => {
    try {
        const response = await fetch(
            "https://opentdb.com/api.php?amount=1&category=18&difficulty=easy&type=boolean"
        );

        const data = await response.json();

        if (!data.results || !data.results[0]) {
            return res.status(500).json({ error: "No trivia returned" });
        }

        const q = data.results[0];

        res.json({
            question: q.question || "No question found",
            answer: q.correct_answer || "True"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});