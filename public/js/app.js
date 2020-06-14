

console.log('Client side js is loaded!');

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data);
    })
})

/*
this method does not require our server, it directly communicates with geocode and weather api
fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiZGVlcGFrLWoiLCJhIjoiY2tiZDVxMnZlMDhvajJ4bTJma3I5emc0YiJ9.smhFu5T0xZ9AnHr5cKI-QQ&limit=1').then((response)=>{
    response.json().then((data) =>{
        let coords = {}
        console.log(data)
        coords.lat = data.features[0].center[0]
        coords.lon = data.features[0].center[1]
        //console.log(coords)
        console.log("You are in "+data.features[0].place_name + ". Your coordinates are "+data.features[0].center)
        fetch('https://api.openweathermap.org/data/2.5/weather?lat='+coords.lat+'&lon='+coords.lon+'&appid=bd0680bfe4430a4fa8c3cb13dcbc17c4').then((response)=>{
            response.json().then((data)=>{
                //console.log(data);
                console.log(".The temperature is "+data.main.temp)
            })
        })
    })
})
*/
/*
*/

const weatherForm = document.querySelector('form');
const address = document.querySelector('input');
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = address.value
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            document.getElementById('myData').innerText = "Unable to find Location. Try a different location."
        }
        document.getElementById('myData').innerHTML="<ul><li>Location: "+data.place + "<li>Latitude: "+data.coordinates.latitude+"<li>Longitude: "+data.coordinates.longitude+"<li>Temperature: "+data.temperature+" degree F";
    })
})
})