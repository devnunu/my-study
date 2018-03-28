const WebSockets = require('ws'),
    Blockchain = require('./blockchain');

const {
    getNewestBlock,
    isBlockStructureValid,
    addBlockToChain,
    replaceChain
} = Blockchain;

const sockets = [];

// Message Types
const GET_LATEST = 'GET_LATEST';
const GET_ALL = 'GET_ALL';
const BLOCKGHAIN_RESPONSE = 'BLOCKGHAIN_RESPONSE';

// Message Creators
const getLatest = () => {
    return {
        type: GET_LATEST,
        data: null
    }
}

const getAll = () => {
    return {
        type: GET_ALL,
        data: null,
    }
}

const blockchainResponse = data => {
    return {
        type: BLOCKGHAIN_RESPONSE,
        data: data,
    }
}

const getSockets = () => sockets;

const startP2PServer = server => {
    const wsServer = new WebSockets.Server({
        server
    });
    wsServer.on('connection', ws => {
        initSocketConnection(ws)
    });
    console.log('nomadcoin p2p server running!');
};

// 초기 소켓 연결 설정
const initSocketConnection = ws => {
    sockets.push(ws);
    handleSocketMessages(ws);
    handleSocketError(ws);
    sendMessage(ws, getLastBlock());
}

const parseData = data => {
    try {
        return JSON.parse(data);
    } catch (e) { //  JSON parse 할 수 없는 데이터의 경우
        console.log(e)
        return null;
    }
}

// Handlers

// 메세지 핸들러
const handleSocketMessages = ws => {
    ws.on('message', data => {
        const message = parseData(data);
        if (message === null) {
            return;
        }
        console.log(message);
        switch (message.type) {
            case GET_LATEST:
                sendMessage(ws, responseLatest());
                break;
            case BLOCKGHAIN_RESPONSE:
                const receivedBlocks = message.data;
                if (receivedBlocks === null) {
                    break;
                }
                handleBlockchainResponse(receivedBlocks);
                break;

        }
    })
}

const handleBlockchainResponse = receiveBlocks => {
    if (receivedBlocks.length === 0) {
        console.log('Reveived block have a length of 0');
        return;
    }
    const latestBlockReceived = receiveBlocks[receiveBlocks.length - 1];
    if (!isBlockStructureValid(latestBlockReceived)) {
        console.log('The block structure of the block received is not valid');
        return;
    }
    const newestBlock = getNewsetBlock();
    if (latestBlockReceived.index > newestBlock.index) {
        if (newestBlock.hash === latestBlockReceived.previousHash) {
            addBlockToChain(latestBlockReceived);
        } else if (receivedBlocks.length === 1) {
            //TODO: get all the block. we are way behind
        } else {
            replaceChain(receivedBlocks);
        }
    }
}

const sendMessage = (ws, message) => ws.send(JSON.stringify(message));

const responseLatest = () => blockchainResponse(getLastBlock())

// 에러 핸들러
const handleSocketError = ws => {
    const closeSocketConnection = ws => {
        ws.close();
        // 죽은 소켓이 있으면 에러가 발생 할 수 있으므로 제거
        sockets.splice(sockets.indexOf(ws), 1);
    }
    ws.on('close', () => closeSocketConnection(ws));
    ws.on('error', () => closeSocketConnection(ws));
}

const connectToPeers = newPeer => {
    const ws = new WebSockets(newPeer);
    // 새로운 소켓이 불릴때마다 호출
    ws.on('open', () => {
        initSocketConnection(ws);
    })
};

module.exports = {
    startP2PServer,
    connectToPeers
}