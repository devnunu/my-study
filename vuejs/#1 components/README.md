# Vue 컴포넌트

## Vue 컴포넌트란
- 화면에 비춰지는 뷰의 단위를 쪼개어 재활용이 가능한 형태로 관리한느 것이 컴포넌트

![image](https://user-images.githubusercontent.com/20614643/37551784-fd899bca-29ea-11e8-9ee9-3a2cafc5a2ec.png)

## 전역 & 지역 컴포넌트 등록

컴포넌트 뷰 인스턴스에 등록해서 사용할 때 다음과 같이 global하게 등록할 수 있다.
```
Vue.component('my-component', {
    // ...
})
```

local 하게 등록하는 방법은 다음과 같다.
```
var cmp= {
    data: function(){
        return{
            // ...
        }
    }
    template:'<hr>',
    methods: {}
}

// 아래 vue 인스턴스에서만 활용할 수 있는 로컬(지역) 컴포넌트 등록
new Vue({
    components: {
        'my-cmp' : cmp
    }
})
```

**컴포넌트 등록 예제**

template에는 화면에 비추어질 html 요소를 나타낸다.

```
<!DOCTYPE html>
<html>

<head>
    <title>Page Title</title>
</head>

<body>
    <div id="app">
        <button>Parent Component</button>
        <my-component></my-component>
        <my-local-component></my-local-component>
    </div>
    <script src='https://unpkg.com/vue@2.3.3'></script>
    <script>
        // Global Component
        Vue.component('my-component', {
            template: `<div>A global component!</div>`
        })

        new Vue({
            el: '#app'
        })

        // Local Component
        var cmp = {
            template: '<div>A local component!</div>'
        };

        new Vue({
            el: '#app',
            components:{
                // 태그명: 컴포넌트의 내용
                'my-local-component': cmp
            }
        })
    </script>
</body>

</html>
```

## 전역 & 지역 컴포넌트의 차이점

전역 컴포넌트는 작성 후 어디에서나 사용할수 있지만 지역 컴포넌트는 인스턴스 생성후 el에 붙이고 컴포넌트를 명시해 주어야한다.

```

// 로컬 컴포넌트
new Vue({
    el: '#app',
    components: {
        'my-local-compoennt':cmp
    }
})

new Vue({
    el: '#app2',
    components: {
        'my-local-compoennt':cmp
    }
})
```

