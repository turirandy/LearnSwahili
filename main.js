let flashcards = [
    { question: "How do you say Hi in Swahili?", answer: "Habari (haa-baa-ree)" },
    { question: "How do you say Bye in Swahili?", answer: "Kwaheri (kwa-hey-ree)", meaning: "Farewell or goodbye" },
    { question: "How do you say How are you in Swahili?", answer: "Uko aje? (u-ko aa-jay)" },
    { question: "How do you say School in Swahili?", answer: "Shule (shoe-lay)" },
    { question: "How do you say Home in Swahili?", answer: "Nyumbani (new-m-baa-knee)" },
    { question: "How do you say Out in Swahili?", answer: "Inge (in-jee)" },
    { question: "How do you say In in Swahili?", answer: "Ndani (n-daa-knee)" },
    { question: "How do you say Under in Swahili?", answer: "Chini ya (chee-knee yaa)" },
    { question: "How do you say On Top in Swahili?", answer: "Juu ya (juu yaa)" },
    { question: "How do you say Down in Swahili?", answer: "Chini (chee-knee)" },
    { question: "How do you say Food in Swahili?", answer: "Chakula (chaa-kuu-laa)" },
    { question: "How do you say Bed in Swahili?", answer: "Kitanda (key-taa-n-daa)" },
    { question: "How do you say Light in Swahili?", answer: "Taa (taa)" },
    { question: "How do you say Sleep in Swahili?", answer: "Lala (laa-laa)" },
    { question: "How do you say Chair in Swahili?", answer: "Kiti (key-tea)" },
    { question: "How do you say Table in Swahili?", answer: "Meza (may-zaa)" },
    { question: "How do you say Up in Swahili?", answer: "Juu (juuu)" },
    { question: "How do you say Spoon in Swahili?", answer: "Kijiko (key-gi-koo)" },
    { question: "How do you say Plate in Swahili?", answer: "Sahani (sir-honey)" },
    { question: "How do you say Knife in Swahili?", answer: "Kisu (key-sue)" },
    { question: "How do you say Mango in Swahili?", answer: "Embe (eeh-m-bae)" },
    { question: "How do you say Shoe in Swahili?", answer: "Kiatu (key-aa-two)" },
    { question: "How do you say No in Swahili?", answer: "Hapana (her-paa-naa)" },
    { question: "How do you say Yes in Swahili?", answer: "Ndio (n-dee-o)" },
    { question: "How do you say Cup in Swahili?", answer: "Kikombe (key-koo-m-bae)" },
    { question: "How do you say Bottle in Swahili?", answer: "Chupa (chuu-paa)" },
    { question: "How do you say Fall in Swahili?", answer: "Anguka (an-gu-kaa)" },
    { question: "How do you say Pan in Swahili?", answer: "Sufuria (sue-fuu-ree-aa)" },
    { question: "How do you say Cat in Swahili?", answer: "Paka (paa-kaa)" },
    { question: "How do you say Bird in Swahili?", answer: "Ndege (n-day-ge)" },
    { question: "How do you say Dog in Swahili?", answer: "Mbwa (m-b-waa)" },
    { question: "How do you say Rat in Swahili?", answer: "Panya (paa-n-yaa)" },
    { question: "How do you say Pineapple in Swahili?", answer: "Nanasi (naa-naa-sea)" },
    { question: "How do you say Apple in Swahili?", answer: "Tufaha (two-faa-her)" },
    { question: "How do you say Water in Swahili?", answer: "Maji (maa-gi)" },
    { question: "How do you say Watermelon in Swahili?", answer: "Tikitimaji (tea-key-tea-ma-gi)" },
    { question: "How do you say Orange in Swahili?", answer: "Chungwa (chuu-n-gu-waa)" },
    { question: "How do you say Avocado in Swahili?", answer: "Parachichi (paa-raa-chii-chii)" },
    { question: "How do you say PawPaw in Swahili?", answer: "Papai (paa-paa-e)" },
    { question: "How do you say Banana in Swahili?", answer: "Ndizi (n-dee-zee)" },
    { question: "How do you say Hat in Swahili?", answer: "Kofia (koo-fee-aa)" },
    { question: "How do you say Belt in Swahili?", answer: "Mshipi (m-she-pee)" },
    { question: "How do you say Coat in Swahili?", answer: "Koti (koo-tea)" },
    { question: "How do you say Dress in Swahili?", answer: "Rinda (ree-n-daa)" },
    { question: "How do you say Lion in Swahili?", answer: "Simba (see-m-baa)" },
    { question: "How do you say Fish in Swahili?", answer: "Samaki (sir-ma-key)" },
    { question: "How do you say Elephant in Swahili?", answer: "Ndovu (n-doo-vuu)" },
    { question: "How do you say Doctor in Swahili?", answer: "Daktari (da-k-taa-ree)" },
    { question: "How do you say Market in Swahili?", answer: "Soko (soo-koo)" },
    { question: "How do you say Hospital in Swahili?", answer: "Hospitali (hose-pee-taa-lee)" },
    { question: "How do you say Fridge in Swahili?", answer: "Jokofu (joe-koo-fuu)" }
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
