const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, 1000, 1000);

for (let i = 0; i <= 1000; i += 200) {
    createColumn(i);
}

const matches = [];
let flag = false;


document.getElementById('btn-clear')
.addEventListener('click', () => {
    location.reload();
})

document.getElementById('btn-start')
.addEventListener('click', () => {
    if (!flag) {
        throwMatches();
        drawMatches(matches);
        let answer = getAnswer(matches);
        document.getElementById('result').innerText = `${answer}`;
        flag = true;
    } else {
        return
    }

})

function createColumn(x = 0) {
    ctx.fillStyle = 'gray';
    ctx.fillRect(x, 0, 100, 1000);
}

function getRndDeg() {
    return Math.round(Math.random() * 360);
}

function getRndPosition() {
    return Math.round(Math.random() * 1000);
}

function calculationPosition(x, y, deg) {
    let sin = Math.sin(deg * 0.0174533);
    let cos = Math.cos(deg * 0.0174533);
    return {x: Math.round(x + cos * 50) , y: Math.round(y + sin * 50)};
}

function getMatche() {
    let firstX = getRndPosition();
    let firstY = getRndPosition();
    let deg = getRndDeg();
    let {x: secondX, y: secondY} = calculationPosition(firstX, firstY, deg);
    return {firstX, firstY, secondX, secondY};
}

function throwMatches(){
    while(matches.length != 300) {
        let matche = getMatche();
        if (matche.secondX <= 1000 && matche.secondX >= 0 && matche.secondY <= 1000 && matche.secondY >= 0) {
            matches.push(matche);
        }
    }
}

function drawMatches(matches) {
    matches.forEach(match => {
        let {firstX, firstY, secondX, secondY} = match;
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(firstX, firstY);
        ctx.lineTo(secondX, secondY);
        ctx.stroke();
        ctx.closePath();
    })
}

function getAnswer(matches) {
    count = 0;
    matches.forEach(matche => {
        let {firstX, secondX} = matche;
        if ((firstX / 100).toFixed(0) != (secondX / 100).toFixed(0)) {
            count += 1;
        }
    })
    return (300 / count).toFixed(2);
}

