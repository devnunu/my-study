

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

// 수집하기 - map, value, pluck

// map
console.log(
    _map(users, function (user) {
        return user.name;
    })
)

// values
function _values(data) {
    return _map(data, function (val) { return val; });
}

console.log(user[1]);

// _identity
function _identity(val) {
    return val;
}


// _pluck

function _pluck(data, key) {
    return _map(data, function (obj) {
        return obj[key];
    });
}

// [36, 32, 32, 27, 25...]
console.log(_pluck(users, 'age'));


// 거르기 - filter

console.log(
    _filter(users, function (user) {
        return user.age > 30;
    })
)

// reject
function _reject(data, predi) {
    return _filter(data, function (val) {
        return !predi(val);
    });
}

function _negate(func) {
    return function () {
        return !func(val);
    }
}

// compact

var _compact = _filter(_identity);

console.log(
    _compact([1, 2, 0, false, null, {}])
)