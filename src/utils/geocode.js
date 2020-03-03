const request = require('request')
const geocode = (address, callback) => {
    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicnlhbmdhcmNpYSIsImEiOiJjazc4Nm5jbWUwNWluM25wcDNvcWEzMXRuIn0.ajo3Xw9SBOTOnl7PHBqSnw&limit=1'

    request({url: geoUrl, json:true}, (error, {body}) => {
        if(error)
        {
            callback('Unable to connect to location services!', undefined)
            //console.log("Unable to connect to the geolocating service")
        } else if(body.features.length === 0)
        {
            callback('Unable to find location.  Try another search', undefined)
            //console.log("No information was available")
        }else{
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location: body.features[0].place_name

            })
            
            //console.log(latitude, longitude)
        }
    })
    
}

module.exports = geocode