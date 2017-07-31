# TYPESCRIPT

## 타입 스크립트란?

- 타입 스크립트는 언어(language)이다. superset이라고 해서 자바 스크립트의 기본적 문법과 모두 호환이 되고 그 위에 타입 스크립트만의 문법이 적용된다.

- 타입스크립트는 컴파일 언어이다. 그러나 전통적 컴파일 언어와는 다르다. 엄밀하게 말하자면 컴파일 언어와는 조금 다르다. 좀 더 정확하게 말하자면 트랜스파일러의 느낌이 강하며, 예를 들어 Babel등이 이에 속한다. 트랜스파일이 적용되면 다른 언어로 변환된다. 미리 helper 함수가 구현되었기 때문에 타입스크립트를 컴파일하여 자바스크립트로 코드로 변환하면 코드가 길어진다. 이것이 단점이지만, 보완하기위한 노력이 계속되고 있다.

- Traditional Complie Language, 즉 컴파일 언어라고 하며, C와 java등이 해당된다. 해당 문법으로 작성된 언어들은 최종적으로 바이너리 코드로 변환된다. 마찬가지로 타입스크립트도 컴파일을 거치면 자바스크립트로 변환된다.

- C와 같은 컴파일 언어는 타입체크, 최적화, 링킹, 바이너리 생성 등의 일을 한다. 타입스크립트도 컴파일 하는 시점의 특정 업무가 실행되는데, 가장 중요한 요점은 타입 체크이다. 그래서 이름도 타입스크립트이다. 

- 정적 타입 언어와 동적 타입 언어가 있는데, 정적 타입은 타입을 못박아놓고 시작하는 C와 같은 계열이며, 동적 타입은 타입 자체가 변형되는 자바스크립트와 같은 계열이다. 동적 타입의 단점은, 타입의 변환이 자동으로 이루어지기 때문에 디버깅이 어렵다는 것이며, 이러한 단점을 보완하기 위해 타입 스크립트가 개발된 면이 있다.

- 리액트를 타입 스크립트로 사용하면 초기 설정이 조금 복잡하고 짜증나지만, 모듈 사용에나 다른 작업 과정에서 이점이 상당히 많다.

- 컴파일러는 nodeJS의 npm 모듈을 사용하거나, visual studio의 내장 기능을 사용한다. 될수 있으면 nodeJS의 npm 모듈을 사용하자.

## 노드?

- node의 경우는 크롬에 있는 인터프리터인 v8 엔진을 떼서 별개의 런타임 환경으로 만들어 놓은 것이다. 따라서 기존의 브라우저의 런타임 환경에서 돌아가는 환경을 모듈화하여 사용하는 것이라고 할 수 있다.

## 타입스크립트 시작하기

### 컴파일러 설치

```
npm i typescript -g

// package.json의 transpile을 다음과 같이 설정해준다
"scripts": {
    "transpile":"tsc",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

// 사용법은 다음과 같다. tsc 이후 파일명을 입력하면 js파일로 변환이 된다.
tsc source.ts
```

### 에디터 설치

- vs code나 intelliJ, web storm을 사용한다. vs code는 타입스크립트로 만들어진 IDE이므로 강력한 지원이 된다. vs code는 타입스크립트의 새 버전이 나오면 해당 코드를 넣어서 새 버전을 릴리즈하면서 성장하고 있다. intelliJ도 같은 방식으로 타입스크립트가 내장되어있다. 

### tsc 설정 파일 생성

```
// 명령어 입력하면 tsconfig.json 파일이 생성된다.
// tsc 컴파일러의 초기 세팅을 하겠다는 뜻이된다.
tsc --init

// tsc --init을 입력했다면 앞으로 밑의 코드만 입력하면 된다.
tsc

// tsc에서는 왓치 모드를 사용할 수 있다. 변경되면 감지해서 새로 컴파일을 시켜주는 모드이다.
tsc -w
```

- 초기에 config 파일을 만들면 3줄이 딸랑있다. target은 어떤 문법으로 변환할 것인지를 명시하는 키워드이다. 예를 들어 es6나 es5등으로 변환이 가능하다. 결과물이 어떤 module이 되는지 지정하는 키워드이다. 초기에는 commonjs가 명시되어있다. strict는 타입 체크에 대한 설정이다.

### 내부 컴파일러

- tslint를 사용하면 된다.

```
npm i typescript tslint
tslint --init

```

### tsconfig의 프로퍼티

- json.schemastore.org/tsconfig 참조

### 최상위 프로퍼티

- compileOnSave, extends, complieOptions, files, include, exclude

- compileOnSave : 파일을 저장하면 자동으로 저장하는 옵션(true/false)

- extends : 설정을 확장함

- complieOptions : 제일 많은 옵션 설정 프로퍼티

- file : 상대 혹은 절대 경로의 리스트 배열, exclude 보다 강력함

- include : exclude 보다 약함, *를 사용하면 .ts/.tsx/.d.ts만 include(allowJS)

