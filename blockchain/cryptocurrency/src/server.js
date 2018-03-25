const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    Blockchain = require('./blockchain');

const { getBlockchain, createNewBlock } = Blockchain;

const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use(morgan('combine'));

// 블록 보기를 요청 했을 때
app.get('/blocks', (req, res) => {
    res.send(getBlockchain());
})

// 새 블록을 추가할때
app.post('/blocks', (req, res) => {
    const { body: { data } } = req;
    const newBlock = createNewBlock();
    res.send(newBlock);
})

app.listen(PORT, () => {
    console.log(`this server port is open! at ${PORT}`, )
});