const params = new URLSearchParams(window.location.search);

const id = params.get("cat");

const cat = cats[id];

document.getElementById("catImage").src = cat.image;
document.getElementById("catName").textContent = cat.name;
document.getElementById("storyText").textContent = cat.story;
document.getElementById("question").textContent = cat.question;

const answers = document.getElementById("answers");

cat.options.forEach((option, index) => {

    answers.innerHTML += `
        <label class="option">
            <input
                type="radio"
                name="answer"
                value="${index}">
            ${option}
        </label>
    `;

});

let selected = null;

document.querySelectorAll("input[name='answer']").forEach(input => {

    input.addEventListener("change", () => {

        selected = Number(input.value);

    });

});

const submit = document.getElementById("submit");
const result = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");

submit.addEventListener("click", () => {

    if (selected === null) {

        result.textContent = "⚠ Please choose an answer!";
        result.style.color = "orange";
        return;

    }

    if (selected === cat.answer) {

        result.textContent = "✅ Correct!";
        result.style.color = "green";

        let score = Number(localStorage.getItem("score")) || 0;
        let completed = JSON.parse(localStorage.getItem("completed")) || [];

        if (!completed.includes(id)) {

            completed.push(id);
            score++;

            localStorage.setItem("score", score);
            localStorage.setItem("completed", JSON.stringify(completed));

        }

        document.querySelectorAll("input[name='answer']").forEach(input => {

            input.disabled = true;

        });

        submit.disabled = true;

        nextBtn.style.display = "block";

    } else {

        result.textContent = "❌ Wrong! Try Again.";
        result.style.color = "crimson";

    }

});

nextBtn.addEventListener("click", () => {

    if (cat.next) {

        window.location.href = `story.html?cat=${cat.next}`;

    } else {

        alert("🎉 Congratulations! You finished Learn with Cats!");

        window.location.href = "index.html";

    }

});