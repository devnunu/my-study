// 인덱스 컨트롤러
exports.show = function(req, res){
    res.render('index',{
        title:'Express'
    });
};