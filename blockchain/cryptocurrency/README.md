# Crypto Currency

## Requirement
- javascript, yarn, nodejs
- 함수형 프로그래밍으로 진행

## project
- 코인
- 익스플로러
- 지갑

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