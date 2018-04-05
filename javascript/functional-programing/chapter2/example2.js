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