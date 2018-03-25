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

