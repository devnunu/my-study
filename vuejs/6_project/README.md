# Project

## single file component with JSX(ES6)

- 앱의 복잡도가 증가할 때, .vue 라는 파일 단위 안에 html, js, css를 관리할 수 있는 방법
- 복잡도가 커짐에 따라 야기될 수 있는 문제들
    1. 모든 컴포넌트에 고유의 이름을 붙여야 함
    2. js 파일에서 template 안의 html 의 문법 강조가 되지 않음
    3. js 파일상에서 css 스타일링 작업이 거의 불가
    4. ES5를 이용하여 계속 앱을 작성할 경우 Babel 빌드가 지원되지 않음

- .vue 파일을 브라우저가 렌더 할 수 있는 파일들로 변환하려면 webpack의 vue-loader 또는 browserify 이용

```
<template></template>
<script></script>
<style></style>
```

**참고: ES5만 사용하는 경우 single file component의 혜택을 볼 수 없음**

## Vue CLI를 이용한 프로젝트 구성 방법 설명

vue cli로 간단한 webpack 설정이 되어있는 프로젝트 생성이 가능하다

```
npm install -global vue-cli

// webpack-simple 대신 webpack도 가능 (상용 서비스 가동 시 webpack 권장)
vue init webpack-simple
npm install
npm run dev

export default {
    // 이 안의 내용은 모두 vue instance에 포함되어 생성된다.
}

```