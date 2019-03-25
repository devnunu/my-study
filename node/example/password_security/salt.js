var md5 = require('md5');
var salt = "asdfe@!@#sfae";
var password = '111';
console.log(md5(password+salt));