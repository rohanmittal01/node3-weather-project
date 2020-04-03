const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const hbs = require('hbs')
// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//setup handlebars engine
app.set('view engine','hbs') //(name,value)
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(request,response)=>{
        response.render('index',{
            title: 'Weather app',
            name: 'Rohan Mittal' 
        })
})


app.get('/help',(request,response) =>{
    response.render('help',{
        title: 'Help!',
        message: 'Help! I am Drowning',
        name: 'Rohan Mittal'
    })
})
app.get('/about',(request,response)=>{
    response.render('about',{
        title:'About',
        name: 'Rohan Mittal'
    })
})

app.get('/products',(request,response)=>{
    
    if(!request.query.search){
        response.send({
            error:'You must provide a search term'
        })
    }else{
    console.log(request.query.search
        )
    response.send({
        products:3000 
    })
    }
})

app.get('/weather',(request,response)=>{
    if(!request.query.address){
        return response.send({
            error: 'You must provide an address'
        })
    }
    geocode(request.query.address, (error,data={})=>{
        if(error){
            return response.send({
                error: error
            })
        }
        forecast(data.latitude, data.longitude, (error,forecastData)=>{
            if(error){
                return response.send({
                    error: error
                })
            }
            response.send({
                forecast: forecastData,
                location: data.location,
                address: request.query.address
            })
        })
    })


    // response.send({
    //     forecast: 'It is hot',
    //     location: 'Chennai',
    //     address: request.query.address
    // })
})
app.get('/help/*',(request,response)=>{
    response.render('404',{
        title: '404',
        name: 'Rohan Mittal',
        errorMessage: 'Help article not found'
    })
})
//404 page
app.get('*',(request,response)=>{
    response.render('404',{
        title:'404',
        name: 'Rohan Mittal',
        errorMessage: 'Page not founnd'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})
