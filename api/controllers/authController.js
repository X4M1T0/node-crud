
const express = require('express');

const app = express.Router();

const db = require('../config/connection');



// FUNÇÕES
const getConnection = require('../functions/getConnection');
const generateHash = require('../functions/generateHash');
const compareHash = require('../functions/compareHash');
const makeQuery = require('../functions/makeQuery');


// ROTA: CONTROLE DE REGISTRO

app.post('/register', async (req, res) => {
    const {data} = req.body;

    let connection;

    try {
        console.log(data);

        connection =  await getConnection(db);

        connection.beginTransaction((err) => {
            if(err){
                throw err;
            }
        })


        // BUSCA DADOS EM USO
        const resUsedData = await makeQuery(connection, 'SELECT * FROM users WHERE email = ? OR username = ?', [data.email, data.username]);

        if(resUsedData && resUsedData.length > 0){
            if(resUsedData[0].username){
                return res.status(200).send('USERNAME');

            } else if(resUsedData[0].email){
                return res.status(200).send('EMAIL');
            }
        }

        // GERA O HASH DA SENHA DO USUÁRIO COM BCRYPT
        const password = await generateHash(data.password);

        await makeQuery(connection, 'INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [data.email, password, data.username]);

        connection.commit((err) => {
            if(err){
                throw err;
            }
        })

        return res.status(201).send('OK');

    } catch (error) {
        console.error('ERROR - REGISTER FUNCTION:', error);
        await connection.rollback();
        return res.status(500).send('ERROR');
    
    } finally {
        if(connection){
            connection.release();
        }
    }
})





// ROTA: LOGIN
app.get('/login', async (req, res) => {
    const {email, password} = req.query;


    try{
        const responseUser = await makeQuery(db, 'SELECT * FROM users WHERE email = ?', email);

        if(responseUser && responseUser.length > 0){
            console.log('Response', responseUser[0].username);

            const compare = await compareHash(password, responseUser[0].password);

            if(compare){
                return res.status(200).json(responseUser[0]);
            } else {
                throw new Error(compare);
            }

        } else {
            return res.status(404).send('NOT FOUND');
        }

    } catch (error) {
        console.error('ERROR - LOGIN FUNCTION:', error);
        return res.status(500).send('ERROR');
    }
})

module.exports = app;