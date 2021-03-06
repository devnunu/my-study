# Crypto Currency

## Requirement
- javascript, yarn, nodejs
- 함수형 프로그래밍으로 진행

## project
- 코인
- 익스플로러
- 지갑

# 블록 체인 코드

## project setup
- src 내부에서 모든 작업은 진행함
- 패키지 관리자는 yarn 사용

## 해쉬란?
- 인풋을 받아서 복잡한 수학적 함수를 거쳐 랜덤 아웃풋을 뱉어냄
- 인풋이 바뀌면 당연히 아웃풋도 바뀐다
- 인풋의 어느 한부분이라도 바뀌면 아웃풋 '전체'가 바뀐다

## 블록
- 클래스로 생성
- 인덱스, 해쉬, 이전블록의 해쉬, 타임스탬프, 데이터를 인수로 받음

```
class Block {
    constructor(index, hash, previoushash, timestamp, data) {
        this.index = index;
        this.hash = hash;
        this.previousehash = previousehash;
        this.timestamp = timestamp;
        this.data = data;
    }
}
```

## 제네시스 블록
- 최초의 블록
- 블록체인 코드안에 하드 코딩 되어야함
- blockchain 코드의 첫번째 인덱스에 할당 됨

```
const genesisBlock = new Block(
    0,
    '70815c2538e5ac5b38e84523bb0d9f3643807f2bcb5f445a10d0b07f60a606a1',
    null,
    new Date().getTime() / 1000,
    'This is the genesis!!'
)

let blockchain = [genesisBlock]

console.log(blockchain)

/* Result
[ Block {
    index: 0,
    hash: '70815c2538e5ac5b38e84523bb0d9f3643807f2bcb5f445a10d0b07f60a606a1',
    previoushash: null,
    timestamp: 1520658650.326,
    data: 'This is the genesis!!' } ]
*/
```

## 새로운 블록을 만드는 함수
- 해쉬 생성에 crypto js를 사용함
- 함수형으로 모든 인자에 대한 값을 리턴받음

```
const getLastBlock = () => blockchain[blockchain.length - 1];

const getTimestamp = () => new Date().getTime() / 1000;

// 모든 인자값을 포함하여 hash 값을 생성
const createHash = (index, previoustHash, timestamp, data) => {
    return CryptoJS.SHA256(
        index + previoustHash + timestamp, JSON.stringify(data)
    ).toString();
}

const createNewBlock = data => {
    const previousBlock = getLastBlock();
    const newBlockIndex = previousBlock.index + 1;
    const newTimestamp = getTimestamp();
    const newHash = createHash(
        newBlockIndex, 
        previousBlock.hash, 
        newTimestamp,
        data
    );
    const newBlock = new Block(
        newBlockIndex, 
        newHash, 
        previousBlock.hash,
        newTimestamp,
        data
    );
    return newBlock;
}
```

## 블록 검증
- 블록은 한사람이 아니라 여러사람이 추가할수 있으므로 검증을 통해 올바른 블록인지 확인하는 과정이 필요함
- 여러가지 조건을 추가하여 해당 조건을 통과하지 못한경우 false를 리턴함
```
const getBlockHash = (block) => createHash(block.index, block.previoushash,block.timestamp,block.data)

const isNewBlockValid = (candidateBlcok, latestBlock) => {
    // 블록 체인의 인덱스 검증
    if(latestBlock.index + 1 !== candidateBlcok.index){
        console.log('The candidate block doesnt have a valid index')
        return false;
    }
    // 이전 블록의 해쉬가 동일한지 검증 
    else if(latestBlock.hash !== candidateBlcok.previoushash){
        console.log('thie previousHash of this candidate block is not the hash of this latest block')
        return false;
    }
    // 현재 블록의 해쉬가 적절한 값인지 검증
    else if(getBlockHash(candidateBlcok)!==candidateBlcok.hash){
        console.log('The hash of this block is invalid');
        return false
    }
    return true;
}
```

## 블록 구조 검증
- 해쉬와 데이터를 검증하는 것 이외로 구조를 검증해야함

