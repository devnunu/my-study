var users = [
    { id: 1, name: 'ID', age: 36 },
    { id: 2, name: 'BJ', age: 32 },
    { id: 3, name: 'JM', age: 32 },
    { id: 4, name: 'PJ', age: 27 },
    { id: 5, name: 'HA', age: 25 },
    { id: 6, name: 'JE', age: 26 },
    { id: 7, name: 'JI', age: 31 },
    { id: 8, name: 'MP', age: 23 },
]

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

console.log(
    _filter([1, 2, 3, 4], function (num) { return num % 2; })
)

console.log(
    _filter([1, 2, 3, 4], function (num) { return !(num % 2); })
)


var over_30 = _filter(users, function (user) { return user.age >= 30; });
var under_30 = _filter(users, function (user) { return user.age < 30; });

function _map(list, mapper) {
    var new_list = [];
    for (var i = 0; i < list.length; i++) {
        new_list.push(mapper(list[i]));
    }
    return new_list;
}
var names = _map(over_30, function (user) {
    return user.name;
});

var age = _map(under_30, function (user) {
    return user.age;
});

console.log(names)
console.log(age)

_map(
    _filter(users, function (user) { return user.age >= 30; }),
    function (user) { return user.name; }
)

function _each(list, iter) {
    for (var i = 0; i < list.length; i++) {
        iter(list[i]);
    }
    return list;
}

// 개선된 버전

function _filter(users, predi) {
    var new_list = [];
    _each(list, function (val) {
        new_list.push(predi(val));
    })
    return new_list;
}

function _map(list, mapper) {
    var new_list = [];
    _each(list, function (val) {
        new_list.push(mapper(val));
    })
    return new_list;
}

[1, 2, 3].map(function (vale) {
    return val * 2;
})

[1, 2, 3, 4].filter(function (vale) {
    return val % 2;
})

// 커링
function _curry(fn) {
    return function (a) {
        return function (b) {
            return fn(a, b);
        }
    }
}

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

// 빼기
var sub = _curry(function (a, b) {
    return a - b;
})

console.log(sub(10, 5));

var sub10 = sub(10);
console.log(sub10(5))

// curryr
function _curryr() {
    return function (a, b) {
        return arguments.length == 2 ? fn(a, b) : function (b) { return fn(b, a); };
    }
}

function _get(obj, key) {
    return obj == null ? undefined : obj[key];
}

var user1 = users[0];
console.log(user1.name);
console.log(_get(user1, 'name'));

var _get = _curryr(function (obj, key) {
    return obj == null ? undefined : obj[key];
});

console.log(_get('name', user1));

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

// 3번째 인자를 생략
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


//
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


// pipe
function _pipe() {
    var fns = arguments;
    return function (arg) {
        return _reduece(fns, function (arg, fn) {
            return fn(arg);
        }, arg);
    }
}

var f1 = _pipe(
    function (a) { return a + 1 },
    function (a) { return a * 2 },
    function (a) { return a * a },
)

f1(1);


// go
function _go(arg) { 
    var fns = _rest(arguments);
    return _pipe.apply(null, fns)(arg);
}

_go(1,
    function (a) { return a + 1 },
    function (a) { return a * 2 },
    function (a) { return a * a },
    console.log
)