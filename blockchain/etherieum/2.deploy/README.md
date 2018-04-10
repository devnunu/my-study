# geth

geth란 이더리움 풀 노드를 사용하기 위한 go로 작성된 커맨드라인 인터페이스를 말한다.

## 설치 방법

```
brew tap ethereum/ethereum
brew install ethereum
```

## 컨트랙트 소스코드

예시로, 다음과 같은 소스코드를 작성해보도록하자. 이는 솔리디티 문법에 기초한 컨트랙트이다.

```
contract Proof {
    struct FileDetails {
        uint timestamp;
        string owner;
    }

    mapping(string => FileDetails) files;

    event LogFileAddedStatus(bool status, uint timestamp, string owner, string fileHash);

    // 블록 타임 스탬프에 파일의 소유자를 저장하기 위해 사용된다
    function set(string owner, string fileHash) {
        // 키가 이미 존재하는지 확인하기 위한 적절한 방법이 없다. 따라서 기본값을 확인한다.
        if (files[fileHash].timestamp == 0) {
            files[fileHash] = FileDetails(block.timestamp, owner);

            // 이벤트를 트리거해 프론트엔드 앱이 파일의 존재와 소유권에 대한 상세 정보가 저장됐다고 알수 있게 한다.
            LogFileAddedStatus(true, block.timestamp, owner, fileHash);
        } else {
            // 그 다음에는 프론트엔드에게 파일의 상세 정보가 이미 저장됐기 때문에 파일 존재 및 소유권에 대한 상세 정보를 저장할 수 없다고 알려준다.
            LogFileAddedStatus(false, block.timestamp, owner, fileHash);
        }  
    }
    
    // 파일 정보를 얻기 위해 사용된다
    function get(string fileHash) returns (uint timestamp, string owener) {
        return (files[fileHash].timestamp, files[fileHash].owner);
    }
}
```

## 컨트랙트 컴파일과 배포

### 컨트랙트 컴파일

컨트랙트 소스코드가 다 작성되었으면 컴파일을 진행해야한다. Remix와 같은 브라우저 IDE에서 위에서 작성한 코드를 넣고 컴파일을 눌러준다. Detail을 누르면 아래와 같이 geth 대화형 콘솔을 사용해 배포할 수 있는 web3.js 코드를 제공할 것이다.

