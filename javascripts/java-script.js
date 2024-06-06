document.addEventListener('DOMContentLoaded', function () {

    setTimeout(function() {
        document.querySelector('.preloader').style.display = 'none';
        document.querySelector('.zadacha').style.display = 'block';
        document.getElementById('score').style.display = 'block';
        document.getElementById('level').style.display = 'block';
    }, 3500);

    
    let score = 0;
    let level = 1;
    let isGameStarted = false;

    function createApple() {  // Создание и отображение яблок
        const apple = document.createElement('div');
        apple.classList.add('apple');

        const gameContainer = document.getElementById('game-container');
        const containerRect = gameContainer.getBoundingClientRect();

        apple.style.left = Math.random() * (containerRect.width - 100) + 'px';
        apple.style.top = Math.random() * (containerRect.height - 100) + 'px';
        
        gameContainer.appendChild(apple);
        apple.addEventListener('click', onAppleClick);
    }

    function onAppleClick() { // Обработчик события клика на яблоко
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

    function updateScore() { // Обновление счета очков
        const scoreElement = document.getElementById('score');
        scoreElement.textContent = 'Score: ' + score;
    }

    // Обновление уровня
    function updateLevel() {
        const levelElement = document.getElementById('level');
        levelElement.textContent = 'Level: ' + level;
    }

    // Управление персонажем
    function movePlayer(event) {
        if (!isGameStarted) return;

        const player = document.getElementById('player');
        const gameContainer = document.getElementById('game-container');
        const containerRect = gameContainer.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();

        // Проверяем и задаем начальные координаты, если они не установлены
        if (!player.style.top) {
            player.style.top = '0px';
        }
        if (!player.style.left) {
            player.style.left = '0px';
        }

        switch (event.key) {
            case 'ArrowUp':     player.style.top = Math.max(0, parseInt(player.style.top) - 10) + 'px';
                break;
            case 'ArrowDown':   player.style.top = Math.min(containerRect.height - playerRect.height, parseInt(player.style.top) + 10) + 'px';
                break;
            case 'ArrowLeft':   player.style.left = Math.max(0, parseInt(player.style.left) - 10) + 'px';
                break;
            case 'ArrowRight':  player.style.left = Math.min(containerRect.width - playerRect.width, parseInt(player.style.left) + 10) + 'px';
                break;
        }

        checkCollision(player);
    }

    // Проверка столкновения с яблоком
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

    // Проверка столкновения двух элементов
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

    // Показать кнопку следующего уровня
    function showNextLevelButton() {
        const nextLevelButton = document.getElementById('next-level-button');
        nextLevelButton.style.display = 'block';
    }

    // Показать кнопку рестарта
    function showRestartButton() {
        const restartButton = document.getElementById('restart-button');
        restartButton.style.display = 'block';

        // Показать сообщение о победе и салют
        const winMessage = document.getElementById('win-message');
        const saluteGif = document.getElementById('salute-gif');
        winMessage.style.display = 'block';
        saluteGif.style.display = 'block';
    }

    // Обработчик нажатия на кнопку старта
    function startGame() {
        const startButton = document.getElementById('start-button');
        const scoreElement = document.getElementById('score');
        const taskElement = document.querySelector('.zadacha');

        startButton.style.display = 'none';
        scoreElement.style.display = 'block';
        taskElement.style.display = 'none';

        isGameStarted = true;

        // Создаем яблоки
        let appleCount = level === 1 ? 5 : 10;
        for (let i = 0; i < appleCount; i++) {
            createApple();
        }

        // Вешаем обработчик события на клавиатуру
        document.addEventListener('keydown', movePlayer);
    }

    // Обработчик нажатия на кнопку следующего уровня
    function nextLevel() {
        level++;
        score = 0;
        updateScore();
        updateLevel();

        const nextLevelButton = document.getElementById('next-level-button');
        nextLevelButton.style.display = 'none';

        // Удаляем все яблоки
        document.querySelectorAll('.apple').forEach(apple => apple.remove());

        // Создаем новые яблоки
        let appleCount = level === 1 ? 5 : 10;
        for (let i = 0; i < appleCount; i++) {
            createApple();
        }
    }

    // Обработчик нажатия на кнопку победы
    function winGame() {
        const winButton = document.getElementById('win-message');
        winButton.style.display = 'none';
        isGameStarted = false;

        // Скрыть салют
        const saluteGif = document.getElementById('salute-gif');
        saluteGif.style.display = 'none';
    }

    // Начало игры
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', startGame);

    // Следующий уровень
    const nextLevelButton = document.getElementById('next-level-button');
    nextLevelButton.addEventListener('click', nextLevel);

    // Победа в игре
    const winButton = document.getElementById('win-message');
    winButton.addEventListener('click', winGame);
});
