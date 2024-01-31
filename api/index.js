
const cors = require('cors');

const express = require('express');

const app = express();

const port = 3000;

app.use(cors());

app.use(express.json());

const db = require('./config/connection');


const authController = require('./controllers/authController');
app.use('/auth', authController);

app.listen(port, () => {
    console.log('SERVIDOR RODANDO NA PORTA:', port);
})