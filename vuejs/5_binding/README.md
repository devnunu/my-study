# Data Binding

## 소개

- DOM 기반 HTML Template에 Vue 데이터를 바인딩 하는 방법은 아래와 같이 크게 3가지가 있다
    - interpolation(값 대입)
    - Binding Expressions(값 연결)
    - Directives(디렉티브 사용)

## interpolation

- vue의 가장 기본적인 데이터 바인딩 체계는 Mustache {{}}를 따른다

```
<span>Message: {{msg}}</span>

// msg가 한번 들어가면, js상에서 변화되어도 바뀌지 않는다(불변)
// 로딩할때의 값으로 고정
<span>this will never change: {{*msg}}</span>

<div id="item-{{id}}"><div>
```

## Binding Expression(값 연결)

- {{}}를 이용한 데이터 바인딩을 할 때 자바스크립트 표현식을 사용할 수 있다.

```
// seen 값이 true 이면 보임
<p v-if="seen">Now You see me </p>

// url 값이 선언되어있으면 url 값과 매핑
<a v-bind:href="url"></a>

// click 이라는 이벤트를 받아 vue에 넘겨준다. "doSomething" 실행
<a v-on:click="doSomething"></a>
```

- Vue에 내장된 filter를 {{}}안에 사용할 수 있다. 여러개 필터 체인 가능

```
{{message | capitalize}}
{{message | capitalize | upcapitalize}}
```

## Directive

- vue에서 제공하는 특별한 Attribute 이며 -v의 접두사를 갖는다
- 자바스크립트 표현식, filter 모두 적용된다.

```
// login의 결과에 따라 p가 존재 또는 미 존재
<p v-if="login">Hello!</p>

// click = {{doSomething}}와 같은 역할
<a v-on:click="doSomething">
```

## class Binding

- css 스타일링을 위해서 class를 아래 2가지 방법으로 추가가 가능하다.
    - class="{{className}}"
    - v-bind:class

- 주의할 점은 위의 두 방법을 함께 사용하지 않고 한가지만 적용해야 에러를 미연에 방지할 수 있다.

- 아래와 같이 class 속성과 v-bind:class 속성을 동시에 사용해도 된다.

```
<div class="static v-bind:class="{'class-a':isA,'class-b':isB}"></div>
<script>
    data: {
        isA:true,
        isB:false,
    }
</script>
```

- 위 결과 값은

```
<div class="static class-a"></div>
```

- 아래와 같이 Array 구문도 사용할 수 있다.

```
<div v-bind:class="classA,classB"/>
<script>
    data: {
        classA: 'class-a',
        classB: 'class-b'
    }
</script>
```