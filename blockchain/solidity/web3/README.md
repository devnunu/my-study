# web3

web3는 geth와 통신할 수 있는 자바스크립트 API를 제공해준다. 
내부적으로는 JSON-RPC를 사용하므로 JSON-RPC를 이용하는 어떤 종류의 이더리움 노드와도 통신이 가능하다.

## 노드에 연결
web3.js는 HTTP 또는 IPC를 사용해 노드와 통신이 가능하다.
또한 다수의 노드와 연결도 지원하며, web3의 인스턴스는 노드와의 연결을 나타낸다.
다음은 노드에 연결하기 위한 기본코드이다.

```javascript
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
```

해당 코드에서는 8545포트가 기본적으로 연결되었다고 가정한다.

Web3.providers : 객체는 다양한 프로토콜을 사용해 메세지를 전송하기 위해 생성자를 제공함
Web3.providers.HttpProvider : Http 연결을 제공
Web3.providers.IpcProvider : IPC 연결을 제공
web3.currentProvider : 현재 제공자 인스턴스에 자동으로 할당된다.

* 참고로 geth는 기본적으로 HTTP-RPC가 비활성화 되어있으므로 --rpc 옵션을 통해 8545 포트를 활성화 시키자.

## api 구조

이더리움 블록체인 상호 작용을 위한 eth 객체(web3.eth)와 위스퍼 상호 작용을 위한 shh객체(web3.shh)를 포함한다.
대부분의 api는 이 객체들 내부에 있다.

기본적으로 모든 api는 동기식이지만, 비동기식 요청을 만들고 싶다면 마지막 인자로 콜백을 전달하자.
일부 api는 비동기식 요청을 위한 별칭을 가지고 있다.

아래 예제를 보자

```javascript
// 동기식
try {
  console.log(web3.eth.getBlock(48));
}catch(e){
  console.log(e);
}

// 비동기식
web3.eth.getBlock(48, function(error, result){
  if(!error)
    console.log(result);
  else
    console.log(error);
})
```

## BigNumber.js

일반적으로 자바스크립트는 큰수를 처리하는데 적합하지 않으므로 BigNumber.js 라이브러리를 사용한다.
BigNumber.js는 자동으로 추가되며 숫자 값에 대해 BigNumber 객체를 리턴한다.
입력으로는 자바스크립트 숫자, 숫자 문자열, BigNumber인스턴스를 받는다.
아래는 이에 대한 예시이다

```javascript
web3.eth.getBalance("0x23i848fe12k12j3321231k231231kib30fff29c");
```

위에 코드로 특정 주소의 잔액을 얻었는데, 이 메소드는 BigNumber 객체를 반환한다.
BigNumber 객체를 숫자형 문자열로 변환하기 위해서는 toString()을 호출해야한다.
BigNumber는 소수점 20자리 이상의 숫자를 올바르게 처리하지 못하므로 wei 단위로 저장하고 변환할때는
다른 단위로 변환하는 것이 권장된다.

## 단위 변환

web3.fromWei() 메소는 wei 숫자는 다른 단위로 변환하기 위해 사용되며, web3.toWei()는 다른 단위를 wei로 변환하기 위해 사용된다.

```javascript
// wei => ether
web3.fromWei("100000000000000000000", "ether");
// ether => wei
web3.toWei("0.00000000000000000001", "ether");
```

## 가스 가격, 잔액, 트랜잭션 상세 정보 검색

가스 가격 잔액 트랜잭션에 대한 api는 아래와 같다

- **web3.eth.gasPrice()**: 최신 블록 x개의 가스 가격 중앙 값으로 가스 가격을 결정한다.
- **web3.eth.getBalance()**: 주어진 주소의 잔액을 리턴, 모든 해시는 web3.js API에게 16진수 리터럴이 아닌 16진수 문자열 형태로 제공되어야한다.
- **web.eth.getTransactionReceipt()**: 해시를 이용해 트랜잭션 상세 정보를 얻을 떄 사용된다. 블록체인 내에서 트랜잭션을 찾을수 있으면 trasaction receipt 객체를, 아닌경우 null을 리턴한다.

```javascript
// 동기화 방식을 사용한다. 비동기식을 위해서는 getGasPrice를 사용하자
console.log(web3.eth.gasPrice.toString());

console.log(web3.eth.getBalance("0x309d83d9d39ddb92d32cf3920090dd92d839201c2", 45).toString());

console.log(web3.eth.getTransactionReceipt("0x9df92039293aa229d9920a2f2f31ec394f11d2d5f1dd2d55f3c29d302939d4d"))
```

