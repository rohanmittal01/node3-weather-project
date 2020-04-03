const request = require('request')

const forecast = (longitude,latitude,callback)=>{
   const url = 'https://api.darksky.net/forecast/6b6c705c72808bec5a155a8d13c1a601/'+latitude+','+longitude+'?units=si'
    request({url:url,json:true},(error, response)=>{
        if(error){
            callback('Unable to connect to weather services',undefined)
        }else if(response.body.error){
            callback('Unable to find location',undefined)
        }else{
            const data = response.body.currently
            callback(undefined,response.body.daily.data[0].summary+' It is currently '+data.temperature+' degrees out. There is a '+data.precipProbability+'% chance of rain.')
        }
    })
}

module.exports = forecast