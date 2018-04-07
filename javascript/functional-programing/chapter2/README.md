# 함수형으로 전환하기

아래의 예제를 통해 기존의 코딩 방법에서 함수형 프로그래밍으로 전환 하는 방법에 대해 알아보자

## 회원 목록, map filter


### 명령형 코드

다음은 조건에 따른 일반적 코드 서술 방법이다

```javascript
// 1. 명령형 코드
// 1. 30세 이상인 users를 거른다.
var temp_users = [];
for (var i = 0; i < users.length; i++) {
    if (users[i].age >= 30) {
        temp_users.push(users[i]);
    }
}
console.log(temp_users);

// 2. 30세 이상인 users의 names를 수집한다.
var names = [];
for (var i = 0; i < temp_users.length; i++) {
    names.push(temp_users[i].name);
}
console.log(names);

// 3. 30세 미만인 users를 거른다.
var temp_users = [];
for (var i = 0; i < users.length; i++) {
    if (users[i].age < 30) {
        temp_users.push(users[i]);
    }
}
console.log(temp_users);

// 4. 30세 미만인 users의 ages를 수집한다.
var ages = [];
for (var i = 0; i < temp_users.length; i++) {
    names.push(temp_users[i].age);
}
console.log(ages);

```

위의 코드는 일반적인 명령형 코드이다.


### 함수형 프로그래밍

우선 1번과 3번의 코드는 중복되는 형식을 제거하여 변경해보겠다.

```javascript
// 2. _filter, _map으로 리팩토링.
function _filter(users, predi) {
    // 인자를 조작하지 않고 필터링 된 새로운 값을 만든다
    var new_list = [];
    for (var i = 0; i < users.length; i++) {
        // 함수에게 위임함
        if (predi(users[i])) {
            new_list.push(users[i]);
        }
    }
    return new_list;
}

console.log(
    _filter(users, function (user) { return user.age >= 30; })
)

console.log(
    _filter(users, function (user) { return user.age < 30; })
)

```

위와 같이 하나의 함수를 인자로 받아, 원하는 시점에 함수가 알고있는 값에 적용시키는 프로그래밍 기법을
**응용(적용)형 프로그래밍**이라고 하며, 이 함수를 **응용(적용)형 함수**라고한다.

또한 함수를 인자로 받거나 함수안에서 인자로 받은 함수를 실행하는 것을 **고차함수**라고한다.

이 필터함수가 가지고 있는 의의는, 중복을 제거하는 것 뿐만아니라, 다른 로직을 가지고 있는 함수를 넣음으로써
보다 넓은 범위로 사용될수 있다는 것이다. 그 예는 아래 코드와 같다.

```javascript
console.log(
    _filter([1, 2, 3, 4], function (num) { return num % 2; })
)

console.log(
    _filter([1, 2, 3, 4], function (num) { return !(num % 2); })
)
```

이는 users와 상관없는 값들도 filtering 할수 있게 된 것이다. 따라서 다형성과 재활용성이 높아졌다고 할 수 있다.


---------

다음은 2, 3번 코드에 중복을 제거하여 함수형 프로그램으로 만들어 보자
예제는 다음과 같다

```javascript
var over_30 =_filter(users, function (user) { return user.age >= 30; });
var under_30 =_filter(users, function (user) { return user.age < 30; });

function _map(list, mapper) {
    var new_list = [];
    for (var i = 0; i < list.length; i++) {
        new_list.push(mapper(list[i]));
    }
    return new_list;
}
var names = _map(over_30, function(user){
    return user.name;
});

var age = _map(under_30, function(user){
    return user.age;
});

console.log(names)
console.log(age)

```

이번 코드도 마찬가지로 정상동작은 물론 users만 사용하지 않게 됨으로써 재사용성이 높아졌다.

### 변수의 지양

참고로 함수형 프로그래밍에는 중첩, 대입문을 지양하는 편이다.
왜냐하면 함수를 중첩함으로써 값을 만들어나가는 패러다임이기 때문이다.
값의 변동이 없기 떄문에 안정성이 높고 테스트하기가 쉬워진다.
그 예는 다음과 같다.

```javascript
console.log(
    _map(
        _filter(users, function (user) { return user.age >= 30; }),
        function (user) { return user.name; }
    )
)

console.log(
    _map(
        _filter(users, function (user) { return user.age < 30; }),
        function (user) { return user.name; }
    )
)
```

## Each

Each 함수는 list를 받고 iter 함수를 동작시킨다.

```javascript
function _each(list, iter) {
    for (var i = 0; i < list.length; i++) {
        iter(list[i]);
    }
    return list;
}
```

단순히 iterator 함수를 돌면서 값들을 인자 함수에 넣어주는데, 이를 통해 map과 filter를 단순화 시킬수 있다.

