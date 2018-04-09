
var mi = 0;
var fi = 0;

_.go(
    _range(100),
    _map(function (val) {
        ++mi;
        return val * val;
    }),
    _.filter(function (val) {
        ++fi;
        return val % 2;
    }),
    console.log)

console.log(mi, fi);