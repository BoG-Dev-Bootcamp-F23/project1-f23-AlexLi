
let ID = 1;

async function getData() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ID}`);
    const data = await response.json();
    const pic = document.getElementById("pic");
    const name = document.getElementById("name");
    const stats = document.getElementById("stats");

    pic.src = data.sprites.front_default;
    name.innerText = data.name;
    if(infoButton.value === "ON") {
        stats.innerText = getInfo(data);
    } else {
        stats.innerText = getMoves(data);
    }   
    setTypes(data);
}

function moveLeft() {
    if(ID > 1) {
        ID--;
    }   
}

function moveRight() {
    if(ID <= 1000) {
        ID++;
    }
}

const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");
const infoButton = document.getElementById("info");
const moveButton = document.getElementById("move");

leftButton.addEventListener("click", (event) => {
    moveLeft();
    getData();
});

rightButton.addEventListener("click", (event) => {
    moveRight();
    getData();
});

infoButton.addEventListener("click", (event) => {
    toggleInfo();
});

moveButton.addEventListener("click", (event) => {
    toggleMove();
});

infoButton.value = "ON";
moveButton.value = "OFF";

function setTypes(data) {
    const typesContainer = document.getElementById("types-container");
    let typesHTML = "";
    data.types.forEach(t => {
        typesHTML += `<p id="${t.type.name}">${t.type.name}</p>\n`;
    });
    typesContainer.innerHTML = typesHTML;
}
function getInfo(data) {
    const statsTitle = document.getElementById("stats-title");
    statsTitle.innerText = "Info";
    infoButton.style.backgroundColor = "#7CFF79";
    moveButton.style.backgroundColor = "#E8E8E8";
    return `height: ${data.height / 10}m
            weight: ${data.weight / 10}kg
            hp: ${data.stats[0].base_stat}
            attack: ${data.stats[1].base_stat}
            defense: ${data.stats[2].base_stat}
            special-attack: ${data.stats[3].base_stat}
            special-defense: ${data.stats[4].base_stat}
            speed: ${data.stats[5].base_stat}`;
}

function getMoves(data) {
    const statsTitle = document.getElementById("stats-title");
    statsTitle.innerText = "Moves";
    infoButton.style.backgroundColor = "#E8E8E8";
    moveButton.style.backgroundColor = "#7CFF79";
    let movesString = "";
    for(let i = 0; i < data.moves.length && i < 10; i++) {
        movesString += data.moves[i].move.name + "\n";
    }
    return movesString;
}

async function toggleInfo() {
    if(infoButton.value === "OFF") {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ID}`);
        const data = await response.json();
        const stats = document.getElementById("stats");
        infoButton.value = "ON";
        moveButton.value = "OFF";
        stats.innerText = getInfo(data);
    }
}

async function toggleMove() {
    if(moveButton.value === "OFF") {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ID}`);
        const data = await response.json();
        const stats = document.getElementById("stats");
        infoButton.value = "OFF";
        moveButton.value = "ON";
        stats.innerText = getMoves(data);
    }
}

getData();
