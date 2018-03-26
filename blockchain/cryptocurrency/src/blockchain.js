const CryptoJS = require('crypto-js');

class Block {
    constructor(index, hash, previoushash, timestamp, data) {
        this.index = index;
        this.hash = hash;
        this.previoushash = previoushash;
        this.timestamp = timestamp;
        this.data = data;
    }
}

const genesisBlock = new Block(
    0,
    '70815c2538e5ac5b38e84523bb0d9f3643807f2bcb5f445a10d0b07f60a606a1',
    null,
    new Date().getTime() / 1000,
    'This is the genesis!!'
)

let blockchain = [genesisBlock]

const getLastBlock = () => blockchain[blockchain.length - 1];

const getTimestamp = () => new Date().getTime() / 1000;

const getBlockchain = () => blockchain;

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
    addBlockToChain(newBlock);
    return newBlock;
}

const getBlockHash = (block) => createHash(block.index, block.previoushash, block.timestamp, block.data)

const isNewBlockValid = (candidateBlcok, latestBlock) => {
    // 블록 체인의 인덱스 검증
    if (latestBlock.index + 1 !== candidateBlcok.index) {
        console.log('The candidate block doesnt have a valid index')
        return false;
    }
    // 이전 블록의 해쉬가 동일한지 검증 
    else if (latestBlock.hash !== candidateBlcok.previoushash) {
        console.log('thie previousHash of this candidate block is not the hash of this latest block')
        return false;
    }
    // 현재 블록의 해쉬가 적절한 값인지 검증
    else if (getBlockHash(candidateBlcok) !== candidateBlcok.hash) {
        console.log('The hash of this block is invalid');
        return false
    }
    return true;
}

const isNewStructureValid = (block) => {
    return (
        typeof block.index === 'number'
        && typeof block.hash === 'string'
        && typeof block.previoustHash === 'string'
        && typeof block.timestamp === 'number'
        && typeof block.data === 'string'
    )
}

// 블록의 체인을 교체
const replaceChain = candidateChain => {
    // 블록 체인 검증 후, 체인의 길이 비교(길어야 함)
    if (isChainValid(candidateChain) &&
        candidateChain.length > getBlockchain().length) {
        blockchain = candidateChain;
        return true;
    } else {
        return false;
    }
}

// 블록 추가
const addBlockToChain = candidateBlock => {
    if (isNewBlockValid(candidateBlock, getLastBlock())) {
        getBlockchain().push(candidateBlock);
        return true;
    } else {
        return false;
    }
}

module.exports = {
    getLastBlock,
    getBlockchain,
    createNewBlock,
}