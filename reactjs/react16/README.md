# React version 16

react 16 버전에 추가된 기능들을 알아보자

## Fragment

Fragment로 기존에 span이나 div 등으로 둘러서 한까번에 return 해야했던 render 함수를 개별적으로 리턴할 수 있게 되었다.

이를 위해 <Fragment>//contents</Fragment>를 사용하거나, <>//contents</>를 사용하여 태그들을 감싸주면 된다.

Fragment 태그는 html에 랜더링 되지 않으므로 보다 명확한 코드 작업이 가능하다.

```javascript

import React, {Comppnent, Fragment} from 'react';

class Test extends Component {
    render(){
        return (
            <>
                <header/>
                <div/>
                <footer/>
            </>
        )
    }
}

```

## return string

render의 string 값 리턴이 가능하게 업데이트 되었다.

```javascript

import React, {Comppnent, Fragment} from 'react';

class Test extends Component {
    render(){
        return 'hello';
    }
}

class App extends Component {
    render(){
        return (<Fragemnt>
            <Test/>
        </Fragemnt>)
}

```

## portal

portal은 root 리액트 밖에 있는 요소에 접근하게 해준다.

```html

<body>
    <header>
        <h1>Can't touch this</h1>
        <span id="touchme"></span>
    </header>
    <div id="root"></div>
</body>

```

위의 코드는 html 이다. 리액트는 root div 태그 안에서 랜더링 되기때문에 외부에 있는 header 태그의 요소에는 접근하지 못한다. 이때 portal을 사용할 수 있다.

```javascript

import React, Component from 'react';
import { createPortal } from 'react-dom';

class Portals extends Component {
    render(){
        return createPortal(
            <Message />,
            document.getElementById("touchme")
        )
    }
}

const Message = () => "just touched it!";

```

만약 **iframe이거나 html을 변경하지 못할때, 또는 리액트 플러그인을 만들거나 워드프레스일때** 위와 같은 코드를 통해 외부에 접근할수 있다.

## error boundaries

컴포넌트가 컴포넌트 칠드런의 에러를 관리하게 해준다. 중요한건 칠드런 에러에 대해서만 관리가 가능하다는 것이다. 아래의 error maker 코드를 보자.

```javascript
import React, Component from 'react';

class ErrorMaker extends Component{ 
    state = {
        friends:["jim","john","ron","harry"]
    };

    componentDidMout = () => {
        setTimeout(() => {
            this.setState({
                // 일부러 에러를 만든다.
                friends: undefined
            })
        }, 2000)
    }

    render(){
        const { friends } = this.state;
        return friends.map(friend => `${friend}`)
    }
}
```

이 에러는 부모 컴포넌트에서 catch가 가능하다. 이를 통해 에러 처리가 가능하며, 아래와 같이 앱이 죽지 않고, html 메세지 출력이 가능하다.

```javascript

const ErrorFallback = () => 'Sorry something went wrong';

class App extends Component {
    state = { 
        hasError: false
    }

    // 새로운 생애주기 함수
    componentDidCatch = (error, info) => {
        console.log(`catched ${error} the info i have is ${JSON.stringify(info)}`);
        this.setState({hasError : true})
    }

    render(){
        const { hasError } = this.state;
        return (
            <Fragment>
            {hasError ? <ErrorFallback/> : <ErrorMaker /> }
            </Fragment>
        )
    };
}
```

그러나 이러한 코드에는 모든 코드마다 참/거짓이 들어가야한다. 아주 불필요한 코드이므로 아래에서 high order component(hoc)에 대해 알아보자

## high order component

앞서 말했듯이 모든 render 컴포넌트 마다 참/거짓에 의해 분기한다면 상당히 복잡한 코드가 만들어진다. high order component를 사용하면 우리가 사용하려는 코드를 보호 할 수 있다.


```javascript
const BoundaryHOC = ProtectedComponent => class Boundary extends Component {
    state = {
        hasError = false
    }

    componentDidCatch = (error, info) => {
        this.setState({hasError : true})
    }

    render() {
        const { hasError } = this.state;
        if (hasError) {
            return <ErrorFallback />;
        } else {
            return <ProtectedComponent />;
        }
    }
}

```

위와 같이 기본적인 BoundaryHOC 컴포넌트를 만들어준다. 여기에 우리가 미리 사용해봤던 ErrorMaker를 적용해 보자

```javascript
const PErrorMaker = BoundaryHOC(ErrorMaker)

class App extends Component {

    render(){
        const { hasError } = this.state;
        return (<PErrorMaker/>);
    };
}

// HOC로 감싸준다.
export default BoundaryHOC(App);

```

## set state null

set state null는 언제 컴포넌트를 업데이트 할 수 있는지 결정하게 해준다. 다음 예시는 원하지 않으면 업데이트 하지 않는 코드이다.

정확하게 말해서 클릭이 20번 일어날때까지 업데이트 하지 않는 코드이다.

```javascript

const MAX_PIZZAS = 20;

const eatPizza = (state, props) => {
    const { pizzas } = state;
    if(pizzas < MAX_PIZZAS){
        return (
            pizzas: pizzas + 1
        );
    } else {
        return null;
    }
}

class Controlled extends Component {
    state = {
        pizzas:10
    }

    _handleClick = () => {
        this.setState(eatPizza);
    }

    render(){
        const {pizzas} = this.state;
        return <button onClick={this._handleClick}>
        {`I have eaten ${pizzas} ${pizzas === 1 ? "pizza":"pizzas"}`}
        </button>
    }
}
```

코드에서 볼수 있듯이 null을 리턴하면 리액트는 update를 하지 않는다. 이를 통해 조건문으로 state하는 시점을 정할 수 있다.

