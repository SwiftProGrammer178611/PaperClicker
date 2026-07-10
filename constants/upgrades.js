import { defaultValues } from "./defaultValue.js";

function createUpgrades() {
    const upgradesContainer = document.getElementById('upgrades-container')
    const template = document.getElementById('upgrade-template').textContent

    defaultValues.forEach((obj) => {
        //this html holds all information for each individual upgrade for every iteration
        let html = template;

        //this works with the defaultVals .js file to make code clearner
        Object.keys(obj).forEach((key) => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            html = html.replace(regex, obj[key])
        })

        upgradesContainer.innerHTML += html
    })

}

createUpgrades();

export const upgrades = [
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
        name: 'doublepliers',
        cost: document.querySelector('.doublepliers-cost'),
        parsedCost: parseFloat(document.querySelector('.doublepliers-cost').innerHTML),
        increase: document.querySelector('.doublepliers-increase'),
        parsedIncrease: parseFloat(document.querySelector('.doublepliers-increase').innerHTML),
        level: document.querySelector('.doublepliers-level'),
        multiplier: 3.025,
        costMultiplier: 3.18,
    }
]