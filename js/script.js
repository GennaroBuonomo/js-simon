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

    // Countdown
    countdownEl.textContent = timeLeft;
    const timer = setInterval(() => {
        timeLeft--;
        countdownEl.textContent = timeLeft;

        if (timeLeft === totalTime - hideNumbersTime) {
            numbersListEl.classList.add('d-none');
            instructionsEl.textContent = "Inserisci i numeri che ricordi:";
            answersForm.classList.remove('d-none');
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            countdownEl.textContent = "Tempo scaduto!";
        }
    }, 1000);

    // Gestione invio form
    answersForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const inputs = inputGroup.querySelectorAll('input');
        const userNumbers = [];

        inputs.forEach(input => {
            const val = parseInt(input.value);
            if (!isNaN(val)) {
                userNumbers.push(val);
            }
        });

        // Controllo numeri indovinati
        const guessedNumbers = userNumbers.filter(num => randomNumbers.includes(num));
        const uniqueGuessed = [...new Set(guessedNumbers)];

        messageEl.classList.remove('text-danger');
        messageEl.classList.add('text-success');
        messageEl.innerHTML = `
            Hai indovinato ${uniqueGuessed.length} numero/i.<br>
            Numeri indovinati: ${uniqueGuessed.length > 0 ? uniqueGuessed.join(', ') : 'Nessuno'}
        `;

        // Disabilita il form dopo l'invio
        inputs.forEach(input => input.disabled = true);
        e.target.querySelector('button').disabled = true;
    });
});