let gpc = 1;
let gps = 0;
let gem = document.querySelector('.gem-cost')
let clickerCost = document.querySelector('.clicker-cost');
let parsedGem = parseFloat(gem.innerHTML);
let parsedClickerCost = parseFloat(clickerCost.innerHTML);
let clickerLevel = document.querySelector('.clicker-level')
let clickerIncrease = document.querySelector('.clicker-increase')
let parsedClickerIncrease = parseFloat(clickerIncrease.innerHTML);

let pliersCost = document.querySelector('.pliers-cost');
let parsedPliersCost = parseFloat(pliersCost.innerHTML);
let pliersLevel = document.querySelector('.pliers-level')
let pliersIncrease = document.querySelector('.pliers-increase')
let parsedPliersIncrease = parseFloat(pliersIncrease.innerHTML);

let doubPliersCost = document.querySelector('.doublepliers-cost');
let parseddoubPliersCost = parseFloat(doubPliersCost.innerHTML);
let doubPliersLevel = document.querySelector('.doublepliers-level')
let doubPliersIncrease = document.querySelector('.doublepliers-increase')
let parseddoubPliersIncrease = parseFloat(doubPliersIncrease.innerHTML);

let holdTimer = null;
let keyPressed = false;
let pressStartTime = 0;

let gpcText = document.getElementById("gpc-text");
let gpsText = document.getElementById("gps-text")

let paperClipImgContainer = document.querySelector(".paperClipDocumentContainer");


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

//to remove div +1 once the animation is done form the paperClip
const timeout = (div => {
    setTimeout(() => {
        div.remove()
    }, 800)
})

function buyClicker() {
    if(parsedGem >= parsedClickerCost){
        parsedGem -= parsedClickerCost;

        gem.innerHTML = Math.round(parsedGem);
        

        clickerLevel.innerHTML ++

        parsedClickerIncrease = parseFloat((parsedClickerIncrease *1.03).toFixed(2));
        clickerIncrease.innerHTML = parsedClickerIncrease;
        gpc+= parsedClickerIncrease;
        gps += parsedClickerIncrease;
        parsedClickerCost *= 1.18;
        clickerCost.innerHTML = Math.round(parsedClickerCost);
        
    }
}

function buyPliers() {
    if(parsedGem >= parsedPliersCost){
        parsedGem -= parsedPliersCost;

        gem.innerHTML = Math.round(parsedGem);
        pliersLevel.innerHTML ++;

        parsedPliersIncrease = parseFloat((parsedPliersIncrease *2.03).toFixed(2));
        pliersIncrease.innerHTML = parsedPliersIncrease;
        gpc+= parsedPliersIncrease;

        gps += parsedPliersIncrease;

        parsedPliersCost *= 2.18;
        pliersCost.innerHTML = Math.round(parsedPliersCost);

    }
}

function buyDoublePliers() {
    if(parsedGem >= parseddoubPliersCost){
        parsedGem -= parseddoubPliersCost;

        gem.innerHTML = Math.round(parsedGem);
        doubPliersLevel.innerHTML ++;

        parseddoubPliersIncrease = parseFloat((parseddoubPliersIncrease *3.03).toFixed(2));
        doubPliersIncrease.innerHTML = parseddoubPliersIncrease;
        gpc+= parseddoubPliersIncrease;

        gps += parseddoubPliersIncrease;

        parseddoubPliersCost *= 3.18;
        doubPliersCost.innerHTML = Math.round(parseddoubPliersCost);

    }
}

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