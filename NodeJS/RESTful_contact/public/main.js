var ns = ns || {};

ns.util = {
    ERR_MSG: "ERROR",
    CONFIRM_MSG: "OK",
    $: function (element) {
        return document.querySelector(element);
    },
    $$: function (element) {
        return document.querySelectorAll(element);
    },
    sendAjax: function (method, url, data, type, func) {
        oReq = new XMLHttpRequest();
        oReq.open(method, url);
        oReq.setRequestHeader('Content-Type', type);
        data === null ? oReq.send() : oReq.send(data);
        oReq.addEventListener("load", func);
    }
};


ns.contact = {
    init: function () {
        let ajaxCallback = ns.contact.ajaxCallback;

        ns.util.sendAjax('get', "http://localhost:3000/getContactList", null, "application/json", ajaxCallback.contactLoadHandler);
    },

    onContactEvent: function () {
        let util = ns.util,
            $ = util.$,
            $$ = util.$$,
            handler = ns.contact.handler,
            searchBtn = $("#search-btn"),
            addBtn = $("#add-btn"),
            editText =  $$(".edit"),
            deleteText = $$(".delete");
        

        searchBtn.addEventListener("click", handler.clickSearchHandler);

        addBtn.addEventListener("click", handler.clickAddHandler);
        
        editText.forEach(function(val){
            val.addEventListener("click", handler.clickEditHandler);
        });

        deleteText.forEach(function(val){
            val.addEventListener("click", handler.clickDeleteHandler);
        });
        
    },

};

ns.contact.ajaxCallback = {
    clickSearchCallback: function(){
        let $ = ns.util.$,
            data = JSON.parse(this.responseText),
            template = data.template,
            msg = data.msg,
            listWrap = $(".list-wrap");

        if (msg === ns.util.ERR_MSG) {
            listWrap.innerHTML = '<div class="error">해당 사용자를 찾을 수 없습니다</div>';
            return;
        }
        listWrap.innerHTML = template;

        console.log(data.msg, data.data);
    },

    contactLoadHandler: function () {
        let $ = ns.util.$,
            listWrap = $(".list-wrap");

        listWrap.innerHTML = this.responseText;
        ns.contact.onContactEvent();
    }
};

ns.contact.handler = {
    clickSearchHandler: function () {
        let util =  ns.util,
            $ = util.$,
            name = $("#name-input"),
            callback = ns.contact.ajaxCallback;

        util.sendAjax('get', "http://localhost:3000/getUser/" + name.value, null, "application/json", callback.clickSearchCallback);
    },

    clickEditHandler: function () {
        console.log("edit");
    },

    clickAddHandler: function () {
        let $ = ns.util.$,
            util = ns.util,
            name = $("#add-name").value,
            number = $("#add-number").value,
            data = {
                name: name,
                number: number
            };

        data = JSON.stringify(data);
        util.sendAjax('post', "http://localhost:3000/addUser/", data, "application/json");
    },

    clickDeleteHandler: function () {
        let util = ns.util,
            ajaxCallback = ns.contact.ajaxCallback,
            name = event.target.parentNode.childNodes[1].innerText,
            number = event.target.parentNode.childNodes[3].innerText,
            data = { number: number };
        
        console.log("delete!");
        data =  JSON.stringify(data);
        util.sendAjax('delete', "http://localhost:3000/deleteUser/" + name, data, "application/json");
        util.sendAjax('get', "http://localhost:3000/getContactList", null, "application/json", ajaxCallback.contactLoadHandler);
    }
};

document.addEventListener('DOMContentLoaded', ns.contact.init);