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
        powerUps:[
            {
                name: "2x clicker",
                description: "double your clicking power",
                multiplier: 2,
            },
            {
                name: "3x clicker",
                description: "triple your clicking power",
                multiplier: 3,
            },
            {
                name: "4x clicker",
                description: "quadruple your clicking power",
                multiplier: 4,
            },

        ],
        power: 0,
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
        powerUps:[
            {
                name: "2x pliers",
                description: "double your clicking power",
                multiplier: 2,
            },
            {
                name: "3x pliers",
                description: "triple your clicking power",
                multiplier: 3,
            },
            {
                name: "4x pliers",
                description: "quadruple your clicking power",
                multiplier: 2,
            },

        ],
        power: 0,
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

        powerUps:[
            {
                name: "2x clicker",
                description: "double your double plier power",
                multiplier: 2,
            },
            {
                name: "3x clicker",
                description: "triple your double plier power",
                multiplier: 3,
            },
            {
                name: "4x clicker",
                description: "quadruple your double plier power",
                multiplier: 2,
            },

        ],
        power: 0,
        multiplier: 3.025,
        costMultiplier: 3.18,
    }
]

export const powerUpIntervals = [10, 20, 30,50,70,100,150,200,250,300]

