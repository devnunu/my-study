# React with typescript

## REACT 개요

- 컴포넌트가 기본 단위, dom tree와 마찬가지로 component tree로 이루어져있다. virtual dom으로 요청이 있을때마다 view를 갱신 해주게 된다.

- 특이하게 JSX라는 문법을 사용한다. 이는 javascript xml이라는 뜻이며 단순하게 문법을 의미한다. jsx element라는 타입으로 그리겠다! 라고 하며 던져주면 이를 그려주는게 react의 역할이다. 

- React.Component라는 것을 상속받게 되는데, 이중에서 가장 중요한 함수인 render를 통해 return의 결과물을 지정해주면 이를 리액트가 그려주는 것이다. 프로세스는 간단하다. 데이터가 변하면 render라는 함수가 다시 호출이 되는 것이다. 예를 들어 props나 states 가 변경되면 render를 호출하고 다시 그리게 하는 것이다. 

- 따라서 컴포넌트를 만들기 위해 React.Component를 상속받고 그 안에서 render를 구현하고, props와 state를 잘 설정하고 바꿔주는것이 개발자의 업무이다.

## REACT with Babel

### module bundler
1. webpack2
2. webpack-dev-server

### loader
- Babel-loader
1. babel-core
2. babel-preset-env
3. babel-plugin-transform-react-jsx

### react
1. react
2. react-dom


## REACT with Typescript

### module bundler
1. webpack2
2. webpack-dev-server

### loader 
- ts-loader
1. typescript
- tslint-loader
1. tslint
2. tslint-react
- source-map-loader

### react
1. react, @types/react
2. react-dom, @types/react-dom


## REACT with CRA(Create-React-Application)

- react programming 이외의 일을 그만하기 위해서 간편하게 cli 환경에서 프로젝트를 시작할수 있게 만듬.

### CRA의 특징

1. 프로젝트 생성
- create-react-app [프로젝트명]

2. 개발용 서버 실행
- npm run start

3. 프로덕션 빌드
- npm run build

4. 테스트
- npm run test

5. 프로젝트를 CRA에서 꺼내기(프로젝트의 구조가 변경된다)
- npm run eject

6. pwa(progresive web app) 적용


### CRA 사용법

```
// CRA 설치
npm i create-react-app -g

// CRA 사용
create-react-app [프로젝트명] 

// CRA에 타입스크립트 옵션 사용
create-react-app [프로젝트명] --scripts-version=react-scripts-ts
```

### src 디렉토리 분석

1. index.tsx
- 메인 엔트리 파일
- 꼭대기에서 ReactDom.render를 수행
- pwa를 위한 서비스 워커 등록 작업

2. index.css
- 글로벌 스타일 작성 => 프로그래밍 적으로 제한되지 않는다.

3. App.tsx
- App 컴포넌트(샘플 컴포넌트)
- 클래스 이름과 파일 이름을 맞추는 것이 관례

4. App.css
- App 컴포넌트에서 쓰이는 스타일 => 일종의 암묵적인 관례

5. App.test.tsx
- App 컴포넌트에 대한 테스트 작성 파일

6. registerServiceWorker.ts
- pwa 서비스 워커 사용 등록