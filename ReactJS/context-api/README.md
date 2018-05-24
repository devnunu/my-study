# content API

이전에는 content 를 사용하는 일이 추천되지 않았다. 이유는 불안정하기 때문. 따라서 기존에는 리덕스와 같은 기술을 사용했으나 context api 가 발전함에 따라 굳이 리덕스를 사용해야 할 이유가 적어졌다.

## stroe 생성

데이터를 저장하고 있는 store 를 생성한다

```javascript
// store.js
import React from 'react';
const Store = React.createContext(null);
export default Store;
```

## 프로바이더 설정

칠드런에게 데이터를 줄수 있는 프로바이더를 생성한다.

```javascript
import React, {Component} from 'react';
import Store from 'store';

class AppContainer extends Component{
    state = {
        message:"Hello"
    }
    render(){
       return(<Store.Provider value={this.state}>
        <AppPresenter>
       </Store.Provider>);
    }
}
```

이로써 AppPresenter 안의 내용들은 스토어에 접근이 가능하다.

## 데이터 가져오기

데이터를 사용하기 위해는 Consumer 를 사용한다.

```javascript
import React, { Component } from 'react';
import Store from 'store';

class Test extends Componet {
  render() {
    return <Store.Consumer>{store => JSON.stringify(store)}</Store.Consumer>;
  }
}
```

Consumer 에게는 child 가 필요할텐데 함수가 아닌 child 는 사용할 수가 없다.
즉, span 이나 div 와 같은 태그는 사용할수 없다는 것이다. 따라서

## 함수 전달

클래스가 생성되었을때 provider 가 value 를 얻기 때문에, provider 에 포함 시킬 함수는 반드시 constructor 에 있어야한다.

```javascript
import React, {Component} from 'react';
import Store from 'store';

class AppContainer extends Component{
    constructor(props){
        super(props)
        this._changeMessage = () => {
            if(this.state.message==="Hello"){
                this.setState({
                    message: "Bye bye"
                })
            } else{
                this.setState({
                    message:"Hello"
                })
            }
        }
        this.state = {
            message:"Hello",
            changeMessage: this._changeMessage
        }
    }

    render(){
       return(<Store.Provider value={this.state}>
        <AppPresenter>
       </Store.Provider>);
    }
}
```
