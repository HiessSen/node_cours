const express = require('express');
const app = express();

const mysql = require('mysql');
const connect = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: '', 
  database: 'api', 
})

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', function(req,res){
  res.render('homepage')
});
app.listen(8080);

connect.connect(function(err){
  if(err) throw err;
  console.log('Trop bien, ça fonctionne !');
  connect.query('SELECT * FROM users;', function(err, result) {
    if(err) throw err;
    console.log(result);
  });
});