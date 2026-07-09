let gpc = 1;
let gps = 0;
let gem = document.querySelector('.gem-cost')

let parsedGem = parseFloat(gem.innerHTML);


let holdTimer = null;
let keyPressed = false;
let pressStartTime = 0;

let gpcText = document.getElementById("gpc-text");
let gpsText = document.getElementById("gps-text")

let paperClipImgContainer = document.querySelector(".paperClipDocumentContainer");

const upgrades = [
    {
        name: 'clicker',
        cost: document.querySelector('.clicker-cost'),
        parsedCost: parseFloat(document.querySelector('.clicker-cost').innerHTML),
        increase: document.querySelector('.clicker-increase'),
        parsedIncrease: parseFloat(document.querySelector('.clicker-increase').innerHTML),
        level: document.querySelector('.clicker-level'),
        multiplier: 1.025,
        costMultiplier: 1.12,
    },
    {
        name: 'pliers',
        cost: document.querySelector('.pliers-cost'),
        parsedCost: parseFloat(document.querySelector('.pliers-cost').innerHTML),
        increase: document.querySelector('.pliers-increase'),
        parsedIncrease: parseFloat(document.querySelector('.pliers-increase').innerHTML),
        level: document.querySelector('.pliers-level'),
        multiplier: 12.025,
        costMultiplier: 2.18,
    },
    {
        name: 'doublePliers',
        cost: document.querySelector('.doublepliers-cost'),
        parsedCost: parseFloat(document.querySelector('.doublepliers-cost').innerHTML),
        increase: document.querySelector('.doublepliers-increase'),
        parsedIncrease: parseFloat(document.querySelector('.doublepliers-increase').innerHTML),
        level: document.querySelector('.doublepliers-level'),
        multiplier: 3.025,
        costMultiplier: 3.18,
    },
]

function incrementGem(event) {
    gem.innerHTML = Math.round(parsedGem += gpc);

    let x,y;
    if(event && event.type ==='click'){
        const x = event.offsetX;
        const y = event.offsetY;

    }else{
            const containerWidth = paperClipImgContainer?paperClipImgContainer.offsetWidth:150;
            const containerHeight = paperClipImgContainer?paperClipImgContainer.offsetHeight:150;

            x=Math.floor(Math.random() * (containerWidth - 4)) +20;
            y= Math.floor(Math.random() * (containerHeight - 40))+20;
        }
    
    const div = document.createElement('div');
    div.innerHTML = `+${Math.round(gpc)}`
    div.style.cssText = `color: white; position:absolute; top:${y}px; left:${x}px; font-size:15px; pointer-events: none;`

    if(paperClipImgContainer){
        paperClipImgContainer.appendChild(div);
        div.classList.add('fade-up');
        timeout(div);
    }
}

function buyUpgrade(upgrade) {
    const mu = upgrades.find((u) => {
        if(u.name === upgrade) return u;
    })
    if(parsedGem >= mu.parsedCost){
        gem.innerHTML   = Math.round(parsedGem -= mu.parsedCost);

        mu.level.innerHTML ++

        mu.parsedIncrease = parseFloat((mu.parsedIncrease * mu.multiplier).toFixed(2));
        mu.increase.innerHTML = mu.parsedIncrease;

        mu.parsedCost*=mu.costMultiplier;
        mu.cost.innerHTML = Math.round(mu.parsedCost);

        if(mu.name === 'clicker'){
            gpc+=mu.parsedIncrease;
            
        }else{
            gps += mu.parsedIncrease;
        }
    }

    
}


//localStorage being used here bruvs. fancy schmancy
function save (){
    localStorage.clear();

    //maps through entire array, and we have to stringify evyerthign bc localstorage only accepts strings
    upgrades.map((upgrade) => {

        const obj = JSON.stringify({
            parsedLevel: parseFloat(upgrade.level.innerHTML),
            parsedCost: upgrade.parsedCost,
            parsedIncrease: upgrade.parsedIncrease
        })

        localStorage.setItem(upgrade.name, obj);

    })

    localStorage.setItem('gpc',JSON.stringify(gpc))
    localStorage.setItem('gps',JSON.stringify(gps))
    localStorage.setItem('gem',JSON.stringify(gem))
}

function load() {
    upgrades.map(upgrade => {
        const savedValues = JSON.parse(localStorage.getItem(upgrade.name))
        upgrade.parsedCost = savedValues.parsedCost

        upgrade.parsedIncrease = savedValues.parsedIncrease
        upgrade.level.innerHTML = savedValues.parsedLevel
        upgrade.cost.innerHTML = Math.round(upgrade.parsedCost);
        upgrade.increase.innerHTML = upgrade.parsedIncrease


    })

    gpc = JSON.parse(localStorage.getItem('gpc'))
    gps = JSON.parse(localStorage.getItem('gps'))
    parsedGem = JSON.parse(localStorage.getItem('parsedGem'))

    gem.innerHTML = Math.round(parsedGem)
}

//to remove div +1 once the animation is done form the paperClip
const timeout = (div => {
    setTimeout(() => {
        div.remove()
    }, 800)
})

window.addEventListener('keydown', function(event) {
    if(event.key.toLowerCase() === 'r'){
        if(keyPressed) return;
        event.preventDefault();

        keyPressed = true;
        pressStartTime = Date.now();

        holdTimer = setInterval(function() {
            let holdTime = (Date.now() - pressStartTime) /1000;

            if(holdTime >= 6.0){
                buyDoublePliers();
                clearInterval(holdTimer);

            }else if(holdTime >= 4.0 && holdTime < 4.1){
                buyPliers();
            }else if(holdTime >= 2.0 && holdTime < 2.1){
                buyClicker();
            }

        }, 100);
    }
});

window.addEventListener('keyup', function(e){
    if(e.key.toLowerCase() === 'r'){
        let holdTime = (Date.now()- pressStartTime)/1000;

        if(holdTime<2.0){
            incrementGem(e);
        }

        clearInterval(holdTimer);
        keyPressed = false;
    }
});

setInterval(() => {
    if( gps>0){
        parsedGem += gps/10;
        gem.innerHTML = Math.round(parsedGem);
    }
    gpcText.innerHTML = Math.round(gpc);
    gpsText.innerHTML = Math.round(gps);
}, 100);