# WEBPACK


## 웹팩 설치

```
npm i -g webpack && npm i -D webpack
```

## 설정 파일

```
// webpack.config.js
const webpack = require('webpack');
module.exports = {
  entry: {
    app: '',
  },
  output: {
    path: '',
    filename: '',
    publicPath: '',
  },
  module: {

  },
  plugins: [],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
};
```

## entry

- entry는 웹팩이 파일을 읽어들이기 시작하는 부분이다. app이 객체의 키로 설정되어있는데 이 부분 이름은 자유롭게 바꾸면 된다. 이 키가 app이면 app.js로, zero면 zero.js로 나오게 된다.

```
{
  entry: {
    app: '파일 경로',
    zero: '파일 경로',
  }
}
```

- 하나의 entry에 여러 파일을 넣고 싶을 때는 아래처럼 배열을 사용하면 된다. 아래의 경우 a.js와 b.js가 하나의 파일로 묶여 app.js라는 파일로 나오게 된다. 웹팩은 entry의 js 파일 부터 시작해서 require나 import로 불러들여진 파일까지 알아서 파악한 뒤 entry에 기재된 키 개수만큼 묶어준다

```
{
  entry: {
    app: ['a.js', 'b.js'],
  },
}
```


- js 파일 대신 npm 모듈들을 넣어도 된다. 보통 babel-polyfill이나 eventsource-polyfill같은 것들을 적용할 때 다음과 같이 한다.

```
 {
  entry: {
    vendor: ['babel-polyfill', 'eventsource-polyfill', 'react', 'react-dom'],
    app: ['babel-polyfill', 'eventsource-polyfill', './client.js'],
  },
}
```

## output

- 다음으로 결과물에 대한 설정을 해 줘야한다. 이때 사용하는 것이 output이다.

- 아래의 코드를 보면 path와 publicPath가 있다. 우선, path는 output으로 나올 파일이 저장될 경로이다. publicPath는 파일들이 위치할 서버상의 경로이다. express.static과 비슷하다고 생각하면 된다. 

- filename은 [name].js 라고 되어있는데 이렇게 써줘야지 위의 entry 내부에서 설정한 값이 들어가 output이 나올수 있다. 예를 들어 app.js나 zero.js가 나온다는 뜻이다. 다시 말해 [name]이라는 것은 이와 같은 기능을 하는 옵션 중 하나이다.



```
{
  output: {
    path: '/dist',
    filename: '[name].js',
    publicPath: '/',
  },
}
```


## 바벨(babel)

- 보통 웹팩을 사용하면 바벨(babel)과 함께 사용한다. 우선 아래와 같이 babel을 설치하자. babel-loader와 babel-core는 필수이며, 나머지는 선택사항이다. (react는 리액트용 이며, env는 es의 최신 버전을 알아서 선택해준다. stage는 env 보다 더 실험적인 최신기술을 위한 것이다.)

```
npm i -D babel-loader babel-core babel-preset-env babel-preset-react babel-preset-stage-2
```

- .bablerc를 생성하고 아래의 코드를 넣는다. 

- env 다음의 targets가 env에 대한 옵션이다. 이 옵션에 대해 설명하자면, 브라우저는 최신 두 버전(IE는 10과 11, 크롬과 파이어폭스, 사파리, 엣지는 최신 두 버전)과 한국에서 5% 이상 점유율을 차지하는 브라우저를 모두 지원하라는 설명이다.

- 이렇게만 작성하면 babel이 알아서 최신 자바스크립트 코드를 지정한 targets에 맞게 호환되는 자바스크립트 코드로 바꿔준다

```
{
  "presets": ["env", { "targets": { "browsers": ["last 2 versions", "> 5% in KR"] } }, "stage-2"]
}
```


- 다음으로 package.json을 수정하자. package.json에 바벨로 컴파일 하는 부분을 추가시켜준다. npm run build를 수행하면 babel을 실행하고, src 폴더에 있는 최신 자바스크립트 코드를 컴파일하여 결과를 lib 폴더에 넣으라는 뜻(-d 옵션이 결과를 저장할 경로를 의미한다.)이다.

- 이제 구형 브라우저에서는 src 폴더 대신 lib 폴더에 있는 자바스크립트 파일을 사용하면 된다. 코딩은 src 폴더에서 ES2015 스타일로 하면 된다. 폴더 이름은 src, lib으로 고정되어있는 것이 아니라 사용자 마음대로이다.

```
{
  "scripts": {
    "build": "babel src -d lib"
  }
}
```

## babel-polyfill

- 바벨을 사용하면 구형 자바스크립트 문법으로만 바꿔준다. 바벨 그 자체로는 ES2015의 새로운 객체(Promise, Map, Set 등등)과 메소드(Array.find, Object.assign 등등)을 사용할 수 없다. 왜냐하면 ES2015에서 처음 생긴 거라 구형 자바스크립트에는 그에 상응하는 코드가 없기 때문이다. 그래서 babel-polyfill을 설치해야 새로운 기능을 사용할 수 있다.

```
npm install --save-dev babel-polyfill
```

- ES2015 문법을 사용하는 파일 가장 윗부분에 import 'babel-polyfill'; 구문을 넣으면 babel이 컴파일할 때 알아서 적용된다. (웹팩을 사용할 때만 알아서 적용된다. 웹팩을 사용하지 않는다면 import로 넣는 게 아니라 스크립트로 직접 넣어줘야 한다)

```
import 'babel-polyfill';
import ...
cosnt val = Object.assign({ a: '1' }, { a: 'b' });
export default val;
```