```
const isNewStructureValid = (block) => {
    return (
        typeof block.index ==='number' 
        && typeof block.hash ==='string' 
        && typeof block.previoustHash === 'string'
        && typeof block.timestamp === 'number' 
        && typeof block.data === 'string'
    )
}
```


## 블록 체인 교체
- 블록체인이 유효하다면 이를 교체하기 위한 함수가 필요하다


```
const replaceChain = candidateChain => {
    // 블록 체인 검증 후, 체인의 길이 비교(길어야 함)
    if (isChainValid(candidateChain) && candidateChain.length > blockchain.length) {
        blockchain = candidateChain;
        return true;
    } else {
        return false;
    }
}
```

## 블록 추가

```
// 블록 추가
const addBlockToChain = candidateBlock => {
    if (isNewBlockValid(candidateBlock, getLastBlock())) {
        blockchain.push(candidateBlock);
        return true;
    } else {
        return false;
    }
}
```

# 서버 코드

## server 구현
- server.js 파일 생성
- yarn add express morgan body-parser
- yarn global add nodemon
- morgan은 로그인 용 미들웨어

- 아래와 같이 서버 세팅을 구현한다.
```
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
```

## 라우트 생성

```
// 블록 보기를 요청 했을 때
app.get('/blocks', (req, res) => {
    res.send(getBlockchain());
})

// 새 블록을 추가할때
app.post('/blocks', (req, res) => {
    const { body: { data } } = req;
    const newBlock = createNewBlcok();
    res.send(newBlock);
})
```

## get, post 요청 익스텐션
- vs code에서 rest client를 설치한다.
- request.http 라는 http 파일을 생성하고, 아래와 같은 코드를 입력한다
- 위에 자동으로 뜨는 send request 텍스트를 클릭하면된다.

```

GET http://localhost:3000/blocks

###

POST http://localhost:3000/blocks
Content-Type: application/json

{
    "data": "Second block baby!!"
}

```

## 분산화
- 서버를 재시작 하면 모든 블록이 사라진다.
- 따라서 다른 서버를 시작하고, 다른 서버에서 받아올수있도록 분산화가 가능해야한다.
- 이를 위해서 서버끼리 연결이 가능할수 있도록 프로토콜이 필요하다.
- p2p.js 파일을 만들고 websockets를 설치한다
- websockets은 리얼타임이며 http 대신에 ws를 가지고 있다.
- websockets는 커넥션이 계속 유지된다(상태 저장형)
- yarn add ws
- http와 ws는 같은 포트에서 동작가능(다른 프로토콜 이므로)


```
const WebSockets = require('ws');

const socket = [];

const startP2PServer = server => {
    const wsServer = new WebSockets.Server({ server });
    wsServer.on('connection', ws => {
        console.log(`Hello ${ws}`);
    });
    console.log('nomadcoin p2p server running!');
};

module.exports = {
    startP2PServer
}
```


- 기존의 서버에도 ws로 접속할 수 있도록 수정해준다

```
const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    Blockchain = require('./blockchain'),
    P2P = require('./p2p');

const { getBlockchain, createNewBlock } = Blockchain;
const { startP2PServer } = P2P;

const PORT = process.env.HTTP_PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(morgan('combine'));

//...

const server = app.listen(PORT, () => { console.log(`this server port is open! at ${PORT}`) });

startP2PServer(server);
```

## 소켓 연결
- p2p.js에 다음과 같이 소켓을 연결하는 로직을 구현한다.

```

const getSockets = () => sockets;

const initSocketConnection = socket => {
    sockets.push(socket);
}

const connectToPeers = newPeer => {
    const ws = new WebSockets(newPeer);
    ws.on('open', () => {
        initSocketConnection(ws);
    })
};

```

- server.js에는 아래와 같은 api 를 추가한다.
```
// 다른 피어를 연결할 떄
app.post('/peers', (req, res) => {
    const { body: { peer } } = req;
    connectToPeers(peer);
    res.send();
})
```


- REST api로 다음과 같이 확인할 수 있다
```
POST http://localhost:3000/peers
Content-Type: application/json

{
    "peer": "ws://localhost:4000"
}
```

## peer 사이의 메세지 전달

