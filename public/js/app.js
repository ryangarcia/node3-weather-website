//import { createPublicKey } from "crypto";

console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = 'An error occured!'
            } else {
                //messageOne.textContent = JSON.stringify(data.location) + JSON.stringify(data.forecastData)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecastData
            }
        })
    })
})