'use strict'
const express = require('express');
const bodyParser = require('body-parser');
//const getDateDiff = require('./bus_days_cals');
const getDateDiff = require('./bus_days_cals2');
//*create server to handle post requests with response as post
//*test with postman
//*maybe check if it can be done with get route as well


const app = express();
const iPort = 8080;
app.use(bodyParser.json());

app.get('/', (req, res)=> {
    try{
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(getDateDiff(String(req.query.Date1), String(req.query.Date2))));
        //http://localhost:8080/?Date1=01%2F01%2F2022&Date2=02%2F01%2F2022
    } catch (err) {
        //add 400 type status
        console.log(err);
        res.end(err);
    }
});

app.post('/', (req, res)=> {
    try{
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(getDateDiff(String(req.body.Date1), String(req.body.Date2))));     
    } catch (err) {
        //add 400 type status
        console.log(err);
        res.end(err);
    }
    
});


app.listen(iPort, () => {console.log("Server Starting...");} );

