var os = require('os');


// 운영체제의 호스트 이름
console.log("시스템의 hostname : %s",os.hostname);

// 시스템의 사용가능한 메모리 용량과 전체 메모리 용량
console.log("시스템의 메모리 : %d/%d", os.freemem(), os.totalmem());

// CPU 정보를 알려줌
console.log("시스템의 CPU 정보\n");
console.dir(os.cpus());

// 네트워크 인터페이스 정보를 담은 배열 객체를 반환
console.log("시스템의 네트워크 인터페이스 정보\n");
console.dir(os.networkInterfaces);
