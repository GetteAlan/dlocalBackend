const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const users = require('./users.json');
const cors = require('cors');

// settings
app.set('port',3000);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

app.listen(app.get('port'), () => {
	console.log(`Server listening on port ${app.get('port')}`);
});

// API
app.get('/loging', (req,res) => {
    let respuesta = {logged:true};
    let usernameRequest = "pepito";

    let found = users.find((username)=>{ return username === usernameRequest});


    res.json(found)
	res.end();
});

app.post('/login', (req,res) => {
    let userRequest = req.body;

    let found = users.find((user)=>{ 
        return user.username  === userRequest.username && user.password === userRequest.password
    });

    res.setHeader('Content-Type','application/json');
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, DELETE, PUT');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.json(found);
});