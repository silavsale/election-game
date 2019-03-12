let colors = ['yellow', 'red', 'blue', 'violet', 'green', 'nasir', 'boiko', 'bogoslov', 'vilkul'];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let body = document.body;
let scores = document.querySelectorAll('.score');
let num = 0;
let total = 100;
let currentBalloon = 0;
let gameOver = false;
let totalShadow = document.querySelector('.total-shadow');
let audio2 = document.createElement('audio');

function createBalloon() {
    let div = document.createElement('div');
    let rand = Math.floor(Math.random() * colors.length);
    div.className = 'balloon balloon-' + colors[rand];

    rand = Math.floor(Math.random() * (windowWidth - 100));
    div.style.left = rand + 'px';
    div.dataset.number = currentBalloon;
    currentBalloon++;

    body.appendChild(div);
    animateBalloon(div);
}

function animateBalloon(elem) {
    let pos = 0;
    let random = Math.floor(Math.random() * 6 - 3);
    let interval = setInterval(frame, 12 - Math.floor(num / 10) + random);

    function frame() {
        if (pos >= (windowHeight + 200) && (document.querySelector('[data-number="' + elem.dataset.number + '"]') !== null)) {
            clearInterval(interval);
            gameOver = true;
            audio2.pause();
        } else {
            pos++;
            elem.style.top = windowHeight - pos + 'px';
        }
    }
}

function deleteBalloon(elem) {
    elem.remove();
    num++;
    updateScore();
    playBallSound();
}

function playBallSound() {
    let audio = document.createElement('audio');
    audio.src = 'sounds/pop.mp3';
    audio.play();
}

function updateScore() {
    for (let i = 0; i < scores.length; i++) {
        scores[i].textContent = num;
    }
}

function begin() {
    totalShadow.style.display = 'flex';
    totalShadow.querySelector('.start').style.display = 'block';
    totalShadow.querySelector('.win').style.display = 'none';
    totalShadow.querySelector('.lose').style.display = 'none';
    let button = document.querySelector('.startGame'); // Accessing The Button //
    button.addEventListener("click", check); // Adding event to call function when clicked //
}


function check() {
    startGame();
    audio2.src = 'sounds/sergej_shnurovleningrad-vibori.mp3';
    audio2.play();
    totalShadow.style.display = 'none';
    totalShadow.querySelector('.start').style.display = 'none';
    totalShadow.querySelector('.win').style.display = 'none';
    totalShadow.querySelector('.lose').style.display = 'none';
}; // This Code Works Fine //

function startGame() {
    // begin();
    restartGame();
    let timeout = 0;
    let loop = setInterval(function () {
        timeout = Math.floor(Math.random() * 600 - 100);
        if (!gameOver && num !== total) {
            createBalloon();
        } else if (num !== total) {
            clearInterval(loop);
            totalShadow.style.display = 'flex';
            totalShadow.querySelector('.lose').style.display = 'block';
        } else {
            clearInterval(loop);
            totalShadow.style.display = 'flex';
            totalShadow.querySelector('.win').style.display = 'block';
        }
    }, 800 + timeout);
}

function restartGame() {
    let forRemoving = document.querySelectorAll('.balloon');
    for (let i = 0; i < forRemoving.length; i++) {
        forRemoving[i].remove();
    }
    gameOver = false;
    num = 0;
    updateScore();
}

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('balloon')) {
        deleteBalloon(event.target);
    }
});

document.querySelector('.restart').addEventListener('click', function () {
    totalShadow.style.display = 'none';
    totalShadow.querySelector('.start').style.display = 'none';
    totalShadow.querySelector('.win').style.display = 'none';
    totalShadow.querySelector('.lose').style.display = 'none';

    // begin();
    check();
    // startGame();
});

document.querySelector('.cancel').addEventListener('click', function () {
    totalShadow.style.display = 'none';
    audio2.pause();
    window.open("https://www.youtube.com/watch?v=ikVVrDQR4wQ");
});

begin();
// startGame();