![image](https://user-images.githubusercontent.com/20614643/38452177-c57b90d6-3a79-11e8-9766-26624d73feba.png)

``` javascript
var proofContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"fileHash","type":"string"}],"name":"get","outputs":[{"name":"timestamp","type":"uint256"},{"name":"owener","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"string"},{"name":"fileHash","type":"string"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"status","type":"bool"},{"indexed":false,"name":"timestamp","type":"uint256"},{"indexed":false,"name":"owner","type":"string"},{"indexed":false,"name":"fileHash","type":"string"}],"name":"LogFileAddedStatus","type":"event"}]);
var proof = proofContract.new(
   {
     from: web3.eth.accounts[0], 
     data: '0x6060604052341561000f57600080fd5b6107a58061001e6000396000f30060606040526004361061004c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063693ec85e14610051578063e942b5161461012e575b600080fd5b341561005c57600080fd5b6100ac600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506101ce565b6040518083815260200180602001828103825283818151815260200191508051906020019080838360005b838110156100f25780820151818401526020810190506100d7565b50505050905090810190601f16801561011f5780820380516001836020036101000a031916815260200191505b50935050505060405180910390f35b341561013957600080fd5b6101cc600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190505061035a565b005b60006101d86106c0565b6000836040518082805190602001908083835b60208310151561021057805182526020820191506020810190506020830392506101eb565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020600001546000846040518082805190602001908083835b60208310151561027f578051825260208201915060208101905060208303925061025a565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020600101808054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561034a5780601f1061031f5761010080835404028352916020019161034a565b820191906000526020600020905b81548152906001019060200180831161032d57829003601f168201915b5050505050905091509150915091565b600080826040518082805190602001908083835b602083101515610393578051825260208201915060208101905060208303925061036e565b6001836020036101000a038019825116818451168082178552505050505050905001915050908152602001604051809103902060000154141561059d576040805190810160405280428152602001838152506000826040518082805190602001908083835b60208310151561041d57805182526020820191506020810190506020830392506103f8565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390206000820151816000015560208201518160010190805190602001906104769291906106d4565b509050507f79d23b7c01bc28e300283e648f4a479f1d5e2e05d3bead348b053cf3fe1ded66600142848460405180851515151581526020018481526020018060200180602001838103835285818151815260200191508051906020019080838360005b838110156104f45780820151818401526020810190506104d9565b50505050905090810190601f1680156105215780820380516001836020036101000a031916815260200191505b50838103825284818151815260200191508051906020019080838360005b8381101561055a57808201518184015260208101905061053f565b50505050905090810190601f1680156105875780820380516001836020036101000a031916815260200191505b50965050505050505060405180910390a16106bc565b7f79d23b7c01bc28e300283e648f4a479f1d5e2e05d3bead348b053cf3fe1ded66600042848460405180851515151581526020018481526020018060200180602001838103835285818151815260200191508051906020019080838360005b838110156106175780820151818401526020810190506105fc565b50505050905090810190601f1680156106445780820380516001836020036101000a031916815260200191505b50838103825284818151815260200191508051906020019080838360005b8381101561067d578082015181840152602081019050610662565b50505050905090810190601f1680156106aa5780820380516001836020036101000a031916815260200191505b50965050505050505060405180910390a15b5050565b602060405190810160405280600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061071557805160ff1916838001178555610743565b82800160010185558215610743579182015b82811115610742578251825591602001919060010190610727565b5b5090506107509190610754565b5090565b61077691905b8082111561077257600081600090555060010161075a565b5090565b905600a165627a7a7230582098c61b2a3a86a5175e4ac31532c1e687b3ad4c4de2304133d4a9ba55e23aeaed0029', 
     gas: '4700000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })
```


### 컨트랙트 배포

이제 geth를 채굴이 활성화된 개발자 모드로 실행해보자. 이를 위해서 다음 명령어로 실행한다.

```
geth --dev --mine
```

다음으로 geth의 대화형 자바스크립트 콘솔을 열어야한다. 개발자 모드를 열어 놓고, 다른 터미널을 열어 아래의 명령어를 입력한다.

```
geth attach
```

이때, 단순히 위의 명령어로는 경로가 지정되지 않아 동작 하지 않을 수가 있다.
따라서 geth --dev mine을 실행시킨 터미널 창으로 돌아가, ipc의 경로가 지정된 커맨드 라인을 찾도록 하자. 해당 url을 찾아 복사한 후에 geth attach 명령어 뒤에 붙여준다.

```
geth attach ipc:/var/folders/05/0x6l_pyd333dfgv4d06swwnm0000gn/T/geth.ipc
```

![image](https://user-images.githubusercontent.com/20614643/38452224-c3c3a7c8-3a7a-11e8-8b04-33b1f9c2b6b4.png)

대화형 콘솔에 진입이 완료 되었으면, 컴파일 실행한 코드를 넣어준다.
정상적으로 배포가 되었다면 다음과 같은 명령행이 나올것이다. 여기에는 컨트랙트의 hash와 address를 담고 있다.

![image](https://user-images.githubusercontent.com/20614643/38452315-c12a8534-3a7c-11e8-817c-95facfabb715.png)

Contract mined! address: 0x2c747a03a5810b184324d074e0cf0a8a49816990 transactionHash: 0x8f63d12dede817f8cd9a38b221d022a0f01ecd0e9349ddcd32ce7b36f0ed6cb3

### 컨트랙트 브로드캐스트

브로드캐스트를 위해 아래와 같은 자바스크립트 코드를 넣어준다.

```javascript
var contract_obj = proofContract.at("0x2c747a03a5810b184324d074e0cf0a8a49816990");
contract_obj.set.sendTransaction("Owner Name", "0x8f63d12dede817f8cd9a38b221d022a0f01ecd0e9349ddcd32ce7b36f0ed6cb3", { 
    from: web3.eth.accounts[0],
}, function (error, transactionHash) {
    if (!error)
        console.log(transactionHash);
})

contract_obj.get.call("0x8f63d12dede817f8cd9a38b221d022a0f01ecd0e9349ddcd32ce7b36f0ed6cb3");
```

call 메소드는 현재 상태로 컨트랙트의 메소드를 호출하기 위해서 사용된다.

---

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