
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