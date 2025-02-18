function toggleReadMore() {
    const hiddenText = document.querySelector('.mai-mult .ascuns');
    const toggleButton = document.querySelector('.mai-mult .mai');

    if (hiddenText.style.display === 'none' || hiddenText.style.display === '') {
        hiddenText.style.display = 'block';
        toggleButton.textContent = 'Citește mai puțin ▲'; 
    } else {
        hiddenText.style.display = 'none';
        toggleButton.textContent = 'Citește mai mult ▼'; 
    }
}

document.addEventListener('DOMContentLoaded', () => {
    function toggleAnswer(tile) {
        tile.classList.toggle('open');
    }

    const faqTiles = document.querySelectorAll('.faq-tile');
    faqTiles.forEach(tile => {
        tile.addEventListener('click', () => toggleAnswer(tile));
    });

    const form = document.querySelector('.ult-fr form');
    const inputField = document.querySelector('#question-input');
    const confirmationMessage = document.querySelector('#confirmare');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const questionText = inputField.value.trim();
        if (questionText === '') {
            alert('Vă rugăm să introduceți o întrebare.');
            return;
        }

        inputField.value = '';
        confirmationMessage.style.display = 'block';

        setTimeout(() => {
            confirmationMessage.style.display = 'none';
        }, 3000);
    });
});