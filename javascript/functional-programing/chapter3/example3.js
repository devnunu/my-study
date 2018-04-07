

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

// 찾아내기 - find

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

// some
function _some(data, predi) {
    return _find_index(data, predi) != -1;
}

console.log(_some([1, 2, 5, 10, 20], function (val) {
    return val % 10;
}))

// every
function _every(data, predi) {
    return _find_index(data, _negate(predi)) == -1;
}


// 접기 - reduce

function _min(data) {
    return _reduce(data, function (a, b) {
        return a < b ? a : b;
    });
}

function _max(data) {
    return _reduce(data, function (a, b) {
        return a > b ? a : b;
    });
}

console.log(_min([1, 2, 4, 10, 5, -4]));

console.log(_max([1, 2, 4, 10, 5, -4]));




function _min_by(data, iter) {
    return _reduce(data, function (a, b) {
        return iter(a) < iter(b) ? a : b;
    });
}

function _max_by(data, iter) {
    return _reduce(data, function (a, b) {
        return iter(a) > iter(b) ? a : b;
    });
}

console.log(
    _min_by([1, 2, 4, 10, 5, -4]), Math.abs
);

console.log(
    _max_by([1, 2, 4, 10, 5, -4]), Math.abs
);