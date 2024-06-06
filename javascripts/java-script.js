document.addEventListener('DOMContentLoaded', function () {

    let score = 0;
    let level = 1;
    let isGameStarted = false;
    let timeLeft = level === 1 ? 5 : 10;
    let timerInterval;

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

    function updateTimer() {
        const levelElement = document.getElementById('level');
        levelElement.textContent = 'Level: ' + level + ' Time Left: ' + timeLeft + 's';
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function resetTimer() {
        timeLeft = level === 1 ? 5 : 10;
        updateTimer();
    }

    function gameOver() {
        stopTimer();
        const restartButton = document.getElementById('restart-button');
        const winMessage = document.getElementById('win-message');
        restartButton.style.display = 'block';
        winMessage.textContent = 'Вы проиграли!';
        winMessage.style.display = 'block';
        isGameStarted = false;
    }

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

        // Create apples
        let appleCount = level === 1 ? 5 : 10;
        for (let i = 0; i < appleCount; i++) {
            createApple();
        }

        // Attach event listener for keyboard
        document.addEventListener('keydown', movePlayer);
    }

    function nextLevel() {
        level++;
        score = 0;
        resetTimer();
        const nextLevelButton = document.getElementById('next-level-button');
        nextLevelButton.style.display = 'none';

        // Remove all apples
        document.querySelectorAll('.apple').forEach(apple => apple.remove());

        // Create new apples
        let appleCount = level === 1 ? 5 : 10;
        for (let i = 0; i < appleCount; i++) {
            createApple();
        }
    }

    function winGame() {
        const winButton = document.getElementById('win-message');
        winButton.style.display = 'none';
        isGameStarted = false;
        stopTimer();
    }

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

    function updateScore() { 
        const scoreElement = document.getElementById('score');
        scoreElement.textContent = 'Score: ' + score;
    }

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

    function showNextLevelButton() {
        const nextLevelButton = document.getElementById('next-level-button');
        nextLevelButton.style.display = 'block';
    }

    function showRestartButton() {
        const restartButton = document.getElementById('restart-button');
        restartButton.style.display = 'block';

        const winMessage = document.getElementById('win-message');
        const saluteGif = document.getElementById('salute-gif');
        winMessage.textContent = 'Вы выиграли!';
        winMessage.style.display = 'block';
        saluteGif.style.display = 'block';
    }

    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', startGame);

    const nextLevelButton = document.getElementById('next-level-button');
    nextLevelButton.addEventListener('click', nextLevel);

    const winButton = document.getElementById('win-message');
    winButton.addEventListener('click', winGame);

    
});

