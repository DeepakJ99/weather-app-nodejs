var request = require('request');

const forecast = (coords,callback)=>{
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+coords.lat+'&lon='+coords.lon+'&appid=bd0680bfe4430a4fa8c3cb13dcbc17c4';
    //console.log(url);
    request({url:url,json:true},(error,response)=>{
        if(error){
        callback('Error connecting to forecast api',undefined);
    }
    else{
        callback(undefined,response.body.main)
    }
});
}

module.exports = forecast;


