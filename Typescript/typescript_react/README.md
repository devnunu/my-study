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

## Component

- 컴포넌트는 크게 2가지이다. stateless 컴포넌트, React.Component를 상속받는 컴포넌트, React.PureComponent를 상속받는 컴포넌트

- state는 컴포넌트 안에서 사용하는 데이터이며, props는 외부에서 주입해 주는 데이터이다. stateless 컴포넌트는 function이다.

1. props
- 컴포넌트 외부에서 컴포넌트로 넣어주는 데이터
- 컴포넌트 내부에서는 자신의 props를 변경할 수 없다.
- 컴포넌트 외부에서 props가 변경되면 render가 호출된다.

2. state
- 컴포넌트 내부의 데이터
- 클래스의 프로퍼티와는 다르다
- 생성자 혹은 프로퍼티 초기 할당으로 state를 초기 할당해 줘야한다.
- 내부에서 변경을 하더라도 setState 함수를 이용해야 render가 호출된다.
- state를 처리하는 방법은 생성자에서 할당 해주거나 클래스 내부에 명시한다.

### 제네릭

```
React.Component<P,S>
```

- 위와 같이 Reac.Component를 상속 받을 때 제네릭으로 2개의 형을 선언한다면, props와 state의 자료형이 강제된다. 빈 props나 state는 {}를 사용한다.

### setState

```
class App extends React.Component < AppProps , AppState > {

  constructor(props:AppProps) {
    super();
    this.state = {
      age : 35
    };
    setInterval(() => {
      this.setState({
        age : this.state.age + 1
      });
    }, 2000);
  }

    ...
}
```

- 일반적으로 setState로 state 값을 변경해야지 render가 virtual dom에 의해 다시 호출된다.

### 인터페이스를 이용한 props와 state의 형 분리

```
interface AppProps {
  name:string
}

interface AppState {
  age:number
}

class App extends React.Component < AppProps , AppState > {
    ...
}
```

- 제네릭 안에 모든 형태를 넣을수 없으므로 위와 같이 인터페이스로 분리하여 작성이 가능하다.


### Stateless Component

```
const StatelessComponent:React.SFC<AppProps> = (props) => {
  return (
    <h2>{props.name}</h2>
  )
}
```

- 내부에 render가 없고 state가 없는 stateless component는 앞에서도 언급했듯이 function이다. 따라서 이와 같이 함수 형식으로 선언을 해주는데, 이때 React.StatelessComponent를 상속 받거나 축약형으로 React.SFC를 상속받아 구현한다.

## Lifecycle

### 컴포넌트 랜더 Lifecycle

- 컴포넌트도 생애 주기가 있으며, 해당 주기에 대응되는 함수들이 있다. 

- 실행 순서는 다음과 같다. constructor -> componentWillMount -> render -> componentDidMount -> (제거시)componentWillUnmount

1. componentWillMount : 컴포넌트가 render 되기 직전 동작하는 함수
2. componentDidMount : 컴포넌트가 render 된 후 동작하는 함수
3. componentWillUnmount : 컴포넌트를 제거할 때 동작하는 함수

- 보통 컴포넌트 랜더 후 동작하는 함수는 conponentDidMount 안에 넣는다. 컴포넌트가 랜더링 된 후 돌아가야하기 때문이다. 

### state, props 변경 Lifecycle

- 컴포넌트 내부에서 state가 변경되거나 컴포넌트 외부에서 props가 변경될 때, 이에 따라 내부 라이프 사이클 함수가 호출된다. 컴포넌트가 랜더 되는 순서와는 다르다.

- 실행 순서는 다음과 같다. componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate

1. componentWillReceiveProps : 새롭게 props가 들어오면 실행되는 함수, 인자로 props의 자료형을 받는다. state가 변경될때는 반응하지 않는다. setState로 변경시 이 이벤트 없이 한번에 변경된다.

2. shouldComponentUpdate : props나 state가 바뀌거나 둘다 동시에 바뀔 때, 일반 컴포넌트에서는 무조건 불린다. 이 함수의 return 값은 boolean이며 false면 아무 render가 일어나지 않는다. true면 render 함수와 다음 lifecycle 함수로 넘어간다. 이 함수의 인자는 props와 state이며 default return 값은 true이다.

3. componentWillUpdate : 컴포넌트가 재 랜더링 되기 전에 불리며 여기서 setState 같은 함수를 사용하면 안된다.

4. componentDidUpdate : 컴포넌트가 랜더링을 마치면 불린다.