- peer 사이의 메세지 전달을 위해서 p2p 서버의 시작시 연결되도록 코드를 변경해준다

```
const startP2PServer = server => {
    const wsServer = new WebSockets.Server({ server });
    // 이 부분이 콘솔이었는데, 초기화로 변경
    wsServer.on('connection', ws => {
        initSocketConnection(ws)
    });
    console.log('nomadcoin p2p server running!');
};
```

- 또한 메세지를 받으면 확인을 위해 다음과 같은 setTimeout 코드를 추가한다

```
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
```

## 에러 핸들러
- 다음과 같은 에러 핸들러를 추가해 준다.
- 이는 웹소켓이 닫힐때, 또는 에러가 발생했을떄를 처리해준다.
- handleSocketError를 initSoketConnection 안에 넣어서 실행시킨다.

```
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
```

## 블록체인 업데이트
- 두 peer의 블록체인을 비교하여 업데이트가 낮은 블록을 갱신하기 위해 다음과 같은 스텝을 따른다
    1. 첫번쨰로 가장 최근의 블록을 요청하고, 
    2. 두번째로 모든 블록을 요청할수 있다.
    3. 세번째로 블록을 가져와야한다.

- 요청을 하면 응답이있는데, 이러한 응답을 관리하기위해 message creator라는 것을 만든다.
- 리덕스와 비슷한 개념으로 동작한다.

- 기본적인 구조는 다음과 같다.
```
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
```

- 이렇게 만들어진 creator 들은 데이터를 들고 있는데, 데이터를 파싱하기 위해서 아래와 같은 함수를 사용한다.

```
const parseData = data => {
    try {
        return JSON.parse(data)
    } catch(e) {
        console.log(e)
        return null;
    }
}
```

- 또한 메세지를 보낼수 있는 sendMessage 함수도 구현한다.
```
const sendMessage = (ws, message) => ws.send(JSON.stringify(message));
```

- 다음은 소켓에 메세지가 도착했을 때 type에 따라 분기시켜 처리하는 핸들러이다.

```

// Handlers
const handleSocketMessages = ws => {
    ws.on('message', data => {
        const message = parseData(data);
        if (message === null) {
            return;
        }
        console.log(message);
        switch (message.type) {
            case GET_LATEST:
                sendMessage(ws, getLastBlock());
                break;

        }
    })
}
```

- 만들어진 Message Creator를 사용하기위해 핸들러를 시작과 동시에 등록한다.

```
// 초기 소켓 연결 설정
const initSocketConnection = ws => {
    sockets.push(ws);
    handleSocketMessages(ws);
    handleSocketError(ws);
    sendMessage(ws, getLastBlock());
}
```

## 전달 받은 블록에 대한 처리
- 메세지 핸들러에 다음과 같은 조건을 추가해준다

```
    case BLOCKGHAIN_RESPONSE:
        const receivedBlocks = message.data;
        if (receivedBlocks === null) {
            break;
        }
        handleBlockchainResponse(receivedBlocks);
        break;
```

- 전달 받은 chain을 검증하는 함수를 작성한다
- 우선 길이가 0이면 리턴한다.
- 또한 블록의 구조를 판별하여 적절하지 않으면 리턴한다.
- 길이에 따라 블록체인에 더할것인지 전체 체인을 교체할 것인지 결정한다.
```
const handleBlockchainResponse = receivedBlocks => {
  if (receivedBlocks.length === 0) {
    console.log("Received blocks have a length of 0");
    return;
  }
  const latestBlockReceived = receivedBlocks[receivedBlocks.length - 1];
  if (!isBlockStructureValid(latestBlockReceived)) {
    console.log("The block structure of the block received is not valid");
    return;
  }
  const newestBlock = getNewestBlock();
  if (latestBlockReceived.index > newestBlock.index) {
    if (newestBlock.hash === latestBlockReceived.previousHash) {
      addBlockToChain(latestBlockReceived);
    } else if (receivedBlocks.length === 1) {
      sendMessageToAll(getAll());
    } else {
      replaceChain(receivedBlocks);
    }
  }
};

```

## 블록 업데이트 브로드 캐스트
