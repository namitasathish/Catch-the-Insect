//startup
const playgamebtn= document.getElementsByClassName("playgamebtn")[0];
const display=document.querySelectorAll(".display");
playgamebtn.addEventListener("click",()=>{display[0].classList.add('up');});

//chooseinsect
const chooseinsect=document.querySelectorAll(".chooseinsect");
var selectedinsect={};
chooseinsect.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selectedinsect = { src, alt }
        display[1].classList.add('up')
        setTimeout(createinsect, 1000)
        startgame()
    })
});

//gameplay
function startgame() {
    setInterval(increasetime, 1000)
}

let seconds=0;
const time=document.getElementById("time");
function increasetime() 
{
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    time.innerHTML = `Time: ${m}:${s}`
    seconds++
}

function getrandomlocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 300) + 100
    const y = Math.random() * (height - 300) + 100
    return { x, y }
}

function createinsect() {
    const insect = document.createElement('div')
    insect.classList.add('insect')
    const { x, y } = getrandomlocation()
    insect.style.top = `${y}px`
    insect.style.left = `${x}px`
    insect.innerHTML = `<img src="${selectedinsect.src}" alt="${selectedinsect.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`

    insect.addEventListener('click', catchinsect)

    gameplay.appendChild(insect)
}


function catchinsect() {
    increasescore()
    this.classList.add('caught')
    setTimeout(() => this.remove(), 2000)
    addinsects()
}

let s=0;
const message = document.getElementById('message')
const score = document.getElementById('score')
function increasescore() {
    s++
    if(s> 19) {
        message.classList.add('visible')
    }
    score.innerHTML = `Score: ${s}`
}

function addinsects() {
    setTimeout(createinsect, 1000)
    setTimeout(createinsect, 1500)
}