- exclude : 설정안하면 4가지(node modlues, bower componets, jspm pacages, <outDir>)를 default를 제외한다.

## 문법

### 변수(variable)

- 타입스크립트는 자바스크립트에서 형을 명시적으로 작성해 주어야하기 때문에 아래와 같이 변수선언을 하게된다.
 
```
var isDone : boolean = false; 
var age : number = 42;
var myName : string = "Anders";

var notSure : any = true;
notSure = 23;
notSure = "may be a string";
```

- null과 undefined의 차이는 다음과 같다. null은 비어있는 값을 표시하는 것이며, undefined는 명시되어있지 않은 것이라고 할수 있다.

```
// print null
var emptyVariable = null;
console.log(emptyVariable);

// print undefined
var newVariable;
console.log(newVariable);
```

### 콜렉션(collection)

- 여러개의 값을 하나의 변수에 저장할 때 사용한다. 즉 배열을 생성할떄 아래와 같이 사용하게 된다.

```
// list
var list : number[] = [1,2,3];
var list : Array<number> = [1,2,3];
``` 


### 함수(function)

- 어떤일들을 해야할지 명세해놓고 가져다 사용한다.

```
// 인자가 없을 때 
function sayHello(){
  alert('Hello');
}
sayHello();


// 인자가 있을 때 1
function sayMyName(name:string){
  alert('name :' + name);
  console.log('function sayMyName is called');
}
sayMyName('a student studying typescript');

// 인자가 있을 때 2
function addTwoNumber(a:number, b: number){
  return a+b;
}
addTwoNumber(2,3);
alert(addTwoNumber(2,3));
```

### 조건문(condition)

- if에 해당하는 키워드이다.

```
// example1
var homeworkDone : boolean = true;
if(homeworkDone===true){
  alert('then you can play from now');
}

// example2
var age: number = 15

if(age>20){
  console.log('You are an adult')
}else{
  console.log('You are not an adult');
}

```

### 반복문(loop)

- 여러번의 코드가 반복될떄 반복문을 통해 단순하고 직관적인 코드를 사용할 수 있음.

1. for
```
// example1
for(var i = 0; i<10; i++){
  console.log(i);
}

// example2(collection)
var myArray : string[] = ["A","B","C"];

for(var i =0; i<myArray.length; i++){
  console.log("index:"+i+"->"+myArray[i]);
}
```

2. while
```
// example1
var i = 10;

while(i>0){
  console.log(i);
  i--;
}
```

### 오브젝트(Object)

- OOP에서의 개념과는 조금 다르다. 오히려 자바스크립트의 map이나 파이썬의 dict와 비슷하다.

- 조금 더 자세하게 말하자면 구조화된 변수라고 할수 있다.

```
var emptyObject = {}
var personObject = {
  firstName : "John",
  lastName : "Smith"
}
personObject["salary"] = 14000;
```

- 오브젝트의 값을 체크하기 위해서는 for-in 문을 사용한다.

```
var emptyObject = {}
var personObject = {
  firstName : "John",
  lastName : "Smith"
}
personObject["salary"] = 14000;

for(var member in personObject){
  if(personObject.hasOwnProperty(member)){
    console.log("the member" + member + "of personObject is" + personObject[member]);
  }
}
```

### 인터페이스(interface)

- 인터페이스란 오브젝트에 대한 타입이다. 여러개의 함수와 여러개의 변수가 구조적으로 어떻게 결합해야하는지, 함수가 구조적으로 어떻게 만들어져야하는지를 설정한다.

1. 첫번째로, 오브젝트에 대한 구조를 명세할때 인터페이스를 사용한다. 예는 다음과 같다.

```
// 인터페이스
interface Person{
  name: string;
  age?:number  // optional

  move():void;
}

// 인터페이스 implements
var person1 :Person= {
  name:"john",
  move:() => {}
}

var person2 :Person= {
  name:"john",
  age:42,
  move:() => {}
}

// 에러! 사용할수 없음, move 함수가 없고, age가 잘못된 변수형임
var person3 :Person= {
  name:"john",
  age:true
}
```


2. 함수에 구조에 대한 명세를 하는 예제이다

```
interface SearchFunc{
  (source:string, substring:string) : boolean;
}

var mySearch : SearchFunc{
  mySearch =  function(src:string, sub:string){
    return src.search(sub) != -1;
  }
}

```

### 클래스(class)

- 실제 세계의 물체를 표현함, 객체라고 말할 수 있음. 따라서 정보(변수)와 행동(함수)으로 이루어진다.

- 인터페이스와 혼동할 수 있지만 차이점은 constructor와 함수 내부의 내용을 꼭 써야한다는 점이다.


```
class Point{
  x: number;

  constructor(x: number, public y :number = 0){
    this.x = x;
  }

  dist() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  static origin = new Point(0, 0);
}

var point1 = new Point(10, 20);
var point2 = new Point(25);
```