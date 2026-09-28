const score1 = document.getElementById("score");
const time1 = document.getElementById("time");
const live1 = document.getElementById("livs");
const level1 = document.getElementById("level");
const gameboard = document.getElementById("gameboard");
const message1 = document.getElementById("message");
const but = document.getElementById("restart");

let score = 0;
let time = 60;
let timer = null;
let lives = 10;
let currentlevel = 1;

let firstcard = null;
let secondcard = null;
let lockboard = false;
let matchedpairs = 0;

const emojes = [
    "🐼",
    "🐨",
    "🍕",
    "🍗",
    "🔵",
    "🚗",
    "🌷",
    "😎"
];

const emojes2 = [
    "🐼",
    "🐨",
    "🍕",
    "🍗",
    "🔵",
    "🚗",
    "🌷",
    "😎",
    "❤️",
    "🎈"
];

let cards = [];


function start(level) {

    currentlevel = level;
    level1.innerHTML = level;
    gameboard.innerHTML = "";
    message1.innerHTML = "";

    firstcard = null;
    secondcard = null;
    lockboard = false;
    matchedpairs = 0;

    clearInterval(timer);


    if (level === 1) {
        cards = [...emojes, ...emojes];
        gameboard.style.gridTemplateColumns = "repeat(4, 100px)";

        time = 60;
        lives = 10;

    }

    else {

        cards = [...emojes2, ...emojes2];

        gameboard.style.gridTemplateColumns = "repeat(5, 100px)";

        time = 90;
        lives = 8;
    }



    time1.innerHTML = time;
    live1.innerHTML = lives;

    cards.sort(() => Math.random() - 0.5);

    cards.forEach(emoji => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = emoji;
        card.addEventListener("click", flip);
        gameboard.appendChild(card);

    });


    /* Start timer */

    timer = setInterval(() => {
        time--;
        time1.innerHTML = time;
        if (time <= 0) {
            clearInterval(timer);
            gameover();

        }

    }, 1000);
}



function flip() {
    if (this.classList.contains("matched")) {
        return;
    }

    if (this.classList.contains("show")) {
        return;
    }

    if (lockboard) {
        return;
    }


    this.classList.add("show");
    if (firstcard === null) {
        firstcard = this;
        return;
    }
    secondcard = this;
    lockboard = true;


    if (firstcard.innerHTML === secondcard.innerHTML) {

        firstcard.classList.add("matched");
        secondcard.classList.add("matched");

        matchedpairs++;
        score += 2;

        score1.innerHTML = score;
        reset();

        const neededPairs = currentlevel === 1 ? 8 : 10;

        if (matchedpairs === neededPairs) {
            clearInterval(timer);
            setTimeout(wingame, 500);

        }

    }

    else {

        lives--;
        live1.innerHTML = lives;
        setTimeout(() => {

            if (firstcard) {
                firstcard.classList.remove("show");
            }

            if (secondcard) {
                secondcard.classList.remove("show");
            }

            reset();

            if (lives <= 0) {
                clearInterval(timer);
                gameover();

            }

        }, 700);

    }
}


function reset() {
    firstcard = null;
    secondcard = null;
    lockboard = false;
}


function wingame() {

    if (currentlevel === 1) {
        message1.innerHTML =
            "🎉 Level 1 Complete! Starting Level 2...";


        setTimeout(() => {
            start(2);
        }, 2000);

    }
    else {

        message1.innerHTML =
            "🏆 Congratulations! You Finished the Game!";

    }
}


function gameover() {

    clearInterval(timer);
    gameboard.innerHTML = "";
    message1.innerHTML = "💀 GAME OVER";
}

function restartgame() {

    clearInterval(timer);

    score = 0;
    time = 60;
    lives = 10;
    currentlevel = 1;
    matchedpairs = 0;
    firstcard = null;
    secondcard = null;
    lockboard = false;

    score1.innerHTML = score;
    live1.innerHTML = lives;
    time1.innerHTML = time;
    level1.innerHTML = 1;
    message1.innerHTML = "";

    start(1);
}

but.addEventListener("click", restartgame);

restartgame();