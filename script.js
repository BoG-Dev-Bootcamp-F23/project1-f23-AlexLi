
let ID = 1;

async function getData() {
    // const response = await fetch(`https://pokeapi.co/api/v2/ability/${ID}/`);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ID}`);
    const data = await response.json();
    const pic = document.getElementById("pic");
    const name = document.getElementById("name");

    pic.src = data.sprites.front_default;
    name.innerText = data.species.name;
    /*
    const p = document.getElementById("move");
    p.innerText = data.name;
    */
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

getData();
// console.log(getData());