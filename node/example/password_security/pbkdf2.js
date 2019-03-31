var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();

var users = [{
    username : 'nunu',
    password : '111',
    salt : 'aisjdfli!@#ilsjd',
    disPlayName : 'supernunu'
},
{
    username : 'feti',
    password : '129',
    salt : '!@#alijsdfasdfe',
    disPlayName : 'pytifeti'
}]
    
    

hasher({password:'129', salt:'aisjdfli!@#ilsjd'}, function(err, pass, salt, hash) {
        console.log(hash);
})