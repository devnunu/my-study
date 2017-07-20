var mongoose = require('mongoose');
var Schema = mongoose.Schema;



// 스키마 생성
var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  location: String,
  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date
});

// 이름 뒤에 -dude를 붙이는 커스텀 메소드 dudify를 선언했다.
// 서버 개발자는 이름 확인이나 포맷을 변경하는 중요 메소드를 이와같이 생성할 수 있다.
// 또한 개발자는 user를 찾는 쿼리 등, 다양한 커스텀 메소드 생성이 가능하다.
userSchema.methods.dudify = function() {
  // add some stuff to the users name
  this.name = this.name + '-dude'; 

  return this.name;
};

// 모든 save에 대해 저장 날짜를 생성한다.
userSchema.pre('save', function(next) {
  // 현재 날짜와 시간을 가져옴
  var currentDate = new Date();

  // updated_at필드를 current date로 변경
  this.updated_at = currentDate;

  // created_at 없을 때, 해당 필드를 만들어준다.
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

// 스키마 단독으로 사용이 불가능함
// 스키마 사용을 위하여 모델을 생성
var User = mongoose.model('User', userSchema);

// User 모델을 export 시킨다.
module.exports = User;