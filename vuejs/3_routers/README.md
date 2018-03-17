# Router

## Vue routers

- Vue를 이용한 SPA를 제작할 때 유용한 라우팅 라이브러리
- Vue 코어 라이브러리 외에 Router 라이브러리를 공식 지원하고 있고 아래와 같이 설치한다
```
npm install vue-router
```

- vue 라우터는 기본적으로 RootUrl'/#/'{Router name}의 구조로 되어있다
```
example.com/#/user
```

- 여기서 # 태그값을 제외하고 기본 URL 방식으로 요청 때 마다 index.html를 받아 라우팅을 하려면
```
const router = new VueRouter({
    routes,
    // 아래와 같이 history 모드를 추가해주면 된다.
    mode: 'history'
})
```


## Vue 사용 예제

```
[html]
    <div id="app">
        <h1>Hello vue router!</h1>
        <p>
            <router-link to="/foo">Go to foo</router-link>
            <router-link to="/bar">Go to bar</router-link>
        </p>
        <router-view></router-view>
    </div>

[js]
    var Foo = { template: '<div>foo</div>' }
    var Bar = { template: '<div>bar</div>' }

    var routes = [
        { path: '/foo', component: Foo },
        { path: '/bar', component: Bar },
    ]
    var router = new VueRouter({
        routes
    })
    var app = new Vue({
        router
    }).$mount('#app')
```

## Nested Router

- 라우터로 화면 이동시 Nested Routers를 이용하여 여러개의 컴포넌트를 동시에 랜덜이 할 수 있다.
- 랜더링 되는 컴포넌트의 구조는 가장 큰 상위의 컴포넌트가 하위의 컴포넌트를 포함하는 Parent-child 형태와 같다.

```
<!-- localhost:5000 -->
<div id="app">
    <router-view></router-view>
</div>

<!-- localhost:5000/home -->
<!-- parent component -->
<div>
    <p>Main component rendered</p>
    <!-- child component -->
    <app-header></app-header>
</div>
```

- **example2 참조**

## Template root element 주의 사항

- vue의 template에는 최상위 태그가 1개만 있어야 랜더가 가능하다
- 아래는 template의 html 태그를 정의할때 주의해야 하는 Vue의 성질이다
- 여러 개의 태그를 최상위 태그 레벨에 동시에 위치시킬 수 없음
- 따라서 아래와 같이 최상위 element는 한개만 지정해야 한다.

```
// 에러 발생
var Foo = {
        template: `
        <div>foo</div>
        <router-view><router-view>
        `
}

// 정상
var Foo = {
        template: `
        <div>foo
        <router-view><router-view>
        </div>
        `
}
```

## Named view
- 라우터로 특정 URL로 이동시, 해당 URL에 해당하는 여러개의 view(컴포넌트)를 동시에 랜더링 한다.
- 각 컴포넌트에 해당하는 name 속성과 router-view 지정 필요
```
[html]
<div id="app">
    <router-view name="nestedHeader"></router-view>
    <router-view></router-view>
</div>

[js]
{
    path: '/home',
    // Named Router
    component: {
        nestedHeader: AppHeader,
        default: Body
    }
},
```

## Nested view vs Named view
- 특정 URL에서 1개의 컴포넌트에 여러개의 하위 컴포넌트를 갖는 것을 Nested Routes
- 특정 URL에서 여러개의 컴포넌트를 쪼개진 뷰 단위로 랜더링 하는 것을 Named View

![image](https://user-images.githubusercontent.com/20614643/37552983-795ab772-2a02-11e8-9b6f-54dc3fc9c089.png)

## Vue Resource와 Axios 소개

### Vue Resource

Vue에서 HTTP 통신을 위해 제공하는 플러그인(현재는 공식 지원 중단됨)

```
npm install vue-resource --save
```

위 명령어로 실행하고 다음과 같이 실행한다
```
this.$http.get(url).then(successCallback, failCallback)
```

### Axios
promise 기반의 브라우저와 node를 위한 http 클라이언트
Vue Resource와 비슷함, 공식 github 참조