```
  componentWillReceiveProps(nextProps: AppProps) {
    console.log(`App componentWillReceiveProps : ${JSON.stringify(nextProps)}`);
  }

  shouldComponentUpdate(nextProps: AppProps, nextState: AppState): boolean {
    console.log(`App shouldComponentUpdate : ${JSON.stringify(nextProps)}, ${JSON.stringify(nextState)}`);
    return true;
  }

  componentWillUpdate(nextProps: AppProps, nextState: AppState) {
    console.log(`App componentWillUpdate : ${JSON.stringify(nextProps)}, ${JSON.stringify(nextState)}`);
  }

  componentDidUpdate(prevProps: AppProps, prevState: AppState) {
    console.log(`App componentDidUpdate : ${JSON.stringify(prevProps)}, ${JSON.stringify(prevState)}`);
  }
```

## 이벤트(Event)

### DOM onclick => JSX onclick

- 이벤트를 넘기려면 JSX에서는 camelCase를 사용해야 한다. 이것이 JSX의 문법이다.

```
constructor(props: AppProps) {
    console.log('App constructor');
    super(props);
    this.state = {
      age: 35
    };
    this._reset = this._reset.bind(this);
  }

  render() {
    console.log('App render');
    return (
      <div>
        <h2>Hello {this.props.name} - {this.state.age}</h2>
        <button onClick={this._reset}>리셋</button>
      </div>
    );
  }

  private _reset(): void {
    this.setState({
      age: 35
    });
  }
```

### defaultProps

- 컴포넌트 내부에 다음과 같이 defaultProps를 선언해 주고 props의 기본 값을 지정해 줄 수 있다. 만약 props가 지정 되지 않았다면 default 값이 사용되며, props가 상위 컴포넌트에서 주입되었을때, 해당 값이 된다.

```
static defaultProps ={
    company : 'studio'
};
```

- stateless 컴포넌트는 다음과 같이 설정해준다

```

// 방법 1
StatelessComponent.defaultProps = {
  company : "Home"
};

// 방법 2
const StatelessComponent:React.SFC<AppProps> = ({name, company ="Home2"}) => {
  return (
    <h2>{name} {company}</h2>
  )
}

```

## 컴포넌트 변경

### 하위 컴포넌트를 변경하기

- 하위 컴포넌트를 변경할때 redux 등을 사용하지 않으면 상당히 복잡한 구조를 가지게 된다. 예를 들어 Grand parent -> parent -> Me -> Child -> Grand Child의 컴포넌트 구조를 가질 때, Grand parent와 같은 레벨에 있는 Button을 클릭하면 Grand Child의 state가 변경된다고 하자. 이 때 props의 전달은 다시 Grand parent -> parent -> Me -> Child -> Grand Child의 순서로 전달 되어져야한다.

### 상위 컴포넌트를 변경하기

- 똑같이 상위 컴포넌트도 Grand parent -> parent -> Me -> Child -> Grand Child의 컴포넌트 구조를 가질 때, Grand parent안에 state를 변경하는 함수를 만든다. 이 함수는 결과적으로 Grand parent와 같은 레벨에 있는 p태그를 변경하는 함수이다. 해당 함수를 props로 내려줘서 Grand child에 전달될 경우, onClick을 통해 Grand child의 컴포넌트를 클릭하면 Grand parent의 p태그가 변경 될수 있다.

- 만약 수만개의 컴포넌트가 이와같이 동작한다고 하면 상당히 복잡한 구조를 가지게 된다. 이것이 리액트의 큰 단점이며, 따라서 redux와 modx가 필요한것이다.

### Refs

- props를 다루지 않고 자식의 어떤 요소를 건드리고 싶을때 사용한다. ref를 사용해서 랜더를 하지 않고 자식 요소를 다룰 수 있다.

### 컴포지션

- "Facebook은 수천개의 컴포넌트에서 React를 사용하며 컴포넌트 상속계층을 사용하는 것이 권장되는 use case를 찾지 못했습니다. 컴포넌트에서 UI이외의 기능을 재사용하고 싶으면, 상속을 이용하지 말고 자바스크립트 모듈로 분리하는 것이 좋다"

- 컴포지션의 기본은 props를 재사용하는 것이다. 즉 아래의 코드와 마찬가지로, props를 사용하여 위치를 잡아주는 것이다. 다시 말해 props로 컴포넌트를 내려준다.

- props는 단일값 이외에도 함수, 컴포넌트까지 전달이 가능하다. 

```
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```



