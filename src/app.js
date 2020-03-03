const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//Setup handlbards engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to servie
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ryan Garcia'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About Me',
        name: 'Ryan Garcia'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Your friend, Ryan,',
        title:'Help',
        name:'Ryan Garcia'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error: 'You didn\'t provide an address'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return console.log(error)
            }

            res.send({
                latitude,
                longitude,
                location,
                forecastData
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'The help article you are looking for is not here',
        name: 'Ryan Garcia',
        errorMessage: "I can't help you."
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: 'Page Note Found',
        name: 'Ryan Garcia',
        errorMessage: 'This is a mistake'
    })
})

//http default port is 80
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})