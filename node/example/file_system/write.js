var fs = require('fs');

// 파일에 데이터를 씁니다
// 첫번째 인자 - 파일 이름, 두번째 인자 - 쓸 내용, 세번째 인자 - 작업 종료시 콜백 함수
fs.writeFile('./output.txt','Hello world', function(err){
    if(err){
        console.log('Error : '+ err);
    }

    console.log('output.txt 파일에 데이터 쓰기 완료');
});