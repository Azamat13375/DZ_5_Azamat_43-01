const modal = document.querySelector('.modal');
const triggerButton = document.querySelector('#btn-get');
const closeButton = document.querySelector('.modal_close');

const openModal = () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'
}

const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}

triggerButton.onclick = () => openModal();
closeButton.onclick = () => closeModal();
modal.onclick =(event) => {
    if (event.target === modal) {
        closeModal()
    }
}

// Функция для проверки скролла
const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        openModal();
        window.removeEventListener('scroll', handleScroll); // Удаляем обработчик
    }
};

// Добавляем обработчик события скролла
window.addEventListener('scroll', handleScroll);

// Вызываем модальное окно через 10 секунд после открытия сайта
setTimeout(openModal, 10000); // 