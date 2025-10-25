let flashcards = [
    { question: "How do you say Hi in Swahili?", answer: "Habari", meaning: "Used as greeting" },
    { question: "How do you say Bye in Swahili?", answer: "Kwaheri(ku-wa-hee-ree)", meaning: "Farewell or goodbye" },
    { question: "How do you say Spoon in Swahili?", answer: "Kijiko", meaning: "Farewell or goodbye" },
    { question: "How do you say Bye in Swahili?", answer: "Kwaheri(ku-wa-hee-ree)", meaning: "Farewell or goodbye" },
    { question: "How do you say Bye in Swahili?", answer: "Kwaheri(ku-wa-hee-ree)", meaning: "Farewell or goodbye" },
    { question: "How do you say Bye in Swahili?", answer: "Kwaheri(ku-wa-hee-ree)", meaning: "Farewell or goodbye" },
    { question: "How do you say Bye in Swahili?", answer: "Kwaheri(ku-wa-hee-ree)", meaning: "Farewell or goodbye" },
];

let currentCardIndex = 0;

if (localStorage.getItem("flashcards")) {
    flashcards = JSON.parse(localStorage.getItem("flashcards"));
}

const container = document.getElementById("flashcardContainer");
const addModal = document.getElementById("addCardModal");
const focusModal = document.getElementById("focusModal");

let currentIndex = null;

function renderFlashcards(cards = flashcards) {
    container.innerHTML = "";
    if (cards.length === 0) {
        container.innerHTML = "<p style='text-align:center;'>No flashcards yet. Add one!</p>";
        return;
    }
    
    
    cards.forEach((card, index) => {
        const cardEl = document.createElement("div");
        cardEl.className = "flashcard";
        cardEl.innerHTML = `
        <div class="flashcard-inner">
        <div class="front">${card.question}</div>
        <div class="back">${card.answer}</div>
        <div class="back">${card.meaning}</div>
        </div>
        <button class="delete-btn" title="Delete" onclick="deleteFlashcard(${index})">x</button>
        `;
        
        cardEl.addEventListener("click", (e) => {
            if (e.target.classList.contains("delete-btn")) return;
            openFocus(index);
        });
        container.appendChild(cardEl);
    });
}

function openAddModal() {
    addModal.classList.remove("hidden");
}

function closeAddModal() {
    addModal.classList.add("hidden");
}

function addFlashcard() {
    const question = document.getElementById("newQuestion").value.trim();
    const answer = document.getElementById("newAnswer").value.trim();
    if (!question || !answer) return alert("Both fields are required.");
    
    flashcards.push({ question, answer });
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
    renderFlashcards();
    closeAddModal();
}



function openFocus(index) {
    currentIndex = index;
    const card = flashcards[index];
    document.getElementById("focusFront").textContent = card.question;
    document.getElementById("focusBack").textContent = card.answer;
    document.getElementById("focusMeaning").textContent = card.meaning || "";
    focusModal.classList.remove("hidden");
}

function closeFocus() {
    focusModal.classList.add("hidden");
    document.getElementById("focusedCard").classList.remove("flipped");
}

function flipFocusedCard() {
    document.getElementById("focusedCard").classList.toggle("flipped");
}

function deleteCurrent() {
    if (currentIndex === null) return;
    if (!confirm("Delete this flashcard?")) return;
    flashcards.splice(currentIndex, 1);
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
    closeFocus();
    renderFlashcards();
}

function showCard(index) {
    if (index < 0 || index >= flashcards.length) return;
    currentIndex = index;
    const card = flashcards[currentIndex];
    document.getElementById("focusFront").textContent = card.question;
    document.getElementById("focusBack").textContent = card.answer;
    document.getElementById("focusMeaning").textContent = card.meaning || "";
    document.getElementById("focusedCard").classList.remove("flipped");

    document.getElementById("prevBtn").disabled = currentIndex === 0;
    document.getElementById("nextBtn").disabled = currentIndex === flashcards.length - 1;
}

function nextCard() {
    if (currentIndex < flashcards.length - 1) {
        showCard(currentIndex + 1);
    }
}

function prevCard() {
    if (currentIndex > 0) {
        showCard(currentIndex - 1);
    }
}

function openFocus(index) {
    focusModal.classList.remove("hidden");
    showCard(index);
}


function deleteFlashcard(index) {if (!confirm("Are you sure you want to delete this flashcard?")) return;
    flashcards.splice(index, 1);
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
    renderFlashcards();
}

document.getElementById("searchInput").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    
    const filtered = flashcards.filter(card =>
        card.question.toLowerCase().includes(query) ||
        card.answer.toLowerCase().includes(query) ||
        (card.meaning && card.meaning.toLowerCase().includes(query))
    );

    container.innerHTML = filtered.length
        ? filtered.map(card => `
            <div class="flashcard">
                <div class="flashcard-inner">
                    <div class="front">${card.question}</div>
                    <div class="back">${card.answer}</div>
                </div>
            </div>
        `).join('')
        : "<p style='text-align:center;'>No matching flashcards found.</p>";

    // Add click event to open correct flashcard
    filtered.forEach(card => {
        const cardEl = [...container.children].find(el => el.querySelector(".front").textContent === card.question);
        cardEl.addEventListener("click", () => {
            const index = flashcards.findIndex(c => c.question === card.question && c.answer === card.answer);
            openFocus(index);
        });
    });
});

document.getElementById("addCardBtn").addEventListener("click", openAddModal);

renderFlashcards();
