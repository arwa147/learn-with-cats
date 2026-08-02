   localStorage.removeItem("score");
localStorage.removeItem("completed");
   const cards = document.querySelectorAll(".card");

// الانتقال إلى صفحة القصة
cards.forEach(card => {

    card.addEventListener("click", () => {

        const cat = card.dataset.cat;

        window.location.href = `story.html?cat=${cat}`;

    });

});

// قراءة القطط التي تم حلها
const completed = JSON.parse(localStorage.getItem("completed")) || [];

// إضافة علامة الصح
cards.forEach(card => {

    const id = card.dataset.cat;

    if (completed.includes(id)) {

        card.classList.add("done");

    }

});

// عرض النقاط
const scoreElement = document.getElementById("score");

if (scoreElement) {

    const score = Number(localStorage.getItem("score")) || 0;

    scoreElement.textContent = `${score} / 10`;

}