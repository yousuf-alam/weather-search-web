const express = require ("express");
const https = require ("https");
const bodyparser = require("body-parser")



const app = express();

app.use(bodyparser.urlencoded({extended: true}));



app.get("/",function(req,res){

  res.sendFile( __dirname + "/index.html");


});

app.post("/",function(req,res){


  const city = req.body.cityname;
  const apikey = "3aaf4296224ec743a52a6a8577487a93";
  const url="https://api.openweathermap.org/data/2.5/weather?q=" + city +" &appid="+ apikey +"&units=metric"
  https.get(url,function(response){
  console.log(response.statusCode);

  response.on("data",function(data){

    const weatherdata= JSON.parse(data);
    const temp = weatherdata.main.temp;
    const des = weatherdata.weather[0].description;
    const icon = weatherdata.weather[0].icon;

    const imageurl = "http://openweathermap.org/img/wn/"+ icon   +"@2x.png"

   res.write("<p>weather description is " + des + "</p>");
    res.write("<h1>the temperature of "+ city +" is =" + temp + " degree celcius</h1>");

    res.write("<img src=" +  imageurl +">");
   res.send();
  })

  })

});




app.listen(3000,function(){


console.log("hi server is on");

})
