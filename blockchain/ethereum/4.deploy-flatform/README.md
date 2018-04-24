# 스마트 컨트랙트 배포 플랫폼 구축

기존에는 코드내에 컨트랙트 주소를 하드 코딩하고 수동배포했지만, 우리는 web3 및 ethereumjs를 사용하여 컴파일 및 자동 배포하는 방법을 배워볼 것이다.

## 트랜잭션 논스 계산

- geth가 관리하는 계좌는 자체적으로 올바른 논스를 트랜잭션에 추가하고 서명해주므로 논스에 대해 걱정할 필요가 없다.
- geth에서 관리되지 않는 계좌를 사용하는 동안에는 논스를 자체적으로 계산해야한다.
- 이를 위해 getTransactionCount 메소드를 사용할 수 가 있다.
- 첫번째 인자는 트랜잭션 카운트가 필요한 주소, 두번째는 트랜잭션 카운트가 필요할 때까지의 블록.

## solcjs

solcjs는 node.js 라이브러리며 솔리디티 파일을 컴파일 하는데 사용되는 명령행 툴이다.
설치 방법은 다음과같다

```
npm install -g solc
```

solcjs는 솔리디티 코드를 컴파일 하는데 사용되는 compiler 메소드를 제공한다.
인자는 다음과 같다

- 문자열 형태의 솔리디티 소스코드
- 바이트코드를 최적화할지 나타내는 boolean값

여기서 중요한것은 솔리디티 소스코드에 import 구문을 가지고 있느냐에 따라 다음과 같이 2가지 방법으로 사용된다.

**import 구문이 없을떄**

```javascript
var solc = require("solc");
var input = "contract x {function g() {}}";
var output = solc.compile(input, 1); // 1은 최적화를 활성화
for(var contractName in ouput.contracts){ 
  // 코드 및 ABI를 로깅
  console.log(contractName + ": "+ output.contracts[contractName].bytecode);
  console.log(contractName + ": "+ output.contracts[contractName].interface);
}
```

**import 구문이 있을떄**

```javascript
var solc = require("solc");
var input = {
  "lib.sol": "library L { function f() returns (uint) {return 7;}}",
  "cont.sol": "import 'lib.sol'; contract x {function g(){L.f();} }"
};
var output = solc.compile({source: input}, 1); // 1은 최적화를 활성화
for(var contractName in ouput.contracts){
  console.log(contractName + ": "+ output.contracts[contractName].bytecode);
}
```

컴파일 중 파일 콘텐츠를 파일 시스템에서 읽길 원하거나 컴파일 도중 파일 콘텐츠를 확인하려는 경우라면 
컴파일러 메소드는 파일 이름을 받아들여서 파일 콘텐츠를 리턴하는 메소드를 세번째 매개 변수로 지정할 수 있다.

```javascript
var solc = require("solc");
var input = {
  "cont.sol": "import 'lib.sol'; contract x {function g(){L.f();}}"
};
function findImports(path){
  if(path==="lib.sol")
    return {contents: "library L {function f() returns (uint){return 7;}}"}
  else {
    return {error: "File not found"}
  }
}

var output = solc.compile({sources: input}, 1, findImports);
for(var contractName in output.contracts)
  console.log(contractName + ": " + output.contracts[contractName].bytecode);
```

### 다른 버전의 컴파일러 사용

- useVersion
  - 다른 버전의 컴파일러를 사용하는 경우 다른 컴파일러의 참조값을 얻기 위해 useVersion 메소드를 사용한다.
  - useVersion은 컴파일러를 포함하고 있는 자바스크립트 파일 이름을 문자열로 받아들이며, 해당 파일을 /node_modules/solc/bin 디렉터리 내에서 찾는다.
- loadRemoteVersion
  - solc-bin 저장소의 solc-bin/bin 디렉터리에 입력 값과 일치하는 이름의 컴파일러를 다운로드해 사용한다.
- setupMethods
  - useVersion과 비슷하지만 어떤 디렉터리에서라도 컴파일러를 로드할 수 있다.

```javascript
var solc = require("solc");
var solcV047 = solc.useVersion("v0.4.7 commit.822622cf");
var output = solcV011.compile("contract t {function g(){}}",1);
solc.loadRemoteVersion('soljson-v0.4.5.commit.b318366e',function(err, solcV045){
  if(err){
    // 오류가 발생하면 표시하고 빠져나간다
  }
  var output = solcV045.compile("contract t{function g(){}}",1);
})
var solcV048 = solc.setupMethods(require("/my/local/0.4.8.js"));
var output = solcV048.compile("contract t{function g(){}}",1);

solc.loadRemoteVersion('latest', function(err, latestVersion){
  if(err){
    // 오류가 발생하면 표시하고 빠져나간다
  }
  var output = latestVersion.compile("contract t {function g() {}}", 1)
})
```

위 코드를 실행하려면 먼저 solc-bin 저장소로 부터 v0.4.7.commit.822622cf.js 파일을 다운로드해서 node_modules/solc/bind 디렉터리에 넣어둬야한다.
그리고 솔리디티 0.4.8 버전의 컴파일러를 다운로드해 파일 스스템에 넣어두고 해당 디렉터리 경로를 setupMethods 호출에서 지정해야한다.

### 라이브러리 링킹

만약 솔리디티 코드가 라이브러리를 참조한다면 바이트코드는 참조된 라이브러리의 실제 주소를 위한 플레이스 홀더를 포함할 것이다.
이는 컨트랙트 배포전에 링킹이라고 불리는 절차에 의해 업데이트 되어야한다.

solcjs는 이를 위한 linkByteCode 메소드를 제공한다.

```javascript
var solc = require("solc");

var input = {
  "lib.sol": "library L {function f() returns (uint){return 7;}}",
  "cont.sol":"import 'lib.sol'; contract x {function g(){L.f();}}"
}

var output = solc.compile({sources: input}, 1);

var finalByteCode = solc.linkBytecode(output.contracts["x"].bytecode, {'L': '0x123456...'})
```

### abi 업데이트

상위 버전의 경우 하위 버전보다 더 많은 솔리디티 기능을 제공하기 때문에 ABI 내에 추가적인 정보를 포함하고 있으므로
두가지 서로 다른 버전의 컴파일러에서 생성된 ABI는 일치하지 않는다.
따라서 새로운 솔리디티 버전의 ABI에 의존하는 앱이 컨트랙트에 더 많은 정보를 가질수있도록 ABI도 업데이트 되야한다.

```javascript
var abi = require("solc/abi");
var inputABI = [{
  // abi
}];

var outputABI = abi.update("0.3.6", inputABI);
```

## 컨트랙트 배포 플랫폼 구축 명령어

```
geth --dev --rpc --rpccorsdomain "*" --rpcaddr "0.0.0.0" --rpcport "8545" --mine --rpcapi "eth, txpool, web3"
```

// 0x0C8475EA2ae489167397C17D893E53Aa9a38F59F
// 0xd2f5d7d85e0160e3eed3a6a8c52f543423a5850831b1132ae0020f956abcd068

```
pragma solidity ^0.4.8;

contract sample {
    int a;
    
    function sample(int b) 
    {
    	a = b;
    }
}
```

eth.sendTransaction({from: eth.accounts[0], to:"0x0C8475EA2ae489167397C17D893E53Aa9a38F59F", value:web3.toWei(3, "ether")})