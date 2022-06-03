
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
  
  
// default route
app.get('/', function (req, res) { // try postman again, i'll be 5 mins NIC! yes i can kind of hear u
    return res.send({ error: true, message: 'Hej Carmen' })
});
// connection configurations
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'restfulapi-2'
});
  
// connect to database
dbConn.connect(); 
 
 
// Retrieve all users 
app.get('/users', function (req, res) {
    dbConn.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});
 

let testObject = {};

testObject.name = "Krille"
testObject['age'] = 40;
let genderKey = 'hello'
testObject.genderKey = 'Test'
testObject[genderKey] = 'Male';
//console.log(testObject)

// Retrieve user with id 
app.get('/user/:id', function (req, res) {
  
    let user_id = req.params.id;
  
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
  
    dbConn.query('SELECT * FROM users where id=?', user_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'users list.' });
    });
  
});
 
 
 
// Add a new user  
app.post('/user', function (req, res) {
  console.log(req.body)
    let user = req.body.user;
  console.log(user)
    if (!user) {
        return res.status(400).send({ error: true, message: 'Please provide user' });
    }
  
    dbConn.query("INSERT INTO users SET ? ", user, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
    });
});

// you had this: { name: 'Juice', email: '40', message: 'sthlm' }
// {"user": { "name": "Krille", "age": 40, "email": "test@test.se" } }
 

//  
 
//  Update user with id
app.put('/user', function (req, res) {
    console.log(req.body)
    let user_id = req.body.user_id;
    let user = req.body.user;
  
    if (!user_id || !user) {
        return res.status(400).send({ error: user, message: 'Please provide user and user_id' });
    }
    let sql = `UPDATE users
    SET user = ?
    WHERE id = ?`;


    let data = [user, parseInt(user_id)];
    dbConn.query(sql, data, function (error, results, fields) {
    //dbConn.query("UPDATE users SET user = ? WHERE id = ?", [user, user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
    }); 
});
 
 
//  Delete user
app.delete('/user', function (req, res) {
    console.log(req.body)
    let user_id = req.body.user_id;
  
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    dbConn.query('DELETE FROM users WHERE id = ?', [user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'User has been updated successfully.' });
    }); 
}); 
 
// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
 
module.exports = app;



