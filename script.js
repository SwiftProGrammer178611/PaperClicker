
import {powerUpIntervals, upgrades} from "./constants/upgrades.js";
let gpc = 1;
let gps = 0;
const bgm = new Audio('./assets/audio/bgm.mp3');
bgm.volume = 0.2
let gem = document.querySelector('.gem-cost')
let parsedGem = parseFloat(gem.innerHTML);
let holdTimer = null;
let keyPressed = false;
let pressStartTime = 0;
let gpcText = document.getElementById("gpc-text");
let gpsText = document.getElementById("gps-text")
let paperClipImgContainer = document.querySelector(".paperClipDocumentContainer");


function incrementGem(event) {
    //this is for rly fast clickers. The thing is, 
    //the sound wouldn't play if you clicked too fast. So if the clickingSound is down here, a new instance would be made each time
    //therefore, removing that issue!
    const clickingSound = new Audio('/assets/audio/click.wav')
    clickingSound.play()

    gem.innerHTML = Math.round(parsedGem += gpc);

    let x,y;
    if(event && event.type ==='click'){
         x = event.offsetX;
         y = event.offsetY;

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

    const upgradeDiv = document.getElementById(`${mu.name}-upgrade`)
    const nextLevelDiv = document.getElementById(`${mu.name}-next-level`)
    const nextLevelP = document.getElementById(`${mu.name}-next-p`)

    if(parsedGem >= mu.parsedCost){
        const upgradeSound = new Audio('./assets/audio/click.mp3');
        upgradeSound.volume = 0.3
        upgradeSound.play()
        gem.innerHTML   = Math.round(parsedGem -= mu.parsedCost);

        let index = powerUpIntervals.indexOf(parseFloat(mu.level.innerHTML) +1)
        if(index !==-1){
            upgradeDiv.style.cssText = `border-color: white`;
            nextLevelDiv.style.cssText = `background-color: #CC4500; font-weight: normal`;
            nextLevelP.innerHTML = mu.powerUps[index].description
            mu.cost.innerHTML = Math.round(mu.parsedCost *= mu.costMultiplier)

            if(mu.name === 'clicker'){
                gpc *= mu.powerUps[index].multiplier
                nextLevelP.innerHTML = `${mu.parsedIncrease} gems per click`
            }else{
                gps -= mu.power
                mu.power *= mu.powerUps[index].multiplier
                gps += mu.power
                nextLevelP.innerHTML = `${mu.parsedIncrease} gems per second`
            }
        }
        mu.level.innerHTML ++;
        
        
        if(index!==-1){
            upgradeDiv.style.cssText = `border-color: orange`;
            nextLevelDiv.style.cssText = `background-color: #CC4500; font-weight: bold`;
            nextLevelP.innerHTML = mu.powerUps[index].description

            mu.cost.innerHTML = Math.round(moveBy.parsedCost = mu.parsedCost * 2.5 * 1.004 ** parseFloat(mu.level.innerHTML))
        } else{
            mu.cost.innerHTML = Math.round(mu.parsedCost *= mu.costMultiplier);
            mu.parsedIncrease = parseFloat((mu.parsedIncrease * mu.multiplier).toFixed(2));

            if(mu.name === 'clicker') nextLevelP.innerHTML = `${mu.parsedIncrease} gems per click`
            else nextLevelP.innerHTML = `+${mu.parsedIncrease} gems per second`
        }

        if(mu.name === 'clicker') gpc += mu.parsedIncrease
        else{
            gps -= mu.power
            mu.power += mu.parsedIncrease
            gps += mu.power
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
    localStorage.setItem('gem',JSON.stringify([parsedGem]))
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
    parsedGem = JSON.parse(localStorage.getItem('gem'))

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

            if(holdTime>= 6.0){
                buyUpgrade('doublepliers');
                clearInterval(holdTimer);

            } else if ( holdTime >= 4.0 && holdTime <4.1){
                buyUpgrade('pliers')
            }else if(holdTime >= 2.0 && holdTime < 2.1){
                buyUpgrade('clicker');
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
    bgm.play();
}, 100);
window.incrementGem = incrementGem
window.buyUpgrade = buyUpgrade
window.save = save
window.load = load

