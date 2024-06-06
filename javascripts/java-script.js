// startTimer() - начинает отсчет времени с учетом уровня.
// updateTimer() - обновляет отображение времени на экране.
// resetTimer() - сбрасывает таймер при старте нового уровня.
// gameOver() - завершает игру при окончании времени.
// nextLevel() - переходит на следующий уровень.
// winGame() - завершает игру при победе.
// createApple() - создает яблоко на поле игры.
// onAppleClick() - обрабатывает клик по яблоку.
// updateScore() - обновляет отображение счета на экране.
// movePlayer() - обрабатывает движение игрока по полю.
// checkCollision() - проверяет столкновения игрока с яблоками.
// isColliding() - определяет, произошло ли столкновение между элементами.

document.addEventListener('DOMContentLoaded', function () {

    setTimeout(function () {
        document.querySelector('.preloader').style.display = 'none';
        document.querySelector('.zadacha').style.display = 'block';
        document.getElementById('score').style.display = 'block';
        document.getElementById('level').style.display = 'block';
    }, 3500);

    let score = 0; // Переменная для хранения счета
    let level = 1; // Переменная для хранения уровня игры
    let isGameStarted = false; // Переменная для проверки, начата ли игра
    let timeLeft = level === 1 ? 10 : 15; // Время на уровне (10 секунд на первом уровне, 15 на втором)
    let timerInterval; // Переменная для интервала таймера

    // Функция запуска таймера
    function startTimer() {
        timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                gameOver();
            } else {
                timeLeft--;
                updateTimer();
            }
        }, 1000);
    }

    // Функция обновления таймера
    function updateTimer() {
        const levelElement = document.getElementById('level');
        levelElement.textContent = 'Уровень: ' + level + ' Осталось времени: ' + timeLeft + 'с';
    }

    // Функция остановки таймера
    function stopTimer() {
        clearInterval(timerInterval);
    }

    // Функция сброса таймера
    function resetTimer() {
        timeLeft = level === 1 ? 10 : 15;
        updateTimer();
    }

    // Функция завершения игры
    function gameOver() {
        stopTimer();
        const restartButton = document.getElementById('restart-button');
        const winMessage = document.getElementById('win-message');
        restartButton.style.display = 'block';
        winMessage.textContent = 'Вы проиграли!';
        winMessage.style.display = 'block';
        isGameStarted = false;
    }

    // Функция начала игры
    function startGame() {
        const startButton = document.getElementById('start-button');
        const scoreElement = document.getElementById('score');
        const taskElement = document.querySelector('.zadacha');

        startButton.style.display = 'none';
        scoreElement.style.display = 'block';
        taskElement.style.display = 'none';

        isGameStarted = true;
        resetTimer();
        startTimer();

        // Создание яблок
        let appleCount = level === 1 ? 5 : 10;
        for (let i = 0; i < appleCount; i++) {
            createApple();
        }

        // Привязка обработчика событий клавиатуры
        document.addEventListener('keydown', movePlayer);
    }

    // Функция перехода на следующий уровень
    function nextLevel() {
        level++;
        score = 0;
        resetTimer();
        const nextLevelButton = document.getElementById('next-level-button');
        nextLevelButton.style.display = 'none';

        // Удаление всех яблок
        document.querySelectorAll('.apple').forEach(apple => apple.remove());

        // Создание новых яблок
        let appleCount = level === 1 ? 5 : 10;
        for (let i = 0; i < appleCount; i++) {
            createApple();
        }
    }

    // Функция завершения игры при победе
    function winGame() {
        const winButton = document.getElementById('win-message');
        winButton.style.display = 'none';
        isGameStarted = false;
        stopTimer();
    }

    // Функция создания яблока
    function createApple() {
        const apple = document.createElement('div');
        apple.classList.add('apple');

        const gameContainer = document.getElementById('game-container');
        const containerRect = gameContainer.getBoundingClientRect();

        apple.style.left = Math.random() * (containerRect.width - 100) + 'px';
        apple.style.top = Math.random() * (containerRect.height - 100) + 'px';

        gameContainer.appendChild(apple);
        apple.addEventListener('click', onAppleClick);
    }

    // Обработчик клика по яблоку
    function onAppleClick() {
        if (!isGameStarted) return;

        this.remove();
        score++;
        updateScore();

        if (level === 1 && score === 5) {
            showNextLevelButton();
        } else if (level === 2 && score === 10) {
            showRestartButton();
        }
    }

    // Функция обновления счета
    function updateScore() {
        const scoreElement = document.getElementById('score');
        scoreElement.textContent = 'Счет: ' + score;
    }

    // Функция перемещения игрока
    function movePlayer(event) {
        if (!isGameStarted) return;

        const player = document.getElementById('player');
        const gameContainer = document.getElementById('game-container');
        const containerRect = gameContainer.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();

        if (!player.style.top) {
            player.style.top = '0px';
        }
        if (!player.style.left) {
            player.style.left = '0px';
        }

        switch (event.key) {
            case 'ArrowUp':
                player.style.top = Math.max(0, parseInt(player.style.top) - 10) + 'px';
                break;
            case 'ArrowDown':
                player.style.top = Math.min(containerRect.height - playerRect.height, parseInt(player.style.top) + 10) + 'px';
                break;
            case 'ArrowLeft':
                player.style.left = Math.max(0, parseInt(player.style.left) - 10) + 'px';
                break;
            case 'ArrowRight':
                player.style.left = Math.min(containerRect.width - playerRect.width, parseInt(player.style.left) + 10) + 'px';
                break;
        }

        checkCollision(player);
    }

    // Функция проверки столкновений
    function checkCollision(player) {
        const apples = document.querySelectorAll('.apple');
        apples.forEach(apple => {
            if (isColliding(player, apple)) {
                apple.remove();
                score++;
                updateScore();

                if (level === 1 && score === 5) {
                    showNextLevelButton();
                } else if (level === 2 && score === 10) {
                    showRestartButton();
                }
            }
        });
    }

    // Функция проверки столкновения элементов
function isColliding(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}

// Функция отображения кнопки следующего уровня
    function showNextLevelButton() {
        const nextLevelButton = document.getElementById('next-level-button');
        nextLevelButton.style.display = 'block';
    }

    // Функция отображения кнопки перезапуска игры
    function showRestartButton() {
        const restartButton = document.getElementById('restart-button');
        restartButton.style.display = 'block';

        const winMessage = document.getElementById('win-message');
        const saluteGif = document.getElementById('salute-gif');
        winMessage.textContent = 'Вы выиграли!';
        winMessage.style.display = 'block';
        saluteGif.style.display = 'block';
    }

    // Привязка событий к кнопкам
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', startGame);

    const nextLevelButton = document.getElementById('next-level-button');
    nextLevelButton.addEventListener('click', nextLevel);

    const winButton = document.getElementById('win-message');
    winButton.addEventListener('click', winGame);

    

});





