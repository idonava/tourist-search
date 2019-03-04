const { Client } = require('pg')
const express = require('express');
const router = express.Router();

const client = new Client({
    user: 'idonava',
    host: 'postgres-tourist.cysyblukbczg.eu-west-1.rds.amazonaws.com',
    database: 'Postgres',
    password: 'idonavaPg',
    port: 5432,
})
client.connect(function (err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }

    //console.log('Connected to database.');
});


module.exports = router;