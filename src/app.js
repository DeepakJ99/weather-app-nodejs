const express = require('express');
const path = require('path');
const hbs = require('hbs')
const geoCode = require('./utils/geoCode.js');
const forecast = require('./utils/forecast.js');
//console.log(__dirname);
const public = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');
const app = express();

//app.com
app.use(express.static(public));
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);
app.get('',(req,res)=>{
    res.render('index',{
        title:'Home',
        header:'The Weather Channel',
        name : 'Deepak J'
    });
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About",
        header:'The About Page',
        name:"Deepak J"
    })
});
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        header:'The Help Page',
        name:"EEFF"
    })
});
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You need to provide an address!'
        })
    }
        const address = req.query.address;

            geoCode(address,(error,data)=>{
                if(error || data == undefined){
                    return res.send({
                    error
                    })
                }
                    const  obj = {place : data.place_name,
                                    coordinates: { latitude : data.center[0],
                                                    longitude : data.center[1]
                                                }
                                            }
                    var c = {lat : data.center[0],lon : data.center[1]}
                    forecast(c,(error,data)=>{
                        if(error || data == undefined){
                            return res.send({ error })
                        }
                        obj.temperature = data.temp
                        obj.humidity = data.humidity
                        return res.send(obj);
                    })
                
            })
})
app.get('/products',(req,res)=>{
    console.log(req.query);
    if(!req.query.search){
        return res.send({
            error : 'Search query empty'
        })
        
    }
    res.send({
        products:[]
    })
})
app.get("*",(req,res)=>{
    res.render('404',{
        title:'Not Found',
        header:"Sorry!, the req. url is unavailable."
    });
})
app.listen(3000, ()=>{
    console.log("Starting a server!");
})