document.querySelector('.ajaxsend').addEventListener("click",function(){
  sendAjax('http://localhost:3000/');
})

function sendAjax(url){
        var oReq = new XMLHttpRequest();

        oReq.open('POST', url);
        oReq.setRequestHeader('Content-Type', "application/json")// json 형태로 보낸다
        oReq.send();

        oReq.addEventListener('load', function(){
          var result = oReq.responseText;
          console.log(oReq.responseText)
          document.querySelector('.result').innerHTML = result
        })
}
