var request = require('request');

const geoCode = (address,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoiZGVlcGFrLWoiLCJhIjoiY2tiZDVxMnZlMDhvajJ4bTJma3I5emc0YiJ9.smhFu5T0xZ9AnHr5cKI-QQ&limit=1"
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to Connect to Services',undefined);
        }
        else{
            callback(undefined,response.body.features[0]);
        }
    });
}

module.exports = geoCode; 