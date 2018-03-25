const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    Blockchain = require('./blockchain');

const { getBlockchain, createNewBlcok } = Blockchain;

const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use(morgan('combine'));
app.listen(PORT, () => {
    console.log(`this server port is open! at ${PORT}`, )
});