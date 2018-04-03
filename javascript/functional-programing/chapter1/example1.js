
function add(a, b) {
    return a + b;
}

console.log(add(10, 5));

var c = 10

function add2(a, b) {
    return a + b + c;
}

function add3(a, b) {
    c = b;
    return a + b;
}

var obj1 = { val: 10 };
function add4(obj, b) {
    obj.val += b;
}

var obj1 = { val: 10 }
function add5(obj, b) {
    return { val: obj.val + b }
}

var f1 = function (a) { return a * a; };
console.log(f1);

function f3(f) {
    return 10;
}

f3(function () { return 10; });

function add_maker(a) {
    return function (b) {
        return a + b;
    }
}

var add10 = add_maker(10);

console.log(add10(20));

function f4(f1, f2, f3) {
    return f3(f1() + f2());
}

console.log(f4(
    function () { return 2; },
    function () { return 1; },
    function (a) { return a * a; },
));