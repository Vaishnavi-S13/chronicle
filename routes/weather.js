
const express = require("express");
const _ =require("lodash");
const https = require("https");
const weather = express.Router()
weather.use(express.static("public"));

let weatherData;
let bg = "images/sample.gif";
let temperature = "temperature ?";
let description = "description ?";
let imageURL ="https://cdn-icons-png.flaticon.com/128/1163/1163661.png";
let query ="";

weather.get("/", function(req,res){
  res.render("main",{description:description ,
    temperature:temperature,
    imageURL:imageURL,
    query:query,
    bg:bg});
});


weather.post("/",function(req,res){
     query = req.body.city;
    const apiKey = process.env.WEATHER_APIKEY;
    const unit = "metric";

    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+ apiKey +"&units=" + unit;
   https.get(url, function(response){
   console.log(response.statusCode);
   response.on("data", function(data){
    weatherData = JSON.parse(data);
   temperature = weatherData.main.temp
   description = _.upperFirst(weatherData.weather[0].description)
   const icon = weatherData.weather[0].icon
   const query1=_.upperCase(query)
   imageURL = "http://openweathermap.org/img/wn/"+ icon + "@2x.png"

   if(weatherData.weather[0].id < 250){
     bg = "images/thunderstorm.gif";
   }
   else if(weatherData.weather[0].id < 350){
     bg = "images/drizzle.gif";
   }
   else if(weatherData.weather[0].id < 550){
     bg = "images/rain.gif";
   }
   else if(weatherData.weather[0].id < 650){
     bg = "images/snow.gif";
   }
   else if(weatherData.weather[0].id < 790){
     bg = "images/atmosphere.gif";
   }
   else if(weatherData.weather[0].id == 800){
     bg = "images/clear.gif";
   }
   else if(weatherData.weather[0].id < 810){
     bg = "images/clouds.gif";
   }

   console.log(bg);
   console.log(weatherData.weather[0].id);
     res.render("main",{temperature:(temperature + " &#176 C"),
       imageURL:imageURL ,
       description:description,
       query:query1,
       bg:bg
     });
   });
 });
});
























module.exports = weather
