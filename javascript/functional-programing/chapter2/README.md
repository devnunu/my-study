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