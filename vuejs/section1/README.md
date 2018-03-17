
# Vue JS

## 개요

- PWA(progresive web app - 최신 웹 앱) 기반 single page app을 제작하기 위한 화면 앞단 라이브러리 vue.js 소개
- vue로 화면을 구성하기 위한 기본적인 개념을 학습하고 샘플을 활용하여 코드 제작
- vue의 주요 구성 요소(component, router, resource, templates)를 학습 및 실습

## vue는 무엇인가

MVVM 패턴의 viewModel 레이어에 해당하는 view 레벨의 라이브러리

![image](https://user-images.githubusercontent.com/20614643/37551609-27b63976-29e6-11e8-9968-e8d974a71f7a.png)

- **데이터 바인딩**과 **화면 단위를 컴포넌트 형태로 제공**, 관련 API를 지원하는데 궁극적인 목적이 있음
- Angular에서 지원하는 2 way data bindings를 동일하게 제공
- 하지만 compnent 간 통신의 기본 골격은 React의 1 way data flow(부모->자식)와 유사
- virtual DOM을 이용한 렌더링 방식이 React와 거의 유사
- 다른 front-end FW(Angular, React)와 비교했을때 훨씬 가볍고 빠름
- 간단한 Vue를 적용하는데 있어도 **러닝 커브가 낮고, 쉽게 접근 가능** (거의 jquery를 사용하는 수준과 비슷)


## Vue
앞서 말한것 처럼 다른 프레임워크 보다 vue는 적용하기가 간편하다
아래의 예제는 vue로 message를 랜더한 것 이다.

```
<!DOCTYPE html>
<html>

<head>
    <title>Page Title</title>
</head>

<body>
    <div id="app">
        {{message}}
    </div>
    <script src='https://unpkg.com/vue@2.3.3'></script>
    <script>
        new Vue({
            el: '#app',
            data: {
                message: 'Hello Vue.js!'
            }
        })
    </script>
</body>
</html>
```

## MVVM 패턴이란?
Backend 로직과 Client의 마크업 & 데이터 표현단을 분리하기 위한 구조로 전통적인 MVC 패턴의 방식에서 기인하였다. 간단하게 생각해서 화면 앞단의 화면 동작 관련 로직과 뒷단의 DB 데이터 처리 및 서버 로직을 분리하고, 뒷단에서 넘어온 데이터를 Model에 담아 View로 넘겨주는 중간 지점이라고 보면 되겠다

![image](https://user-images.githubusercontent.com/20614643/37551694-80865228-29e8-11e8-8256-356c618c0503.png)


## 인스턴스 소개
- Vue.js를 이용하여 UI 화면을 개발하기 위해서는 아래의 절차를 따른다
    - Vue.js 라이브러리를 로딩했을 때 존재하는 Vue 생성자로 인스턴스를 생성해야한다.
```
var vm = new Vue({
    // ...
})
```

- 위를 풀어서 얘기하면 vue 라이브러리 로딩후 접근 가능한 **Vue 라는 기존객체에, 화면에 사용할 옵션(데이터, 속성, 메서드, 등등)을 포함하여 화면의 단위를 생성한다** 라고 보면 되겠다

## 인스턴스 생성

Vue 생성자로 인스턴스를 만드는 방법은 다음과 같다.

```
// vm은 viewModel을 뜻한다. (관행적인 코딩 컨벤션)
var vm = new Vue({
    // option
})
```

vue 객체를 생성할 때 아래와 같이 data, template, el, methods, life cycle callback 등의 options를 포함할 수 있다.

```
var vm = new Vue({
    template: ...,
    el: ...,
    methods: {

    },
    created: {

    }
    // ...
})
```

각 option으로 미리 정의한 vue 객체를 확장하여 재사용이 가능하다. 하지만 아래 방법보다는 template에서 custom element로 작성하는 것이 좋다.
```
var MyComponent = Vue.extends({
    // template, el, methods 와 같은 options의 정의
    template: `<p>Hello {{message}}</p>`,
    data: {
        message: 'Vue'
    }
    // ...
})

// 위에서 정의한 내용(template, data, ...)을 기본으로 하는 컴포넌트 생성
var myComponentInstance = new MyComponent()
```

## Vue 라이프싸이클 소개

Vue 객체가 생성될 떄 아래의 초기화 작업을 수행한다
- 데이터 관찰
- 템플릿 컴파일
- DOM에 객체 연결
- 데이터 변경시 DOM 업데이터

이 초기화 작업 외에도 개발자가 의도하는 커스텀 로직을 아래와 같이 추가할 수 있다.
```
var vm = new Vue({
    data: {
        a:1
    },
    create: function(){
        // this는 vm을 가리킴
        console.log('a is: ', this.a)
    }
})
```

위 외에도 라이프싸이클 단계에 따라 아래 메서드를 사용할 수 있다.

- mounted
- updated
- destroyed

위와 같이 초기화 메서드로 커스텀 로직을 수행하기 때문에 **Vue에서는 따로 Controller를 갖고 있지 않다**

## 라이프 싸이클 훅 커스텀 로직

```
<!DOCTYPE html>
<html>

<head>
    <title>Page Title</title>
</head>

<body>
    <div id="app">
        {{message}}
    </div>
    <script src='https://unpkg.com/vue@2.3.3'></script>
    <script>
        new Vue({
            el: '#app',
            data: {
                message: 'Hello Vue.js!'
            },
            beforeCreate: function() {
                console.log("beforCreate")
            },
            created: function() {
                console.log("created")
            },
            mounted: function() {
                console.log("mounted")
            },
            updated: function() {
                console.log("updated")
            },
        })
    </script>
</body>
</html>
```