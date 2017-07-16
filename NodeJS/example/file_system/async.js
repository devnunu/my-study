var fs = require('fs');

// 파일을 비동기식 IO로 읽어들임
fs.readFile('./package.json','utf8',function(err, data){
    // 읽어들인 데이터 출력
    console.log(data);
})

console.log('프로젝트폴더 안의 package.json 파일을 읽도록 요청 했습니다');