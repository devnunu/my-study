# 트러플

dapp의 개발과 배포 프로세스를 간소화 하기 위해 우리는 트러플을 사용할수 있다.
애완 동물의 입양을 추적하는 pet-shop-tutorial을 통해 트러플사용의 프로스세를 알아보도록 하자
순서는 다음과 같다.

1. 개발환경 세팅
2. Truffle box를 사용한 트러플 프로젝트 생성
3. 스마트 컨트랙트 작성
4. 스마트 컨트랙트 컴파일 and 마이그레이트 
5. 스마트 컨트랙트 테스트
6. 스마트 컨트랙트와 상호작용하는 인터페이스 만들기
7. 브라우저와 dapp 상호 작용

## 1. 개발환경 세팅

다음의 명령어를 사용하여 truffle을 전역적으로 설정한다.

```
// 전역 설치
npm install -g truffle

// 버전 확인
truffle version
```

우리는 또한 Ganache도 설치할것이다. Ganache는 배포와 dapp 개발 및 테스트가 가능한 개인 이더리움 블록체인이다.
경로는 다음과같다. [공식 홈페이지](http://truffleframework.com/ganache)

## 2. 트러플 프로젝트 생성

다음이 명령어를 이용하여 **pet-shop-tutorial** 프로젝트 디렉토리를 생성한다.

```
mkdir pet-shop-tutorial

cd pet-shop-tutorial
```

그리고 다음의 명령어를 사용해 pet-shop이라는 응용프로그램을 다운 받을수 있다.

```
truffle unbox pet-shop
```

- unbox 명령어는 기존에 구현되어있는 소스코드들을 내려 받는 기능이며, unbox 키워드를 사용해서 내려 받을수 있는 목록은 다음 링크에 올라가있다.
[unbox 리스트](http://truffleframework.com/boxes/);
예를들어 리액트가 추가된 트러플 프로젝트를 위해서는 truffle unbox react 명령어를 입력할 수 있다.

- empty 프로젝트를 생성하기 위해서는 아래와 같은 명령어를 사용하자

```
truffle init
```

### 디렉토리 구조

이렇게 다운 받은 튜토리얼의 디렉토리 구조는 다음과 같다.

- contracts/ : 솔리디티로 작성된 스마트 컨트랙트들이 담기는 폴더이다. Migrations.sol이라는 중요한 파일이 담겨있고, 이것에 대해서는 이후에 설명한다.
- migrations/: 트러플은 배포를 위해서 migration 시스템을 이용한다. migration은 변경사항을 추적하는 특병한 스마트 컨트랙트이다.
- test/ : 프로젝트 내의 자바스크립트와 솔리디티 테스트 코드가 있는 폴더이다.
- truffle.js : 트러플의 설정 파일이다.

이외에도 pet-shop 튜토리얼에는 많은 설정들이 있지만, 이후에 설명되어 질것이며, 기본적인 구조는 위와 같다.

## 3. 스마트 컨트랙트 작성

우선, 백엔드 또는 스토리지 역할을 하는 스마트 컨트랙트를 작성함으로써 dapp 프로그래밍이 시작된다.

1. **contracts/** 폴더 안에 **Adoption.sol**를 생성한다
2. 다음과 같은 컨트랙트 소스파일을 추가한다

```solidity
pragma solidity ^0.4.17;

contract Adoption {

}
```

### 변수 생성

솔리디티는 string이나 int, bool 값이 선언되어야하는 정적 타입언어이다. 그리고 솔리디티는 **address라고 불리우는 유니크 타입을 가지고 있다**
address는 20바이트 길이의 이더리움 주소이다. Ethereum 블록 체인의 모든 계정과 스마트 계약에는 주소가 있으며이 주소로 Ether을 보내고받을 수 있다.

1. **contract Adoption {**뒤에 아래의 코드를 더한다

```solidity
address[16] public adopters;
```

- 위의 코드에는 address 타입의 adopters라는 길이가 16인 배열이 추가되었다.
- 또한 public 으로 선언됨을 확인할수 있다. public은 자동으로 getter 메소드를 가지며, 우리의 예제 변수는 배열이므로 키를 가지고 단일값만 반환한다. 나중에 우리는 UI에서 사용할 전체 배열을 반환하는 함수를 작성할 것이다.

### 첫번쨰 함수 : Adopting a pet(애완동물 입양)

1. 위에 정의한 변수 다음에 아래와 같은 함수를 추가하자

```solidity
// Adopting a pet
function adopt(uint petId) public returns (uint) {
  require(petId >= 0 && petId <= 15);

  adopters[petId] = msg.sender;

  return petId;
}
```

- 솔리디티에서는 함수가 반환값을 가질떄 반환형이 명시되어야한다. 위의 경우 반환되는 petId는 uint형이므로 returns (uint)를 명시해준다.
- petId를 사용하여 기존에 선언했던 adopters를 확인하려고한다. 이경우 길이가 16인 배열이므로 petId는 0에서 15사이의 값이어야하며, 이를 검증하기 위해 require를 사용한다.
- 만약 조건이 충족된다면, 이어서 **petId에 해당하는 adopters의 값에 스마트 컨트랙트를 호출한 sender의 주소를 저장**한다.
- 마지막으로 입양된 애완동물의 id를 반환한다.

### 두번째 함수 : Retrieving the adopters(입양인 검색)

전에 언급했듯이 배열은 하나의 키값에 해당하는 변수를 반환한다. 우리의 UI는 모든 애완동물의 입양상태를 업데이트 해야하므로 16번의 api콜은 적당하지 않다.
그러므로 우리의 다음 스텝은 모든 배열값을 리턴하는 것이다.

1. getAdopters() 메소드를 adopt() 뒤에 추가한다

```solidity
// Retrieving the adopters
function getAdopters() public view returns (address[16]) {
  return adopters;
}
```

- adopters가 이미 선언되었으므로 간단하게 반환 할 수 있다. 이 경우도 마찬가지로 반환값을 address[16]으로 선언해 줘야한다.

## 4. 스마트 컨트랙트 컴파일 and 마이그레이트 

스마트 컨트랙트를 작성했으니 이제 컴파일 및 migrate를 실행해보자

Truffle에는 Truffle Develop라고하는 내장 된 개발자 콘솔이 있으므로 이를 이용하여 배포및 테스트하는 데 사용할 수있는 개발 블록 체인을 생성한다.
또한 트러 플 명령을 콘솔에서 직접 실행할 수 있다. 우리는 Truffle Develop을 사용하여 이 튜토리얼에서 우리 컨트랙트의 대부분의 작업을 수행 할 것이다.

### Compile

솔리디티는 컴파일 언어이다. 즉, 우리가 EVM 위에서 해당 컨트랙트를 구동하기 위해서는 컴파일을 통해 바이트 코드로 변환해야한다는 뜻이다.
쉽게 말해서 인간이 읽을수 있는 언어(솔리디티)에서 EVM이 읽을수 있는 었어(바이트코드)로 변환한다고 생각하면 된다.

1. 터미널에서 dapp이 있는 디렉토리로 이동 후에 다음을 입력한다.

```solidity
truffle compile
```

2. 그럼 다음과 같은 출력이 표시될 것이다

```solidity
Compiling ./contracts/Migrations.sol...
Compiling ./contracts/Adoption.sol...
Writing artifacts to ./build/contracts
```

### Migration

성공적으로 컴파일이 진행되었다면 이제 블록체인 위에 migrate할 차례이다
migration이란 app의 컨트랙트를 한 상태에서 다음 상태로 변경하기 위한 배포 스크립트이다.
첫번째 Migration은 새 코드를 배포하는 것이지만 시간이 지남에 따라 다른 마이그레이션은 데이터를 이동시키거나 컨트랙트를 다른것으로 대체할 수 있다.

사용자는 이미 생성된 **migrations/** 디렉토리 내에서 **1_initial_migration.js**라는 파일을 볼수 있다.
이 파일은 스마트 컨트랙트의 마이그레이션의 지속적 관찰을 위한 Migrations.sol파일 배포를 관리하며, 변경되지 않은 컨트랙트의 이중 배포를 방지한다.

이제 우리 프로젝트의 마이그레이션 파일을 만들어야한다.

1. **migrations/**디렉토리 안에 **2_deploy_contracts.js**를 만든다.

2. **2_deploy_contracts.js** 파일에 다음과 같은 코드를 추가한다

```solidity
var Adoption = artifacts.require("Adoption");

module.exports = function(deployer) {
  deployer.deploy(Adoption);
};
```

3. 컨트랙트를 블록체인으로 실행하기 전에 블록체인을 실행해야한다. 이를 위해 우리는 앞서 설명했던 Ganache를 사용할 것이다. 예제 코드의 **truffle.js** 내부의 포트 번호가 7545로 설정되어있으므로 Ganache의 포트 번호도 7545로 설정하자

4. Ganache 실행후 터미널로 돌아와 아래의 코드를 실행한다

```solidity
truffle migrate
```

5. 성공적으로 migration된다면 아래와 같은 메세지가 출력된다. 메세지에서 배포된 컨트랙트의 주소를 볼수 있다.

```solidity
Using network 'development'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0xcc1a5aea7c0a8257ba3ae366b83af2d257d73a5772e84393b0576065bf24aedf
  Migrations: 0x8cdaf0cd259887258bc13a92c0a6da92698644c0
Saving successful migration to network...
  ... 0xd7bc86d31bee32fa3988f1c1eabce403a1b5d570340a3a9cdba53a472ee8c956
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Deploying Adoption...
  ... 0x43b6a6888c90c38568d4f9ea494b9e2a22f55e506a8197938fb1bb6e5eaa5d34
  Adoption: 0x345ca3e014aaf5dca488057592ee47305d9b3e10
Saving successful migration to network...
  ... 0xf36163615f41ef7ed8f4a8f192149a0bf633fe1a2398ce001bf44c43dc7bdda0
Saving artifacts...
```

6. Ganache내부에서는 블록의 상태가 변경됨을 확인할수 있다. 처음에는 0이었는데 배포후에는 4로 증가되었다. 또한 첫번째 계정의 이더값은 100이었지만 트랜잭션 비용으로 인해 더 낮아지게 되었다.

7. 모든 과정을 완료하면 로컬에 스마트 컨트랙트 배포가 완료된다.

## 5. 스마트 컨트랙트 테스트

트러플은 스마트 컨트랙트 테스트에 매우 유연하다. 테스트는 javascript 및 solidity로 작성이 가능하며, 이 튜토리얼에서는 solidity로 예제를 만들어본다.



1. **test/** 폴더에 **TestAdoption.sol**파일을 만든다.
2. **TestAdoption.sol**에 다음과 같은 코드를 붙여넣는다.

```solidity
pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Adoption.sol";

contract TestAdoption {
  Adoption adoption = Adoption(DeployedAddresses.Adoption());

}
```

우리는 3개의 import로 테스트를 진행한다

- **Assert.sol** : 기대값과 실제값이 동일한자 아닌지 검증하여, true/false를 반환한다.
- **DeployedAddresses.sol** : 테스트를 진행할 때 Truffle은 테스트중인 계약의 새로운 인스턴스를 블록 체인에 배포한다.
- **Adoption.sol** : 우리가 배포하고자하는 스마트 컨트랙트

그런 다음 테스트 할 스마트 계약을 포함하는 계약 전체 변수를 정의하고 DeployedAddresses 스마트 계약을 호출하여 주소를 가져온다.

### adopt 함수 테스트 하기

adopt() 함수를 테스트 하기위해 반환값이 petId가 성공적으로 반환되는지 확인해야한다.
ID가 반환되었는지와 전달 된 ID에 대한 adopt ()의 반환 값을 비교하여 올바른지 확인할 수 있다.

1. **TestAdoption.sol**의 **Adoption** 다음 스마트 컨트랙트에 아래와 같은 함수를 추가합니다.

```solidity
// Testing the adopt() function
function testUserCanAdoptPet() public {
  uint returnedId = adoption.adopt(8);

  uint expected = 8;

  Assert.equal(returnedId, expected, "Adoption of pet ID 8 should be recorded.");
}
```

Assert.equal()함수를 사용하여 첫번째 인자에는 실제값, 2번째 인자는 기대값, 마지막은 콘솔 로그를 입력한다.

### 애완동물의 주인 주소에 대한 테스트 하기

앞서 만든 address[16] adopters의 가시성은 public으로 선언되었다. 따라서 외부에서 참조가 가능하다
이를 테스트 하기 위해 아래와 같은 코드를 작성할 수 있다.

```solidity
// Testing retrieval of a single pet's owner
function testGetAdopterAddressByPetId() public {
  // Expected owner is this contract
  address expected = this;

  address adopter = adoption.adopters(8);

  Assert.equal(adopter, expected, "Owner of pet ID 8 should be recorded.");
}
```

위의 코드에서 기대값은 현재의 주소값이므로 this를 선언해준다. 

### 애완동물들의 모든 주인 주소값 테스트 하기

1. 아래의 테스트 코드를 추가한다

```solidity
// Testing retrieval of all pet owners
function testGetAdopterAddressByPetIdInArray() public {
  // Expected owner is this contract
  address expected = this;

  // Store adopters in memory rather than contract's storage
  address[16] memory adopters = adoption.getAdopters();

  Assert.equal(adopters[8], expected, "Owner of pet ID 8 should be recorded.");
}
```

모든 계약 값을 받아온 후 8번 값에 대한 주소를 this를 통해 확인할 수 있다.

### 테스트하기

1. 터미널로 돌아와 다음과 같은 키워드를 입력한다

```
truffle test
```

2. 모든 테스트가 완료되면 다음과 같은 출력이 발생한다

```
   Using network 'development'.

   Compiling ./contracts/Adoption.sol...
   Compiling ./test/TestAdoption.sol...
   Compiling truffle/Assert.sol...
   Compiling truffle/DeployedAddresses.sol...

     TestAdoption
       ✓ testUserCanAdoptPet (91ms)
       ✓ testGetAdopterAddressByPetId (70ms)
       ✓ testGetAdopterAddressByPetIdInArray (89ms)


     3 passing (670ms)
```

## 6. 스마트 컨트랙트와 상호작용하는 사용자 인터페이스(API) 만들기

이제 스마트 계약서를 작성하여 로컬 테스트 블록 체인에 배포하고 콘솔을 통해 상호 작용할 수 있다는 것을 확인 했으므로 애완 동물 샵에 사용할 수있는 UI를 만들 때이다. 

애완 동물 샵 Truffle Box에는 앱 프론트 엔드 용 코드가 포함되어 있다. 이 코드는 src / 디렉토리 내에 존재한다.

### web3.js 인스턴스화

1. 텍스트에디터에서 **/src/js/app.js**를 열자.
2. 파일을 확인해보자. app.js에는 애플리케이션을 관리하고 init ()에서 pet 데이터를로드 한 다음 initWeb3 () 함수를 호출하는 전역 App 객체가 있다. web3 자바 스크립트 라이브러리는 Ethereum 블록 체인과 상호 작용한다. 사용자 계정을 검색하고 트랜잭션을 보내고 스마트 계약서와 상호 작용하는 등의 작업을 수행 할 수 있다.
3. initWeb3에서 여러 줄 주석을 제거하고 다음과 같이 바꾼다.

```solidity
// Is there an injected web3 instance?
if (typeof web3 !== 'undefined') {
  App.web3Provider = web3.currentProvider;
} else {
  // If no injected web3 instance is detected, fall back to Ganache
  App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
}
web3 = new Web3(App.web3Provider);
```

위 코드는 다음과 같은 동작을 수행한다

- 먼저, 이미 활성화 된 web3 인스턴스가 있는지 확인한다.(**MetaMask 확장 기능이있는 Mist 또는 Chrome과 같은 Ethereum 브라우저는 자체 web3 인스턴스를 주입한다**) 주입 된 web3 인스턴스가 존재하면 우리는 그 Provider를 얻고 그것을 사용하여 web3 객체를 생성합니다.
- 주입 된 web3 인스턴스가 없으면 우리는 로컬 provider를 기반으로 web3 객체를 만든다. (**이 방법은 개발 환경에서는 좋지만 안전하지 못하고 생산에 적합하지 않다.**)


### 계약서 작성

이제 우리는 web3을 통해 Ethereum과 상호 작용할 수 있으므로, 우리는 스마트 컨트랙트를 인스턴스화하여 web3이 어디서 그것을 발견하고 어떻게 작동하는지 알고 있어야한다.
트러플에는 **truffle-contract**이라고 불리는 것을 돕기위한 라이브러리가 있다. 여기서 계약 정보를 마이그레이션과 동기화하므로 계약서의 배포 된 주소를 수동으로 변경할 필요가 없다.

1. **/src/js/app.js**의 **initContract**에 다음과 같은 코드를 작성하자.

```solidity
$.getJSON('Adoption.json', function(data) {
  // Get the necessary contract artifact file and instantiate it with truffle-contract
  var AdoptionArtifact = data;
  App.contracts.Adoption = TruffleContract(AdoptionArtifact);

  // Set the provider for our contract
  App.contracts.Adoption.setProvider(App.web3Provider);

  // Use our contract to retrieve and mark the adopted pets
  return App.markAdopted();
});
```

코드 설명은 다음과 같다

- 우선 스마트 컨트랙트에 대한 artifact를 찾아야한다. **아티팩트는 배포 된 주소 및 ABI (Application Binary Interface)와 같은 계약에 대한 정보이다. ABI는 변수, 함수 및 매개 변수를 포함하여 계약과 상호 작용하는 방법을 정의하는 JavaScript 객체이다.**
- 일단 콜백에 아티팩트가 생기면 TruffleContract()로 전달합니다. 이것은 우리가 상호 작용할 수있는 계약의 인스턴스를 생성한다.
- 인스턴스화 된 스마트 컨트랙트를 통해 web3을 설정할 때 이전에 저장 한 App.web3Provider 값을 사용하여 web3 provider를 설정한다.
- 그런 다음 이전 방문에서 이미 애완 동물이 채택 된 경우 앱의 markAdopted() 함수를 호출한다. 스마트 계약의 데이터를 변경할 때마다 UI를 업데이트해야하므로 별도의 기능으로 캡슐화했다.

### 입양된 애완 동물을 얻고 UI 업데이트하기

1. **/src/js/app.js**의 **markAdopted** 함수 내에 다음과 같은 소스 코드를 넣어준다

```solidity
var adoptionInstance;

App.contracts.Adoption.deployed().then(function(instance) {
  adoptionInstance = instance;

  return adoptionInstance.getAdopters.call();
}).then(function(adopters) {
  for (i = 0; i < adopters.length; i++) {
    if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
      $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
    }
  }
}).catch(function(err) {
  console.log(err.message);
});
```

- 배포 된 Adoption 계약에 액세스 한 다음 해당 인스턴스에서 getAdopters()를 호출한다.
- 먼저 스마트 컨트랙트 콜 외부에서 adoptionInstance 변수를 선언하여 처음 인스턴스를 검색 한 후에 인스턴스에 액세스 할 수 있다.
- call ()을 사용하면 전체 트랜잭션을 보낼 필요없이 블록 체인에서 데이터를 읽을 수 있다. 즉, 이더를 소비하지 않아도된다.
- 주소형 배열이므로 이더리움은 16개의 주소형으로 초기화한다. 따라서 우리는 반복문을 거치며 해당 배열값이 빈 주소인지 검사하는 것이다.
- 해당 주소값에 값이 할당 되었으면 이미 입양이 완료된 상태이므로 클라이언트의 입양 버튼을 사용불가로 만든다.
- 예외 처리를 통해 오류가 발생할 경우 콘솔에 입력된다.

### adopt() 함수 처리

1. **/src/js/app.js**에서 **handleAdopt**에 다음과 같은 코드를 추가한다.

```solidity
var adoptionInstance;

web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }

  var account = accounts[0];

  App.contracts.Adoption.deployed().then(function(instance) {
    adoptionInstance = instance;

    // Execute adopt as a transaction by sending account
    return adoptionInstance.adopt(petId, {from: account});
  }).then(function(result) {
    return App.markAdopted();
  }).catch(function(err) {
    console.log(err.message);
  });
});
```

- 우리는 web3을 사용하여 사용자의 계정을 얻는다. 오류 검사 후 콜백에서 첫 번째 계정을 선택한다.
- 콜백에서 우리는 위에서 설명한대로 배포 된 계약을 가져 와서 adoptionInstance에 인스턴스를 저장한다.
- 이번에는 call 대신 트랜잭션을 전송한다. 거래에는 "보낸 사람"주소가 필요하며 관련 비용을 넣어줘야한다. 이 비용은 이더로 지불하며 가스라고합니다. 가스 비용은 계산을 수행하거나 스마트 계약서에 데이터를 저장하는 데 드는 수수료이다. 우리는 애완 동물의 ID와 이전에 계정에 저장 한 계정 주소를 포함하는 객체 모두를 사용하여 adopt() 함수를 실행하여 트랜잭션을 보낸다.
- 트랜잭션을 전송 한 결과는 트랜잭션 객체이다. 오류가 없으면 markAdopted() 함수를 호출하여 새로 저장된 데이터와 UI를 동기화한다.

## 7.브라우저와 dapp 상호 작용

### 메타 마스크 설치 및 구성

브라우저에서 Google 애플리케이션과 상호 작용하는 가장 쉬운 방법은 Chrome과 Firefox 모두를위한 브라우저 확장 프로그램 인 MetaMask를 사용하는 것이다.

1. 브라우저에 MetaMask를 설치하자.
2. 설치가 완료되면 주소 표시 줄 옆에 MetaMask fox 아이콘이 표시된다. 아이콘을 클릭하면 다음 화면이 나타난다.

![image](https://user-images.githubusercontent.com/20614643/39164913-d4dc6ce4-47bc-11e8-9c7f-cf751c8a1565.png)

3. Accept을 클릭하여 개인 정보 고지 사항에 동의하자.
4. 그러면 이용 약관이 나타난다. 그것들을 읽고 아래로 스크롤 한 다음 Accept (동의)를 클릭하자.

![image](https://user-images.githubusercontent.com/20614643/39164958-10b3df18-47bd-11e8-9313-c851f037511c.png)

5. 이제 초기 MetaMask 화면이 나타난다. Existing DEN 가져 오기를 클릭하자.

![image](https://user-images.githubusercontent.com/20614643/39165009-4d756f20-47bd-11e8-802c-95162de4951f.png)

6. 월렛 시드라고 표시된 상자에 Ganache에 표시되는 니모닉을 입력.

![image](https://user-images.githubusercontent.com/20614643/39165023-587633aa-47bd-11e8-9431-b175338cf0ad.png)

7. 이제 MetaMask를 Ganache가 만든 블록 체인에 연결해야한다. "Main Network"가 표시된 메뉴를 클릭하고 Custom RPC를 선택하자.

![image](https://user-images.githubusercontent.com/20614643/39165058-799c776a-47bd-11e8-81cb-d208b28d2e0d.png)

8. "New RPC URL"상자에 http://127.0.0.1:7545를 입력하고 저장을 클릭.

![image](https://user-images.githubusercontent.com/20614643/39165070-8e652e26-47bd-11e8-88ba-57aa61203271.png)

9. 'setting'옆에있는 왼쪽 화살표를 클릭하여 페이지를 닫고 계정 페이지로 돌아간다. Ganache가 만든 각 계정에는 100 개의 이더가 있다. 첫 번째 계정에서는 계약 자체가 배포 될 때와 테스트가 실행될 때 일부 가스가 사용 되었기 때문에 약간 더 적다.

![image](https://user-images.githubusercontent.com/20614643/39165107-b9c9b118-47bd-11e8-9da2-ede1a37b73ba.png)

이제 구성이 완료되었다.

### 라이트 서버 설치 및 구성

이제 로컬 웹 서버를 시작하고 dapp를 사용할 수 있다. 우리는 정적 파일을 제공하기 위해 lite-server 라이브러리를 사용하고 있으며 작동 방식을 살펴 보겠다.

1. **bs-config.json**을 텍스트 편집기 (프로젝트의 루트 디렉토리에 있음)에서 열고 내용을 검사하자. 이것은 lite-server에 우리의 기본 디렉토리에 포함시킬 파일을 알려준다. 웹 사이트 파일에는 ./src 디렉토리를, 계약 아티팩트에는 ./build/contracts 디렉토리를 추가한다.

```solidity
{
  "server": {
    "baseDir": ["./src", "./build/contracts"]
  }
}
```

2. 또한 프로젝트의 루트 디렉토리에 있는 **package.json 파일의 scripts 객체에 dev 명령을 추가**한다. 이 명령은 콘솔에서 npm run dev을 실행할 때 npm에게 lite-server의 로컬 설치를 실행하도록 지시한다.

```
"scripts": {
  "dev": "lite-server",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

### Dapp 사용하기

1. 로컬 웹서버를 실행시키기 위해 다음과같은 명령어를 입력한다.

```
npm run dev
```

서버가 실행되면서 자동으로 아래와 같은 화면이 브라우저에서 실행된다.

![image](https://user-images.githubusercontent.com/20614643/39165354-0018a77c-47bf-11e8-8800-4eee0227caad.png)


2. dapp를 사용하려면 원하는 애완 동물의 채택 버튼을 클릭해야한다.
3. MetaMask를 통해 트랜잭션을 승인하라는 메시지가 자동으로 표시된다. Submit을 클릭하여 트랜잭션을 승인하자.

![image](https://user-images.githubusercontent.com/20614643/39165420-4fba6fea-47bf-11e8-9fff-858e60106a82.png)

4. 입양 된 애완 동물의 변화 옆에있는 버튼이 "success"가 표시된다. 애완 동물이 입양되었으므로 버튼은 비활성화된다. 버튼이 자동으로 변경되지 않으면 브라우저에서 앱을 새로 고침하면 된다.

![image](https://user-images.githubusercontent.com/20614643/39165449-7d9e8ca2-47bf-11e8-8bb9-7dd5d653140f.png)

5. 그리고 MetaMask에서 트랜잭션을 볼 수 있다

![image](https://user-images.githubusercontent.com/20614643/39165497-a6bbd19e-47bf-11e8-9a70-89def66001a5.png)
