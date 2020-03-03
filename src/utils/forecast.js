const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/7f4a1b2bc0a8d3c37e5e7ae12106cd82/' + latitude +',' + longitude

    request({url, json: true}, (error, {body}) => { 
        if(error){ 
            callback('Unable to connecto forecast service')
        } else if(body.error)
        {
            callback('No results were returned.')
        }
        else {
            const data = body.currently
            console.log(body.daily.data[0])
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + data.temperature + ". There is a " + data.precipProbability + "% chance of rain. The high today is " + body.daily.data[0].temperatureHigh + '. The low today is ' + body.daily.data[0].temperatureLow + '.'
            )
        }

    })
}

module.exports = forecast