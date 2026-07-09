let gpc = 1;
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



function incrementGem() {
    gem.innerHTML = Math.round(parsedGem += gpc);
}

function buyClicker() {
    if(parsedGem >= parsedClickerCost){
        gem.innerHTML = Math.round(parsedGem-parsedClickerCost);

        clickerLevel.innerHTML ++

        parsedClickerIncrease = parseFloat((parsedClickerIncrease *1.03).toFixed(2));
        clickerIncrease.innerHTML = parsedClickerIncrease;
        gpc+= parsedClickerIncrease;

        parsedClickerCost *= 1.18;
        clickerCost.innerHTML = Math.round(parsedClickerCost);

    }
}

function buyPliers() {
    if(parsedGem >= parsedPliersCost){
        gem.innerHTML = Math.round(parsedGem-=parsedPliersCost);

        pliersLevel.innerHTML ++;

        parsedPliersIncrease = parseFloat((parsedPliersIncrease *1.03).toFixed(2));
        pliersIncrease.innerHTML = parsedPliersIncrease;
        gpc+= parsedPliersIncrease;

        parsedPliersCost *= 1.18;
        pliersCost.innerHTML = Math.round(parsedPliersCost);

    }
}