### trasaction receipt

trasaction receipt는 다음과 같은 속성을 가진다.

- 블록해시 : 해당 트랜잭션이 있는 블록의 해시
- 블록 번호 :  해당 트랜잭션이 있는 블록의 번호
- 트랜잭션해시 : 트랜잭션의 해시
- 트랜잭션인덱스 : 블록 내 트랜잭션의 정수형 인덱스 위치
- from : 송신자의 주소
- to : 수신자의 주소, 컨트랙트 생성 트랜잭션의 경우 null
- 누적 가스 사용량 : 이 트랜잭션이 블록 내 에서 실행될때 사용한 가스의 총량
- 가스 사용량 : 특정 트랜잭션이 사용한 가스의 양
- 컨트랜트 주소 : 컨트랙트 생성 트랜잭션의 경우 컨트랙트의 주소, 아닌 경우 null
- logs: 트랜잭션이 생성한 로그 객체의 배열

## 이더 송금

이더를 보내기 위해서는 **web3.ethsendTransaction()** 메소드를 사용한다.
이 메소드는 다음과 같은 속성을 가진 트랜잭션 객체를 사용한다.

- from : 보내는 계정의 주소, 지정되지 않은 경우 web3.eth.defaultAccount 속성을 사용한다.
- to : 선택사항. 메시지의 목적지 주소, 컨트랙트 생성 트랜잭션의 경우 정의되지 않은채로 둔다
- value: 선택사항. 트랜잭션을 위해 전송되는 wei 단위의 값이며 컨트랜트 트랜잭션의 경우 기부 금액이다.
- gas : 선택사항. 트랜잭션을 위해 사용할 가스의 양, 제공되지 않으면 자동 결정이다
- gasPrice: 선택사항. 트랜잭션에 대한 wei 단위의 가스 가격이며 네트워크 평균 가격이 기본값.
- data: 선택사항. 메시지와 연결된 데이터를 포함하고 있는 바이트 문자열, 또는 컨트랙트 생성 트랜잭션일 경우 초기화 코드를 포함.
- nonce: 선택사항. 정수형이며 모든 트랜잭션은 연관된 논스를 가지고 있다. 논스는 트랜잭션 송신자가 보낸 트랜잭션 수의 카운터다.

아래는 api를 사용하는 예제이다.
이 예제에서는 계좌 0번에서 1번으로 1 이더를 전송한다.

```javascript
var txnHash = web3.eth.sendTransaction({
  from: web3.eth.accounts[0],
  to: web3.eth.accounts[1],
  value: web3.toWei("1", ether)
});
```

## 컨트랙트 작업

새로운 컨트랜트 배포, 이미 배포된 컨트랙트에 대한 참조 획득, 컨트랙트에 이더 송금, 메소드 호출을 위한 트랜잭션 전송,
호출에 대한 가스 예측을 배워볼것 이다.

우선 **web3.eth.contract()**로 컨트랙트 객체를 생성한다.

```javascript
var proofContract = web3.eth.contract({"constant":false, "inputs":[{
  //...
}]
  // ...
})
```

컨트랙트 객체 생성후 new 메소드를 이용해 배포하거나 at 메소드를 사용해 ABI와 매칭하는 배포된 컨트랙트의 참조값을 얻을수 있다.

### 컨트랙트 배포

우선 컨트랙트 배포에 대해 알아보자
아래는 예제 코드이다.

```javascript
var proof = proofContract.new({
  from: web3.eth.accounts[0],
  data: "0x123123123123....",
  gas: "4700000"
  },
  function (e, contract){
    if(e)
      console.log("Error " + e);
    else if(contract.address != undefined)
      console.log("Contract Address",contract.address);
    else
      console.log("Txn Hash:" contract. transactionHash)
  } 
)
```

여기서 new 메소드는 비동기로 호출 되었으므로 트랜잭션이 성공적으로 생성되고 브로트캐스팅되면 콜백이 두번 발생한다.
첫번째는 브로드캐스팅 이후, 두번째는 트랜잭션이 채굴된 이후 호출된다.
콜백을 제공하지 않으면 address 값이 undefined이다.
컨트랙트가 채굴된 후 address 속성이 설정된다.
전달된 객체에 from, data, gas를 포함하고 있는데 이 3가지는 트랜잭션 생성을 위한 필수 요소이다.

