// pragma solidity ^0.4.18;

contract Proof {
    struct FileDetails {
        uint timestamp;
        string owner;
    }

    mapping(string => FileDetails) files;

    event LogFileAddedStatus(bool status, uint timestamp, string owner, string fileHash);

    // 블록 타임 스탬프에 파일의 소유자를 저장하기 위해 사용된다
    function set(string owner, string fileHash) {
        // 키가 이미 존재하는지 확인하기 위한 적절한 방법이 없다. 따라서 기본값을 확인한다.
        if (files[fileHash].timestamp == 0) {
            files[fileHash] = FileDetails(block.timestamp, owner);

            // 이벤트를 트리거해 프론트엔드 앱이 파일의 존재와 소유권에 대한 상세 정보가 저장됐다고 알수 있게 한다.
            LogFileAddedStatus(true, block.timestamp, owner, fileHash);
        } else {
            // 그 다음에는 프론트엔드에게 파일의 상세 정보가 이미 저장됐기 때문에 파일 존재 및 소유권에 대한 상세 정보를 저장할 수 없다고 알려준다.
            LogFileAddedStatus(false, block.timestamp, owner, fileHash);
        }  
    }
    
    // 파일 정보를 얻기 위해 사용된다
    function get(string fileHash) returns (uint timestamp, string owener) {
        return (files[fileHash].timestamp, files[fileHash].owner);
    }
}


// pragma solidity ^0.4.2;

// contract Proof {
//     struct FileDetails 
//     {
//         uint timestamp;
//         string owner;
//     }

//     mapping(string => FileDetails) files;

//     event logFileAddedStatus(bool status, uint timestamp, string owner, string fileHash);

//     // 블록 타임 스탬프에 파일의 소유자를 저장하기 위해 사용된다
//     function set(string owner, string fileHash) public
//     {
//         // 키가 이미 존재하는지 확인하기 위한 적절한 방법이 없다. 따라서 기본값을 확인한다.
//         if (files[fileHash].timestamp == 0) {
//             files[fileHash] = FileDetails(block.timestamp, owner);

//             // 이벤트를 트리거해 프론트엔드 앱이 파일의 존재와 소유권에 대한 상세 정보가 저장됐다고 알수 있게 한다.
//             emit logFileAddedStatus(true, block.timestamp, owner, fileHash);
//         } else {
//             // 그 다음에는 프론트엔드에게 파일의 상세 정보가 이미 저장됐기 때문에 파일 존재 및 소유권에 대한 상세 정보를 저장할 수 없다고 알려준다.
//             emit logFileAddedStatus(false, block.timestamp, owner, fileHash);
//         }  
//     }
    
//     // 파일 정보를 얻기 위해 사용된다
//     function get(string fileHash) public view returns (uint timestamp, string owener) 
//     {
//         return (files[fileHash].timestamp, files[fileHash].owner);
//     }
// }
