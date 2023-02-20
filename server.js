const supabaseimport = require('@supabase/supabase-js');
const express = require("express");
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt-nodejs")
const cors = require('cors')
const knex = require('knex');
require('dotenv').config();

const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseimport.createClient(supabaseUrl, supabaseKey);

const db = knex({
    client: 'pg',
    connection: process.env.DB_CONNECTION
});
 
const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app.use(bodyParser.json());
app.use(cors());     
app.get('/', (req, res) => {
    res.send('success');
})

app.post('/signin', (req, res) => {signIn.handleSignIn(req, res, db, bcrypt)});
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});
app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

app.listen(port, () => {
    console.log('app is ok');
})