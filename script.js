const questions = [
    {
        question: "1) What does 'HTML' stand for?",
        options: ["A) HyperLnks and Text Markup Language", "B) Home Tool markup Language", "C) Hyper Text Markup Language", "D) Hyperlinking text Main Language"],
        answer: "C) Hyper Text Markup Language"
    },
    {
        question: "2) Which of the following is a web browser?",
        options: ["A) Google Chrome", "B) Microsoft Word", "C) Adobe Photoshop", "D) Windows Explorer"],
        answer: "A) Google Chrome"
    },
    {
        question: "3) Which Planet is known as the 'Red Planet'?",
        options: ["A) Earth", "B) Jupiter", "C) Mars", "D) Venue"],
        answer: "C) Mars"
    },
    {
        question: "4) Which device is used to input data into a computer?",
        options: ["A) Moniter", "B) Printer", "C) Keyboard", "D) Speaker"],
        answer: "C) Keyboard"
    },
    {
        question: "5) Which company created the iPhone?",
        options: ["A) Samsung", "B) Google", "C) Microsoft", "D) Apple"],
        answer: "D) Apple"
    }
];

let currentQuestion = 0;
let selectedAnswers = Array(questions.length).fill(null);
let score = 0;

window.onload = function () {
    showQuestion();
};

function showQuestion() {
    const questionText = document.getElementById("question-text");
    const optioForm = document.getElementById("options-form");
    const current = questions[currentQuestion];

    questionText.textContent = current.question;
    optioForm.innerHTML = "";

    current.options.forEach((option) => {
        const label = document.createElement("label");
        label.classList.add("option");

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "answer";
        radio.value = option;

        if (selectedAnswers[currentQuestion] === option) {
            radio.checked = true;
        }

        const span = document.createElement("span");
        span.textContent = " " + option;

        label.appendChild(radio);
        label.appendChild(span);
        optioForm.appendChild(label);
    });

    document.getElementById("prev").style.display = currentQuestion > 0 ? "inline-block" : "none";
    document.getElementById("next").style.display = currentQuestion < questions.length - 1 ? "inline-block" : "none";
    document.getElementById("submit").style.display = currentQuestion === questions.length - 1 ? "inline-block" : "none";
}

document.getElementById("next").addEventListener("click", () => {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) {
        alert("Select an answer before proceeding!");
        return;
    }
    selectedAnswers[currentQuestion] = selected.value;
    currentQuestion++;
    showQuestion();
});

document.getElementById("prev").addEventListener("click", () => {
    currentQuestion--;
    showQuestion();
});

document.getElementById("submit").addEventListener("click", () => {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) {
        alert("Select an answer before submitting!");
        return;
    }
    selectedAnswers[currentQuestion] = selected.value;

    score = 0;
    selectedAnswers.forEach((ans, idx) => {
        if (ans?.trim() === questions[idx].answer.trim()) score++;
    });

    document.getElementById("question-container").style.display = "none";
    document.getElementById("submit").style.display = "none";
    document.getElementById("prev").style.display = "none";

    document.getElementById("result").classList.remove("hidden");
    document.getElementById("score").textContent = score;
});
