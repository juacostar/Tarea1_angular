var express = require("express")
cors = require("cors"); // requiriendo express module

var app = express(); // creando servidor web
app.use(express.json()); // vamos a usar json
app.listen(3000, () => console.log("corriendo en el puerto 3000"));


//app.get("url", (req, res, next) => res.json(["Paris", "Barcelona", "Barranquilla", "Montevideo", "Santiago de chile"]));
var ciudades = ["Paris", "Barcelona", "Barranquilla", "Montevideo", "Santiago de chile"];
app.get("/ciudades", (req, res, next) => res.json(ciudades.filter((c) => c.toLowerCase().indexOf(req.query.q.toString().toLowerCase()) > -1)));

var misDestinos = [];
app.get("/my", (req, res, next) => res.json(misDestinos));
app.post("/my", (req, res, next) => {
    console.log(req.body);
    misDestinos.push(req.body.nuevo);
    res.json(misDestinos);
});

exports.handler = async(event) => {
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "http://localhost:4200",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};

/*
app.get("/api/translation", (req, res, next) => res.json([
    { lang: req.query.lang, key: 'HOLA', value: 'HOLA' + req.query.lang }
]));
*/