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

const createNewBlock = data => {
    const previousBlock = getLastBlock();
    const newBockIndex = previousBlock.index + 1;
    const newTimestamp = getTimestamp();
    console.log('previousBlock', previousBlock)
    console.log('newBockIndex', newBockIndex)
    console.log('newTimestamp', newTimestamp)
}

createNewBlock('asdf')