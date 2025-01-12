function toggleReadMore() {
    const hiddenText = document.querySelector('.ascuns');
    const readMoreButton = document.querySelector('.mai');

    if (hiddenText.style.display === 'block') {
        hiddenText.style.display = 'none';
        readMoreButton.textContent = 'Citește mai mult ▼';
    } else {
        hiddenText.style.display = 'block';
        readMoreButton.textContent = 'Citește mai puțin ▲';
    }
}

function toggleAnswer(event) {
    const answer = event.target.nextElementSibling;
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
}

function submitQuestion(event) {
event.preventDefault(); 
const inputField = document.querySelector('.ult-fr input');
const confirmationMessage = document.querySelector('#confirmare');

inputField.value = '';

confirmationMessage.style.display = 'block';
}