```javascript
function _filter(users, predi) {
    var new_list = [];
    for (var i = 0; i < users.length; i++) {
        if (predi(users[i])) {
            new_list.push(users[i]);
        }
    }
    return new_list;
}

function _map(list, mapper) {
    var new_list = [];
    for (var i = 0; i < list.length; i++) {
        new_list.push(mapper(list[i]));
    }
    return new_list;
}
```

이로써 간결하고 짧으며, 직관적인 코드가 완성되었다.

## 다형성

이미 자바스크립트에는 다음과 같이 map과 filter가 구현되있다.

```javascript
[1, 2, 3].map(function (vale) {
    return val * 2;
})

[1, 2, 3, 4].filter(function (vale) {
    return val % 2;
})
```

그러나 정확하게 말하면 이는 함수가 아닌 **메서드**이다.
메서드는 순수 함수가 아니고 객체의 상태에 따라 결과가 달라진다.

따라서 우리가 만든 순수 함수와는 몇가지 차이점이 있다.

### 순수 함수와 메서드와의 차이

우리가 지금까지 만든 함수들에 배열만 사용할수 있지 않을까 라는 생각이 들겠지만, js에서는 Array like 객체가 있다. 가장 대표적인 Array like 객체는 jquery나 dom 객체이다.

```javascript
// 바닐라 js
document.querySelectorAll('*');
```

예를 들어 위와 같이 읿력했을떄 반환 되는 값이 있다. 콘솔 출력시 이는 배열처럼 보이지만 사실 Array like 객체이다. 떄문에 아래와 같은 코드는 실행이 불가능하다. 이 때문에 다형성을 지원하기 어렵게 된다.

```javascript
// Array like(Node list)
document.querySelectorAll('*').map(function(node){
    return node.nodeName;
});
```

이에 반해 함수형 프로그래밍은 함수 기반이기 떄문에 굉장히 유연한 프로그래밍이 가능하며 다형성을 지원한다. 실제로 함수 내부에서는 아무 처리도 하지 않았음에도 실행이 가능하다.

```javascript
_map(document.querySelectorAll('*'),function(node){
    return node.nodeName;
});
```

또한 이를 데이터가 먼저 나오는 프로그래밍 vs 함수가 먼저 나오는 프로그래밍의 관점으로 볼 수도 있는데, 데이터가 먼저 나오는 상황에서는 데이터가 있어서 메서드가 생긴다. 따라서 객체지향은 평가의 순서가 굉장히 중요하다.

그러나 함수는 혼자 먼저 존재하므로 데이터가 생성되지 않더라도 평가 시점이 상대적으로 훨씬 유연하다. 이것을 이용하여 조합성을 높일수 있다. 조합성을 높이는 방법에 대해서는 계속해서 알아보도록 한다.

## 내부 다형성

우리는 _filter, _each, _map에 대응하는 predi, iter, mapper 함수를 인자로 받았다. 이렇게 인자로 받는 함수들을 우리는 쉽게 **'콜백 함수'**라고 부르곤한다. 그러나 함수형 프로그래밍에서는 인자로 들어가는 함수는 다양한 이름을 가지고 있다. 콜백함수는 모든 일을 다 처리하고 값을 돌려줄때만 사용하도록 하자. 보조 함수의 예제는 다음과 같다.

- predicate : 조건을 리턴하는 함수
- iterator: 돌면서 반복적으로 실행되는 함수
- mapper: 두 인자 값을 매핑하는 함수

```javascript
// 
_map([1,2,3,4], function(v){
    return v + 10;
})
```

Array거나 Array like이거나 동일하게 연산을 수행하는 것은 외부 함수의 다형성이 좌우하지만, 배열안에 값이 어떤 값이든 같은 연산을 수행할 수 있도록 만드는 역할은 보조함수가 담당한다. 따라서 이를 내부 다형성이라고한다.

다시 말하자면 개발자가 넘기는 값과, 값에 대한 이해를 바탕으로 짜여진 함수에 의해 연산이 결정되게 되는것이다. 따라서 외부 함수는 내부 함수를 들여다 볼 필요가 없다.

## 커링, curry, curryr

커링은 함수와 인자를 다루는 기법이다. 함수에 인자를 적용해 나가다가 필요한 인자가 모두 채워지면 함수 본체를 실행하는 기법이다. 자바스크립트에서는 커링이 지원되지 않지만, 일급함수를 지원하며 평가시점을 마음에대로 조작할수 있으므로 커링과 같은 기법을 구현할 수 있다. 이는 클로저와 비슷한 기법으로 작성이 가능하다.

```javascript
// 커링
function _curry(fn) {
    return function (a) {
        return function (b) {
            return fn(a, b);
        }
    }
}
```

이번에는 curry 함수를 어떻게 상용하는지 알아보자
우선 아래의 예제코드를 확인해본다

### 더하기

```javascript
// 일반적인 함수
var add = function (a, b) {
    return a + b;
}

console.log(add(10, 5));

// _curry함수
var add = _curry(function (a, b) {
    return a + b;
})

var add10 = add(10);
console.log(add10(5));

```

