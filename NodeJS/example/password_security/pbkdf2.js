var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();
var assert = require("assert");

// 변경할 패스워드, 객체로 전달
var opts = {
  password: "helloworld"
};

// 첫번째 인자 - 암호화 하고 싶은 것(객체 내부 password)
// 두번째 인자 - 콜백 함수(에러메세지, 사용자가 입력한 패스워드, salt(자동 생성), 해시값)
hasher(opts, function(err, pass, salt, hash) {
  opts.salt = salt;
  hasher(opts, function(err, pass, salt, hash2) {
    assert.deepEqual(hash2, hash);

    // password mismatch
    opts.password = "aaa";
    hasher(opts, function(err, pass, salt, hash2) {
      assert.notDeepEqual(hash2, hash);
      console.log("OK");
    });
  });
});