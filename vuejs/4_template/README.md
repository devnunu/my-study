# Vue Template

## 소개

Vue로 그리는 화면의 요소들, 함수, 데이터 속성을 모두 Template 안에 포함된다.

- Vue는 DOM 요소와 Vue 인스턴스를 매핑할 수 있는 HTML Template를 사용
- Vue는 Template으로 랜더링 할 때 Virtual DOM을 사용하여 DOM 조작을 최소화 하고 렌더링을 꼭 다시 해야만 하는 요소를 계산하여 성능 부하를 최소화
- 원하면 render fucntion을 직접 구현하여 사용할 수 있음


## Arribute

- Attributes: HTML Attributes를 Vue의 변수와 연결할때는 v-bind를 이용

```
<div v-bind:id="dynamicId"></div>
```

## Javascript Expressions

- JS Expressions: {{ }} 안에 다음과 같이 javascript 표현식도 가능하다.

```
// 허용
<div>{{number+1}}</div>
<div>{{message.split('').reverse().join('')}}</div>

// 허용 불가 (분기문이나 연속 연산 등)
<div>{{ if (ok) {return message }}}</div> 
```

## Directive

- Directive : v- 접두사를 붙인 attributes로, javascript 표현식으로 값을 나타내는게 일반적이다. :을 붙여 인자를 받아 취급할 수 있다.

```
// seen 값이 true 이면 보임
<p v-if="seen">Now You see me </p>

// url 값이 선언되어있으면 url 값과 매핑
<a v-bind:href="url"></a>

// click 이라는 이벤트를 받아 vue에 넘겨준다. "doSomething" 실행
<a v-on:click="doSomething"></a>
```

## Filter

- Filters: 화면에 표시되는 텍스트의 형식을 편하게 바꿀수 있도록 고안된 기능이며, |를 이용하여 여러 개의 필터를 적용할 수 있다.

```
// 첫글자를 대문자로 변경한다
{{ message | capitalize}}

new Vue({
    filters: {
        capitalize: function(value) {
            if(!value) return ''
            value = value.toString()
            return value.chatAt(0).toUpperCase() + value.slice(1)
        }
    }
})

```