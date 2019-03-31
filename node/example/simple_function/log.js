
// 정수형 출력
console.log("숫자보여주기:%d",10);
// 문자형 출력
console.log("문자열 보여주기:%s",'소녀시대');
// 객체 출력
console.log("JSON 객체 보여주기:%j",{name:'소녀시대'});


// 현재 실행 한 파일
console.log('현재 실행한 파일 이름:%s', __filename);
// 현재 실행 한 파일경로
console.log('현재 실행한 파일 경로:%s', __dirname);


// 객체 속성 출력
var Person = {name:"소녀시대", age:20};
console.dir(Person);