// PHONE CHECKER

const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneResult = document.querySelector('#phone_result');

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'OK'
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = 'NOT OK'
        phoneResult.style.color = 'red'
    }
}


// TAB SLIDER
const tabContentBlocks = document.querySelectorAll('.tab_content_block');
const tabs = document.querySelectorAll('.tab_content_item');
const tabsParent = document.querySelector('.tab_content_items');

const hideTabContent = () => {
    tabContentBlocks.forEach((block) => {
        block.style.display = 'none';
    });
    tabs.forEach((tab) => {
        tab.classList.remove('tab_content_item_active');
    });
}

const showTabContent = (id = 0) => {
    tabContentBlocks[id].style.display = 'block';
    tabs[id].classList.add('tab_content_item_active');
}

let currentIndex = 0;

const changeTab = () => {
    hideTabContent();
    showTabContent(currentIndex);
    currentIndex = (currentIndex + 1) % tabs.length; // цикл по табам
};

hideTabContent();
showTabContent(currentIndex); // Показать первый таб

setInterval(changeTab, 3000); // Меняем таб каждые 3 секунды

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((tab, tabIndex) => {
            if (event.target === tab) {
                currentIndex = tabIndex; // Обновляем индекс текущего таба
                hideTabContent();
                showTabContent(tabIndex);
            }
        });
    }
}

// CONVERTER

const usdInput = document.querySelector('#usd');
const somInput = document.querySelector('#som');
const eurInput = document.querySelector('#eur');

// Функция конвертации
const converter = (element, targetElement, currencyRates) => {
    element.addEventListener('input', () => {
        const value = parseFloat(element.value);
        if (isNaN(value) || value === '') {
            targetElement.value = '';
            return;
        }

        if (element.id === 'usd') {
            targetElement.value = (value * currencyRates[targetElement.id]).toFixed(2);
        }
        if (element.id === 'som') {
            targetElement.value = (value / currencyRates.som).toFixed(2);
        }
        if (element.id === 'eur') {
            targetElement.value = (value * currencyRates[targetElement.id]).toFixed(2);
        }
    });
};

// Функция для загрузки и обработки данных из JSON
const loadRates = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '../data/converter.json');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send();

    request.onload = () => {
        const data = JSON.parse(request.response);

        // Связь каждого поля с другими
        converter(usdInput, somInput, data);
        converter(usdInput, eurInput, data);
        converter(somInput, usdInput, data);
        converter(somInput, eurInput, data);
        converter(eurInput, usdInput, data);
        converter(eurInput, somInput, data);
    };
};

loadRates();




// DRY - don't repeat yourself
// KISS - keep it super simple