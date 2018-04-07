# 컬렉션 중심 프로그래밍

- 컬렉션 중심 프로그래밍은 말그대로 컬렉션을 다루는 프로그래밍이다. 컬렉션은 배열이나 순환 가능한 자료형을 말한다. 컬렉션 중심 프로그래밍은 함수형 프로그래밍에서 더욱 빛을 발하며, 실무적으로 뗄레야 뗄수 없는 기법중 하나이다.

- 컬렉션 중심 프로그래밍에서는 수집하기, 거르기, 찾아내기 접기를 사용하며 각각 map, filter,find, reduce가 대표함수들이다. 대표 함수인 이유는 추상화 레벨이 높기 때문이며, 같은 카테고리의 다른 함수들을 만들수 있는 중심 요소가 된다. 다시말해 이들은 **특화함수** 라고 할 수 있다.

- 우리는 아래의 users를 가지고 함수를 테스트 할 것이다.

```javascript
var users = [
    { id: 10, name: 'ID', age: 36 },
    { id: 20, name: 'BJ', age: 32 },
    { id: 30, name: 'JM', age: 32 },
    { id: 40, name: 'PJ', age: 27 },
    { id: 50, name: 'HA', age: 25 },
    { id: 60, name: 'JE', age: 26 },
    { id: 70, name: 'JI', age: 31 },
    { id: 80, name: 'MP', age: 23 },
    { id: 90, name: 'FP', age: 13 },
];
```

---

## 수집하기 - map, value, pluck

### map

map은 우리가 이전에 만들었듯이, 인자값과 함수를 통해 mapping되는 값을 가져오는 함수이다.

```javascript
console.log(
    _map(users, function (user) {
        return user.name;
    })
)

```

### values

values는 key/value 쌍으로 되어있는 데이터 형에서 value를 꺼내오는 함수이다.

```javascript
function _values(data) {
    return _map(data, function (val) { return val; });
}

// [20, 'BJ', 32]
console.log(_values(user[1]));
```

더 나아가 values는 identity라는 함수로 만들어 질 수도 있다. identity의 코드는 다음과 같다.

```javascript
function _identity(val) {
    return val;
}
```

들어온 인자를 리턴하므로 상당히 쓸모 없어 보이는 함수 일수도 있지만 자세히보면 _values에 있는 보조 함수와 동일한 기능을 하고있다.
따라서 다음과 같이 코드를 수정할 수 있다.

```javascript
function _identity(val) {
    return val;
}

function _values(data) {
    return _map(data, _identity);
}
```

또한 발동하는 시점을 정할수 있다는 것을 이용하여 다음과 같이 더욱 간단하게 선언할 수도 있다

```javascript
var _values = _map(_identity);

// [20, 'BJ', 32]
console.log(_values(user[1]));
```


### pluck

pluck는 배열 내부의 객체에서 인자로 전달된 key에 대응되는 value를 수집하는 함수이다.

```javascript

function _pluck(data, key) {
    return _map(data, function (obj) {
        return obj[key];
    });
}

// [36, 32, 32, 27, 25...]
console.log(_pluck(users, 'age'));

```

이 또한 이미 만들어놓은 _get 함수로 부분 대체가 가능하다

```javascript
function _pluck(data, key) {
    return _map(data, _get);
}
```

결론적으로 수집하기 유형의 함수들은 _map을 기반으로 생성이 가능하다는 것이다.

---

## 거르기 - reject, compact

### reject

reject는 filter와 다르게 true로 평가되는 항목들을 제외시킨다.
reject 내부에서 filter 함수를 사용하는데 이에 해당하는 결과값을 반대로 돌려주기만 하면 된다.
filter에 전달되는 보조 함수를 변경해도 되지만 reject를 사용함으로써 보다 선언적인 사용이 가능하다.

```javascript
// reject
function _reject(data, predi) {
    return _filter(data, function(val) {
        return !predi(val);
    });
}
```

우리가 values에서 identity를 사용했듯이 reject에서도 nagate라는 함수를 사용하여 최적화를 할 수 있다. negate란 함수를 인자로 받아 반대의 bool 값을 리턴한다.

```javascript
function _negate(func) {
    return function() {
        return !func(val);
    }
}

function _reject(data, predi) {
    return _filter(data, _negate(predi);
}
```

### compact

compact는 인자로 들어온 값 중에서 긍정적인 값만 남기는 함수이다.

```javascript
var _compact = _filter(_identity);

console.log(
    _compact([1, 2, 0, false, null, {}])
)
```

---

## 찾아내기 - find, find_index, some, every

### find

find 함수는 데이터를 순환하면서 만나는 가장 처음 target을 리턴하는 함수이다. 예제는 다음과 같다.

```javascript
function _find(list, predi) {
    var keys = _keys(list);
    for (var i = 0, len = keys.length; i < len; i++) {
        var val = list[keys[i]]
        if (predi(val)) return predi(val);
    }
}

// { id: 40, name: 'PJ', age: 27 },
console.log(_find(users, function (user) {
    return user.age < 30;
}))
```

### find_index

find_index는 이름 그대로 index를 리턴한다. 위에서 작성한 find 함수를 인덱스로 바꾸어 간단하게 리턴 하면 된다.
즉, find는 value를, find_index는 index를 리턴하게 된다.

```javascript
function _find(list, predi) {
    var keys = _keys(list);
    for (var i = 0, len = keys.length; i < len; i++) {
        if (predi(list[keys[i]])) return i;
    }
}

// { id: 40, name: 'PJ', age: 27 },
console.log(_find(users, function (user) {
    return user.age < 30;
}))
```

### some

some은 인자로 전달된 보조 함수의 조건을 1개라도 만족하면 true가 출력된다. 이를 위해 find_index를 사용하여 해당 조건을 만족하는 인자를 찾는다.

```javascript
// some
function _some(data, predi){
    return _find_index(data, predi) != -1;
}

console.log(_some([1, 2, 5, 10, 20], function (val) {
    return val % 10;
}))
```

이를 더욱 발전시켜, predicate 보조 함수가 없더라도 indentity 함수가 자동으로 동작하도록 만들어야한다.

```javascript
function _some(data, predi){
    return _find_index(data, predi || _identity) != -1;
}
```

### every

some과 반대로 every는 인자로 전달된 보조 함수의 조건을 모두 만족해야만 true가 출력된다. every도 간단하게 negate 함수를 사용해 값을 반대로 바꾸어주고 find index 함수를 거쳐 결과값을 받는다.

```javascript
function _every(data, predi) {
    return _find_index(data, _negate(predi)) == -1;
}
```

every도 predi가 없을떄 기본 함수를 설정할 수 있다.

```javascript
function _every(data, predi) {
    return _find_index(data, _negate(predi || _identity)) == -1;
}
```