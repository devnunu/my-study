# parcel

## 개요

웹 팩을 사용하는 경우 사소한 변경을 위해 eject 후 웹 팩의 설정 파일을 건드려야한다. 문제는 웹팩이 너무 복잡해졌다는 것. 
작은 프로젝트를 할때 웹팩을 사용하면 설정에 많은 시간을 날릴수 있다. 
클라이언트나 스타트업을 위한 큰 프로젝트를 한다면 웹팩이 좋다. 
그러나 빠르고 작은 프로젝트를 위해서는 파셀을 추천하다. 
이유는 설정에 드는 비용이 제로이기 때문이다.

## 세팅

- 파셀 파일 글로벌 설치
```
yarn global add parcel-bundler
npm install -g parcel-bundler
```

- 프로젝트 폴더에서 npm init을 실행한다.
```
npm init
```

## 진입점(entry point) 설정

parcel은 어떤 유형의 파일이라도 진입점으로 설정이 가능하다.
그러나 공식 홈페이지에서는 html이나 javascript를 추천하고있다.

예를 들어서 index.js와 index.html 파일을 만들어 보자

```javascript
console.log('hello world!')
```

```html
<html>
<body>
  <script src="./index.js"></script>
</body>
</html>
```

이로써 아래와 같이 parcel의 진입점만 설정하면 된다

```
parcel index.html
```

## 포트 설정

parcel 명령어를 사용하여 진입점을 실행시키면 기본포트인 1234 포트가 활성화된다.
다음의 명령어를 통해 포트 번호를 변경할 수 있다.

```
-p <port number>
```

또한 watch 기능 사용도 가능하다

```
parcel watch index.html
```

## 에셋(asset)

parcel은 에셋을 기반으로 한다. 에셋은 어떤 파일로든 표현이 될 수 있지만,
parcel은 html, css, javascript와 같은 특정 유형의 에셋을 특별지원한다.
parcel은 이 유형들의 참조에서 자동으로 의존성을 분석하고 출력 번들에 포함한다.
만약 다른 유형의 번들을 import 했다면, 자식 번들이 만들어지고 부모 번들에게 참조를 남긴다.


### 자바스크립트(javascript)

웹 번들러에게 있어서 가장 전통적인 유형의 파일이다. 파일 임포팅을 위해 parcel은 commonJS와 ES6 모두 지원한다.
또한 비동기적인 모듈 로드를 위해 다이나믹 import()를 지원한다.
```javascript
// CommonJS 구문으로 모듈 임포트
const dep = require('./path/to/dep');

// ES6 import 구문으로 모듈 임포트
import dep from './path/to/dep';
```

javascript 파일에 javascript가 아닌 에셋(ex) css, img 등)도 임포트가 가능하다.
이런 파일을 임포트 할때는 다른 번들러처럼 인라인화 되지 않는다.
대신 그 파일의 모든 의존 항목과 함께 별도의 번들(예로 CSS 파일)속에 위치하게 된다.
CSS Modules을 사용할 시, 추출 된 클래스들은 JavaScript 번들에 위치한다.
다른 에셋유형은 출력파일에 대한 url을 javascript 번들에게 보낸다.

```javascript
// CSS 파일 임포트
import './test.css';

// CSS modules로 CSS 파일 임포트
import classNames from './test.css';

// 이미지 파일의 URL을 임포트
import imageURL from './test.png';
```

만약 파일을 참조 URL이 아닌 인라인으로 JavaScript 번들에 포함시키고 싶다면, Node.js의 fs.readFileSync API를 사용하면 된다.

```javascript
import fs from 'fs';

// 내용을 문자열 값으로 읽습니다.
const string = fs.readFileSync(__dirname + '/test.txt', 'utf8');

// 내용을 버퍼로 읽습니다.
const buffer = fs.readFileSync(__dirname + '/test.png');
```

### css

CSS 애셋은 JavaScript나 HTML 파일로부터 임포트 될 수 있다. 
CSS애셋에는 @import 구문을 통해 참조되는 의존성과 url() 함수를 통해 참조되는 이미지, 폰트등이 포함될 수 있다.
@import된 다른 CSS 파일은 동일한 CSS 번들에 인라인으로 포함됩니다. url()참조는 그것들의 출력 파일 이름으로 재작성 된다. 
모든 파일 이름은 현재 CSS 파일과 관련 있어야 한다.

```css
/* 다른 CSS 파일 임포트 */
@import './other.css';

.test {
  /* 이미지 파일 참조 */
  background: url('./images/background.png');
}

```

### SCSS

SCSS를 컴파일 하기 위해서는 node-sass 모듈이 필요하다.

```
npm install node-sass
```

node-sass를 설치했다면 이제 SCSS 파일을 JavaScript 파일에서 import 할 수 있다.

```javascript
import './custom.scss'
```

## 변환(transform)

- Babel을 사용하는 JavaScript
- PostCSS을 사용하는 CSS
- PostHTML을 사용하는 HTML
위의 항목들에 대해 변환이 가능하다. . Parcel은 모듈 안에서 설정 파일(예: .babelrc, .postcssrc)을 발견했을 때 자동으로 이 변환을 실행한다.

## 레시피

### React 설정

```
npm install --save react
npm install --save react-dom
npm install --save-dev parcel-bundler
```

```
// package.json
"scripts": {
  "start": "parcel index.html"
}
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

```json
"script": {
    "start": "parcel index.html"
  }
```