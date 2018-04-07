function _filter(users, predi) {
    var new_list = [];
    _each(list, function(val){
        new_list.push(predi(val));
    })
    return new_list;
}

function _map(list, mapper) {
    var new_list = [];
    _each(list, function(val){
        new_list.push(mapper(val));
    })
    return new_list;
}

function _each(list, iter) {
    for (var i = 0; i < list.length; i++) {
        iter(list[i]);
    }
    return list;
}

