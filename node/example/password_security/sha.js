var sha256 = require('sha256');

function enc(pwd, salt){
    return sha256(pwd, salt);
}

console.log(enc('111','alsidjflkj!@3'));