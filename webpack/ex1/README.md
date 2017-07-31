# webpack

## 웹팩을 사용하는 이유?

- 가장 큰 이유는 http 요청이 비효율적이기 때문이다. 현재 주로 사용하는 http/1.1에서는 커넥션을 하나씩 열어서 정적 자료에 대한 요청을 보내는데 이 때문에 로딩이 엄청나게 길어지게 된다. 정적파일이란 css, javascript html, 웹폰트, 이미지, json 등을 말한다. 따라서 이와 같은 정적파일을 하나로 합쳐 번들링 하기 위해 사용하는 것이 웹팩이다.

- 또한 js가 점점 중요해지면서 js 자체만으로도 엄청난 의존관계가 생겼다. 모듈들관의 import나 require를 묶어주기 위해서 사용하는 것도 큰 이유중 하나이다.

- 2번째 이유 때문에 import나 require를 사용하지 않고, 예전 방식으로 정적 파일을 주르륵 불러오는 불러오는 경우에는 웹팩의 장점을 누릴수 없다. 따라서 모듈 시스템을 개인적으로 공부하고 적용하는게 좋다. 

- 웹팩은 하나의 설정 파일(webpack.config.js)로 모든것을 해결한다. 

## 웹팩 설치

```
npm init
npm install webpack --save-dev
```

## 웹팩 설정
- package.json 안의 script에 bulid 키워드로 설정을 해준다. bulid [시작파일] [output] 순으로 설정하면 된다.

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "bulid":"webpack src/js/app.js dist/bundle.js"
  },
``` 

## 파일에서 가져오기/내보내기(import/export)
- 위의 설정에서 app.js를 먼저 실행한다. app.js를 실행하기 전에 dom-loader.js를 실행해야하는데, 따라서 app.js에서 dom-loader.js를 불러와야한다. 그전에 dom-loader.js의 변수를 export 시킨다.

```
// dom-loader.js
export var secretButton = document.querySelector('#secret-button');
export var secretParagraph = document.querySelector('#secret-paragraph');


// app.js
import { secretParagraph, secretButton } from './dom-loader.js'
```

## 웹팩 실행(번들링)

- 아래의 코드를 실행하면 번들링이 진행된다. output으로 나온 코드를 index.html의 script에 추가해주도록하자.

```
npm run bulid
```

## 번들링 minify

- 다음의 코드를 package.json에 추가해준다. 그러면 npm run bulid:prod로 minify된 코드를 얻을 수 있다.

```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "bulid":"webpack src/js/app.js dist/bundle.js",
    "bulid:prod":"webpack src/js/app.js dist/bundle.js -p"
  },
```

## 웹팩 개발 서버

- 개발 서버에서 테스트 가능, package.json안의 bulid를 webpack-dev-server로 변경한다. 앞으로 dist 내부의 bundle에 저장되지 않고 로컬 서버에 저장된다.

```
npm install webpack-dev-server --save-dev

// package.json 변경
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "bulid": "webpack-dev-server --entry ./src/js/app.js --output-filename dist/bundle.js",
    "bulid:prod": "webpack src/js/app.js dist/bundle.js -p"
  },
```