이런식으로 시점에 따라서 결과값을 조작하게 프로그래밍이 가능하다. 이는 이전에 보았던 add maker 함수와 비슷한 맥락이다. 결국에는 본체함수를 인자로 받아 원하는 시점까지 미뤄두다 평가하는 기법이다.

다만 아래와 같이 인자가 두개 동시에 들어오게 된다면 처리하지 못하게된다.

```javascript 
    add(10, 5);
```

따라서 인자가 2개가 동시에 들어오게 된다면 즉시 실행하는 구문을 사용함으로써 함수의 유연성을 높일 수 있다.

```javascript
// 인자가 2개일 떄 _curry
function _curry(fn) {
    return function (a, b) {
        if (arguments.length == 2) return fn(a, b);
        return function (b) {
            return fn(a, b);
        }
    }
}

// 3항 연산자로 한단계 더 개선
function _curry(fn) {
    return function (a, b) {
        return arguments.length == 2 ?
            fn(a, b) : function (b) { return fn(a, b); };
    }
}
```

### 뺴기

이번엔 다른 예를 보도록 하자. 커링을 이용해 빼기를 하는 예제이다

```javascript
var sub = _curry(function (a, b) {
    return a - b;
})

console.log(sub(10, 5));

var sub10 = sub(10);
console.log(sub10(5))
```

별 무리 없이 작동하지만 사실 표현에 있어서 썩 매끄러운 코드는 아니다.
sub10이라는 함수가 되었다는 것은 들어오는 인자 5에 sub10을 적용하는 것인데, 이는 5 - 10을 나타낸다. 이러한 부분의 표현을 위해서 curry를 반대로 수행하는 curryr(curry right)를 만들어본다.

```javascript
// curryr
function _curryr() {
    return function (a, b) {
        return arguments.length == 2 ? fn(a, b) : function (b) { return fn(b, a); };
    }
}
```

이는 curry와 별반 다르지 않다. 차이점은 인자가 동시에 들어오지 않을떄 반대로 fn에 인자를 넣어주면 된다.

## get

이번에는 get이라는 간단하지만 유용한 함수를 만들어 본다. get은 객체에 값을 안전하게 참조할 수 있다. get은 object와 원하는 키를 받아서 리턴을 하면서 object에 키로 접근해서 결과를 전달한다.

그러나 만약 object가 null이면 undefined을 리턴하도록 한다. 이는 key로 접근하기 애매한 경우 에러가 나지 않아야 하기 때문이다.

```javascript
function _get(obj, key) {
    return obj == null ? undefined : obj[key];
}
```

get의 사용방법은 다음과 같다.

```javascript
var user1 = users[0];
console.log(user1.name);
console.log(_get(user1,'name'));
```

이번에는 조금 더 발전된 get을 만들어본다. 바로 curry함수를 사용하는 것이다.

```javascript
var _get = _curryr(function (obj, key) {
    return obj == null ? undefined : obj[key];
});

var get_name = _get('name');

console.log(get_name(user1));
console.log(get_name(users[3]));
console.log(get_name(users[4]));
```

이렇게 작성하면 위와 같이 특정한 값을 넣어 동일한 key 값에 대한 리턴을 받을수 있게 된다.
더욱 나아가, map과 filter 또한 간결하게 작성이 가능하다.

```javascript
_map( _filter(users, function(user){ return user.age >= 30;}), _get('name'));

_map( _filter(users, function(user){ return user.age >= 30;}), _get('age'));
```

## Reduce

- reduce라는 이름 그래도 '축약'을 위해 사용된다.
- reduce는 인자로 들어온 함수를 모든 결과 값에 누적하여 적용하기 위해 사용한다.
- 또한 원래 인자로 들어온 자료형과 다른 결과값을 리턴한다.
- reduce는 어려운 로직을 단순화 시켜준다.

```javascript
// reduce
function _reduece(list, iter, memo) {
    _each(list, function (val) {
        memo = iter(memo, val);
    })
    return memo;
}

_reduece([1, 2, 3], function (a, b) {
    return a + b;
}, 0)
```

더 나아가서 3번쨰 인자가 들어오지 않았을때 기본값으로 동작하도록 설정을 추가하자

```javascript
function _reduece(list, iter, memo) {
    if (arguments.length == 2) {
        memo = list[0];
        list = list.slice(1);
    }
    _each(list, function (val) {
        memo = iter(memo, val);
    })
    return memo;
}
```

그러나 위의 코드에는 slice가 추가되었다. slice는 배열에만 사용할 수 있으므로 다음과 같은 코드로 변경 하도록 하자. 이를 위해 데이터를 자르는 _rest 함수를 추가한다.

```javascript
var slice = Array.prototype.slice;
function _rest(list, num) {
    return slice.call(list, num || 1);
}

function _reduece(list, iter, memo) {
    if (arguments.length == 2) {
        memo = list[0];
        list = _rest(list);
    }
    _each(list, function (val) {
        memo = iter(memo, val);
    })
    return memo;
}

```