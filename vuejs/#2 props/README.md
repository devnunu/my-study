# Props

## 상-하위 컴포넌트 간 데이터 전달방법

부모자식 컴포넌트 관계
- 구조상 상-하 관계에 있는 컴포넌트의 통신은
    - 부모 -> 자식 : props down
    - 자식 -> 부모: events up

![image](https://user-images.githubusercontent.com/20614643/37552157-bd31563c-29f2-11e8-9806-731bade3abf2.png)

## Props 소개

- 모든 컴포넌트는 각 컴포넌트 자체의 스코프를 가진다
    - ex) 하위 컴포넌트가 상위 컴포넌트의 값을 바로 참조할 수 없는 형식
- **상위에서 하위로 값을 전달하려면 props 속성을 사용한다.**

## props 설명

주의 할점: js에서 props 변수 명명을 카멜 케이스로 하면 html에서 접근은 케밥 케이스(-)로 가야한다.(자동적으로 변경됨)

```
[vue]
Vue.component('child-component', {
    props: ['passedData'],
    template: '<p>{{passedData}}</p>'
});

var app = new Vue({
    el:'#app',
    data: {
        message: 'Hello Vue! from Parent Component',
    }
});

[html]
<div id='app'>
    <child-component v-bind:passed-data='message'><child-component>
</div>
```

## Non Parent - Child 컴포넌트 간 통신

**같은 레벨의 컴포넌트 간 통신** 
동일한 상위 컴포넌트를 가진 2개의 하위 컴포넌트간 통신은
- child -> parent -> 다시 2개의 children

![image](https://user-images.githubusercontent.com/20614643/37552239-88877fe0-29f4-11e8-9f94-c400a8cea1ec.png)

컴포넌트 간의 직접적인 통신은 불가능하도록 되어 있는게 Vue의 기본 구조

## Event Bus

**Event Bus - 컴포넌트 간 통신**

Non Parent - child 컴포넌트간의 통신을 위해서 Event Bus를 활용할 수 있다.
- Event Bus를 위해 새로운 Vue를 생성하여 아래와 같이 Vue Root Instance가 위치한 파일에 등록
- 다만 Event Bus를 사용한다면 같은 레벨 컴포넌트에 대한 관계 정립이 되지 않는다. 따라서 이를 해결 하기 위해 vuex를 사용한다.

```
// Vue root insatance 전에 꼭 등록 순서가 중요.
export const eventBus = new Vue();
new Vue({
    // ...
})
```

### 이벤트 발생

- 이벤트를 발생시킬 컴포넌트에 eventBus import 후 $emit으로 이벤트 발생

```
import {eventBus} from '../../main';
eventBus.$emit('refresh', 10);
```

### 이벤트 수신

- 해당 이벤트를 받을 컴포넌트에도 동일하게 import 후 콜백으로 수신

```
import {eventBus} from '../../main';

// 등록 위치는 해당 컴포넌트의 created 메서드에 등록
created() {
    eventBus.$on('refresh', function(data){ 
        console.log(data) // 10
    });
}
```

### v-for
vue 고유의 api, props 등을 순회하며 반복되는 값을 처리할수 있다
이 때 빠른 랜더링을 위해 key 값을 설정해줘야한다.

```
[html]
<div id="app">
    <todo-item v-bind:todo="todo" v-for="todo in Todos" :key="todo-id"></todo-item>
</div>

[js]
Vue.component('todo-item',{ 
            props: ['todo'],
            template:'<p>{{todo.text}}</p>'
})

var app = new Vue({
    el:'#app',
    data:{
        Todos:[
            {id: 0, text: 'Learn Vue.js'},
            {id: 1, text: 'Learn Components'},
            {id: 2, text: 'Learn Props'},
            {id: 3, text: 'Learn For Loop'}
        ]
    }
})
```