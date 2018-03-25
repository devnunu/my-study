
const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    Blockchain = require('./blockchain'),
    P2P = require('./p2p');

const { getBlockchain, createNewBlock } = Blockchain;
const { startP2PServer, connectToPeers } = P2P;

const PORT = process.env.HTTP_PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(morgan('combine'));

// 블록 보기를 요청 했을 때
app.get('/blocks', (req, res) => {
    res.send(getBlockchain());
})

// 다른 피어를 연결할 떄
app.post('/peers', (req, res) => {
    const { body: { peer } } = req;
    connectToPeers(peer);
    res.send();
})

// 새 블록을 추가할때
app.post('/blocks', (req, res) => {
    const { body: { data } } = req;
    const newBlock = createNewBlock();
    res.send(newBlock);
})

const server = app.listen(PORT, () => { console.log(`this server port is open! at ${PORT}`) });

startP2PServer(server);