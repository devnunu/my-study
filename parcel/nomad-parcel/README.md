# parcel

## 개요

웹 팩을 사용하는 경우 사소한 변경을 위해 eject 후 웹 팩의 설정 파일을 건드려야한다. 문제는 웹팩이 너무 복잡해졌다는 것. 작은 프로젝트를 할때 웹팩을 사용하면 설정에 많은 시간을 날릴수 있다. 클라이언트나 스타트업을 위한 큰 프로젝트를 한다면 웹팩이 좋다. 그러나 빠르고 작은 프로젝트를 위해서는 파셀을 추천하다. 이유는 설정에 드는 비용이 제로이기 때문이다.

## 세팅

```
yarn global add parcel-bundler
npm install -g parcel-bundler
```

## 실습

세팅하고 싶은 목록을 나열해 보자
- React
- ES6 with Babel
- SCSS
- CSS Modules
- Typography.js
- Build for production


```
yarn add react react-dom
yarn add babel-preset-env babel-preset-react --dev

// dist 파일 생성 후 auto reloading
parcel
// 특정 파일에 대한 dist 파일 생성 후 auto reloading
parcel index.html
```

npm 스크립트도 추가가 가능하다

```
"script": {
    "start": "parcel index.html"
  }
```