### 배포된 컨트랙트

at 메소드를 사용해 이미 배포된 컨트랙트의 참조값을 얻을수 있다

```javascript
var proof=proofContract.at("0xd09e828ca2822322cd820d1d3be28a93029c14a1");
```

다음으로 메소드를 호출하기 위해 트랜잭션을 전송하는 방법이다.
아래 예제에서는 sendTransaction 메소드를 호출한다. sendTransaction 메소드에 전달된 객체는
web3.eth.sendTransaction()과 같은 속성을 가진다.

```javascript
proof.set.sendTransaction("Owner Name",
"e3b0c23123fc1cc123afbf2c0493fb93029ae21ed203b031ca120492b9203b920",{
  from: web3.eth.accounts[0],
  }, function(error, transactionHash){
    if(!err)
      console.log(transactionHash);
  })
```

트랜잭션을 생성하고 브로드캐스팅 하는 대신 노드 자체에 있는 메소드를 호출하고 싶은 경우는 sendTranscation 대신 call을 사용할 수 있다.

```javascript
var returnValue = proof.get.call("e3b0c23123fc1cc123afbf2c0493fb93029ae21ed203b031ca120492b9203b920");
```

때로는 호출 여부를 결정하기 위해 메소드를 호출하는데 필요한 가스 양을 알아낼 필요가 있다.
이와 같은 목적을 위해서 web3.eth.estimateGas를 사용할 수 있다.
하지만 web3.eth.estimateGas()를 직접 사용하기 위해서 트랜잭션의 데이터를 생성해야하므로,
동일한 이름을 가진 객체의 estimateGas() 메소드를 사용할 수 있다.

```javascript
var estimatedGas = proof.get.estimateGas("e3b0c23123fc1cc123afbf2c0493fb93029ae21ed203b031ca120492b9203b920")
```

### 컨트랙트 이벤트 검색 및 리스닝

아래 예제를 보고 설명하도록 한다.

```javascript
var event = proof.logFileAddedStatus(null, {
  fromBlock:0,
  toBlock: "latest"
})

event.get(function(error, result){
  if(!error) console.log(result);
  else console.log(error);
})

event.watch(function(error, result){
  if(!error) console.log(reuslt.args.status);
  else console.log(error);
})

setTimeout(function(){
  event.stopWatching();
}, 60000)

var events = proof.allEvents({
  fromBlock:0,
  toBlock: "latest"
})

events.get(function(error, result){
  if(!error) console.log(result);
  else console.log(error);
})

events.watch(function(error, result){
  if(!error) console.log(result.args.status);
  else console.log(error);
})

setTimeout(function(){
  events.stopWatching();
}, 60000)

```

동작 순서는 다음과 같다
1. 컨트랙트 인스턴스에서 이벤트와 이름이 같은 메소드를 호출하여 이벤트 객체획득, 이 메소드는 이벤트를 필터링 하는데 2가지 객체를 인자로 받는다
  - 이벤트 필터링을 위한 인덱스화 된 리턴값(ex) {'valueA':1, 'valueB':[myFirstAddress, mySecondAddress]} )이다
  - 다음 객체는 세가지 속성 fromBlock(가장 빠른 블록), toBlock(최신블록), address(로그를 가져올 주소 목록)를 포함 할 수 있다.

2. 이벤트 객체는 get, watch, stopWatching과 같은 세가지 메소드를 제공한다.
  - get : 블록 범위 내에 있는 모든 이벤트를 얻기 위해 사용
  - watch : get과 비슷하지만 이벤트 수신 후 변경 사항 감지
  - stopWatching : 변경사항에 대한 감시를 멈춤.

3. allEvents 메소드는 모든 이벤트를 검색하기 위해 사용됨.

4. 모든 이벤트는 다음과 같은 속성을 포함하고 있는 객체로 표현된다.
  - args: 이벤트 인자의 객체
  - event: 이벤트 이름을 표현하는 문자열
  - logIndex: 블록 내 로그 인덱스 위치를 표현하는 정수형
  - transactionIndex : 인덱스 위치 로그가 생성된 트랜재션을 표현하는 정수형
  - transactionHash : 이 로그가 생성된 트랜잭션의 해시를 표현하는 문자열
  - address: 이 로그가 속해 있는 주소를 표현하는 문자열
  - blockHash: 이 로그가 속해 있는 블록의 해시를 표현하는 문자열
  - blockNumber: 이 로그가 속해있는 블록 번호