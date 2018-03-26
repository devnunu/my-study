const WebSockets = require('ws');

const sockets = [];

const getSockets = () => sockets;

const startP2PServer = server => {
    const wsServer = new WebSockets.Server({ server });
    wsServer.on('connection', ws => {
        initSocketConnection(ws)
    });
    console.log('nomadcoin p2p server running!');
};

// 초기 소켓 연결 설정
const initSocketConnection = socket => {
    sockets.push(socket);
    // 메세지를 받으면 호출
    socket.on('message', (data) => {
        console.log(data)
    });
    setTimeout(() => {
        socket.send('welcome');
    }, 5000)
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