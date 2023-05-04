const {query} = require("express");
const express = require("express");
const app = express();

const mysql = require('mysql');
const connect = mysql.createConnection({
    host : "localhost",
    user: "root",
    password : "",
    database : "vierzon"
});

app.use(express.static("public"));
app.set('view engine', "ejs");
app.set('views', "./views");
app.listen(8080);

app.use(express.json());

connect.connect(function(err){
    if(err) throw err;
    console.log("Super cela fonctionne TROP BIEN");
    connect.query("SELECT * from recette;", function(err, result) {
        if (err) throw err;
        console.log(result)
    })
});
// visuel postman
app.get("/recette", function(request, response){
    connect.query("SELECT * from recette;", function(err, result) {
        if (err) throw err;
        console.log(result);
        response.status(200).json(result);
    })
});

// add

app.post('/recette',(request, response) => {
    const querys = "INSERT INTO RECETTE (titre,contenu) values ('"+request.body.titre+"','"+request.body.contenu+"');";
    console.log(querys);
    connect.query(querys, function (err, result){
        if(err) throw err;
        console.log(result);
        response.status(200).json(result)
    })
});

app.get("/recette/:id", function(request, response){
    connect.query("SELECT * from recette WHERE id="+request.params.id+";", function(err, result) {
        if (err) throw err;
        console.log(result);
        response.status(200).json(result);
    })
});

// delete

app.delete('/recette/:id', (request, response) => {
    const id = parseInt(request.params.id);
    const query = "DELETE FROM RECETTE WHERE id="+id+ ";";
    connect.query(query, function (err, result){
        if (err) throw err;
        console.log(result);
        response.status(200).json(result);
    })
});






app.get("/", function (request, response){
    response.render("test");

})