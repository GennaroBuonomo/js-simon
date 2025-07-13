document.addEventListener("DOMContentLoaded", function() {
    const countdownEl = document.getElementById('countdown');
    const instructionsEl = document.getElementById('instructions');
    const numbersListEl = document.getElementById('numbers-list');
    const answersForm = document.getElementById('answers-form');
    const messageEl = document.getElementById('message');
    const inputGroup = document.getElementById('input-group');

    let randomNumbers = [];
    const totalTime = 30;
    const hideNumbersTime = 10;
    let timeLeft = totalTime;

    // Genera 5 numeri casuali unici da 1 a 30
    while (randomNumbers.length < 5) {
    let num = Math.floor(Math.random() * 30) + 1;
    if (!randomNumbers.includes(num)) {
    randomNumbers.push(num);
    }
    }

    // Mostra i numeri in pagina
    randomNumbers.forEach(num => {
    const li = document.createElement('li');
    li.textContent = num;
    li.classList.add('fs-1');
    numbersListEl.appendChild(li);
    });

    // Conto alla rovescia
    countdownEl.textContent = timeLeft;
    const timer = setInterval(() => {
    timeLeft--;
    countdownEl.textContent = timeLeft;

    if (timeLeft === totalTime - hideNumbersTime) {
    numbersListEl.classList.add('d-none');
    instructionsEl.textContent = "Inserisci i numeri che ricordi:";
    answersForm.classList.remove('d-none');
    }
    }, 1000);