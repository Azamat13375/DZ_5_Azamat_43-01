///задание №1

const gmailInput = document.querySelector('#gmail_input');
const gmailButton = document.querySelector('#gmail_button');
const gmailResult = document.querySelector('#gmail_result');
function isValidGmail(email) {
    // Регулярное выражение для проверки валидности Gmail
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
}
gmailButton.addEventListener('click', () => {
    const email = gmailInput.value;
    if (isValidGmail(email)) {
        gmailResult.textContent = 'OK';
        gmailResult.style.color = 'green';
    } else {
        gmailResult.textContent = 'NOT OK';
        gmailResult.style.color = 'red';
    }
});

///задание №2

const parentBlock = document.querySelector('.parent_block');
const childBlock = document.querySelector('.child_block');

let positionX = 0, positionY = 0;
let direction = 'right'; // Новая переменная для направления движения

const offsetWidth = parentBlock.offsetWidth - childBlock.offsetWidth;
const offsetHeight = parentBlock.offsetHeight - childBlock.offsetHeight;

const moveBlock = () => {
    switch (direction) {
        case 'right':
            if (positionX < offsetWidth) {
                positionX++;
                childBlock.style.left = `${positionX}px`;
            } else {
                direction = 'down';
            }
            break;
        case 'down':
            if (positionY < offsetHeight) {
                positionY++;
                childBlock.style.top = `${positionY}px`;
            } else {
                direction = 'left';
            }
            break;
        case 'left':
            if (positionX > 0) {
                positionX--;
                childBlock.style.left = `${positionX}px`;
            } else {
                direction = 'up';
            }
            break;
        case 'up':
            if (positionY > 0) {
                positionY--;
                childBlock.style.top = `${positionY}px`;
            } else {
                direction = 'right';
            }
            break;
    }

    requestAnimationFrame(moveBlock);
}

moveBlock();


/// задание №3

// Находим элементы по их ID
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

// Переменные для хранения значения счетчика и ID интервала
let counter = 0;
let intervalId = null;

// Функция для обновления отображаемого значения счетчика
function updateDisplay() {
    secondsDisplay.textContent = counter;
}

// Функция для запуска счетчика
function startCounter() {
    // Проверяем, не запущен ли уже счетчик
    if (!intervalId) {
        intervalId = setInterval(() => {
            counter++;
            updateDisplay();
        }, 1000); // Обновление каждую секунду
    }
}

// Функция для остановки счетчика
function stopCounter() {
    clearInterval(intervalId);
    intervalId = null;
}

// Функция для сброса счетчика
function resetCounter() {
    stopCounter();  // Останавливаем счетчик, если он был запущен
    counter = 0;    // Сбрасываем значение счетчика
    updateDisplay(); // Обновляем отображение
}

// Обработчики событий для кнопок
startButton.addEventListener('click', startCounter);
stopButton.addEventListener('click', stopCounter);
resetButton.addEventListener('click', resetCounter);

// Инициализация начального отображения
updateDisplay();


// Задание №4
const request = new XMLHttpRequest();
request.open("GET", "../data/characters.json", true);
request.setRequestHeader("Content-type", "application/json");
request.responseType = "json";
request.send()

const renderCharacterList = (data) =>{
    data.forEach((character) => {
        const characterCard = document.createElement("div");
        characterCard.classList.add("character-card");

        const characterImage = document.createElement("img");
        characterImage.setAttribute("src", character.person_photo);

        const characterName = document.createElement("p");
        characterName.innerText = character.name;
        const characterAge = document.createElement("span");
        characterAge.innerText = character.age

        characterCard.append(characterImage);
        characterCard.append(characterName);
        characterCard.append(characterAge);

        characterList.append(characterCard);
    })
}

request.onload = () =>{
    const data = request.response;
    console.log(data)
    renderCharacterList(data)
}


// Задание№5
const xhr = new XMLHttpRequest();
xhr.open("GET", "../data/any.json");

xhr.onload = function () {
    const data = JSON.parse(xhr.responseText);
    console.log(data);
};

xhr.onerror = function () {
    console.error("Request failed");
};

xhr.send();
