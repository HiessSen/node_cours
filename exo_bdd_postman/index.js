const { query } = require('express');
const express = require('express');
const app = express();

const mysql = require('mysql');
const connect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'garage'
});

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.listen(8081);

app.use(express.json());

connect.connect(function(err){
  if(err) throw err;
  console.log('Super, cela fonctionne. Trop bien !');
  connect.query('SELECT * FROM voiture;', function (err, result){
    if(err) throw err;
    console.log(result);
  })
})
// Visuel postman
app.get('/voiture', function (request, response){
  connect.query('SELECT * FROM voiture;', function (err, result){
    if(err) throw err;
    console.log(result);
    response.status(200).json(result)
  })
});

// add
app.post('/voiture', (request, response) => {
  const queries = "INSERT INTO voiture (marque, modele, kilometres) values ('"+request.body.marque+"','"+request.body.modele+"','"+request.body.kilometres+"');";
  console.log(queries);
  connect.query(queries, function (err, result){
    if(err) throw err;
    console.log(result);
    response.status(200).json(result);
  })
})


app.get('/voiture/:id', function(request, response){
  connect.query("SELECT * FROM voiture WHERE id="+request.params.id+";", function(err, result){
    if(err) throw err;
    console.log(result);
    response.status(200).json(result);
  })
})

// delete
app.delete('/voiture/:id', (request, response) => {
  const id = parseInt(request.params.id);
  const query = "DELETE FROM voiture WHERE id="+id+ ";";
  connect.query(query, function (err, result){
      if (err) throw err;
      console.log(result);
      response.status(200).json(result);
  })

});


app.get('/', function(request, response){
  response.render('test') 
})