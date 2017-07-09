var imgSelector = document.querySelector(".selector-wrap");
var yogaImg = document.getElementsByClassName("yogaImg")[0];

imgSelector.addEventListener("click", function(event){
    var num = event.target.id.split("selector")[1];
    if(num!==undefined){
        yogaImg.style.backgroundImage = "url('../images/yoga"+num+".jpg')";
    }
})