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
            editText = $$(".edit"),
            deleteText = $$(".delete");


        searchBtn.addEventListener("click", handler.clickSearchHandler);

        addBtn.addEventListener("click", handler.clickAddHandler);

        editText.forEach(function (val) {
            val.addEventListener("click", handler.clickEditTextHandler);
        });

        deleteText.forEach(function (val) {
            val.addEventListener("click", handler.clickDeleteHandler);
        });

    },

    onEditBtnEvent: function () {
        let util = ns.util,
            $ = util.$,
            handler = ns.contact.handler;
        editBtn = $("#edit-btn");

        editBtn.addEventListener("click", handler.clickEditHandler);
    }
};

ns.contact.ajaxCallback = {
    clickSearchCallback: function () {
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
        let util = ns.util,
            $ = util.$,
            name = $("#name-input"),
            callback = ns.contact.ajaxCallback;

        if(name.value.length===0){
            return console.log("항목을 입력하세요");
        }

        util.sendAjax('get', "http://localhost:3000/getUser/" + name.value, null, "application/json", callback.clickSearchCallback);
        name.value = "";
    },

    clickEditHandler: function () {
        let util = ns.util,
            $ = util.$,
            $$ = util.$$,
            ajaxCallback = ns.contact.ajaxCallback,
            name = $$(".name")[0].innerText,
            number = $$(".number")[0].innerText,
            changeName = $("#edit-name").value,
            changeNumber = $("#edit-number").value,
            data = {
                name: name,
                number: number,
                changeName: changeName,
                changeNumber: changeNumber
            };

        data = JSON.stringify(data);
        util.sendAjax('put', "http://localhost:3000/updateUser/", data, "application/json");
        util.sendAjax('get', "http://localhost:3000/getContactList", null, "application/json", ajaxCallback.contactLoadHandler);
    },

    clickEditTextHandler: function () {
        let util = ns.util,
            $ = util.$,
            listWrap = $(".list-wrap"),
            name = event.target.parentNode.childNodes[1].innerText,
            number = event.target.parentNode.childNodes[3].innerText;
            template = `<div class="row list">
                            <div class="col-md-4 name">${name}</div>
                            <div class="col-md-8 number">${number}</div>
                        </div>
                        <div class="row edit-contact">
                            <input id="edit-name" class="col-md-4" type="text" placeholder="name">
                            <input id="edit-number" class="col-md-4" type="text" placeholder="number">
                            <button id="edit-btn" class="col-md-4" type="sumbit">Edit</button>
                        </div>`;

        listWrap.innerHTML = template;
        ns.contact.onEditBtnEvent();
    },

    clickAddHandler: function () {
        let $ = ns.util.$,
            util = ns.util,
            ajaxCallback = ns.contact.ajaxCallback,
            name = $("#add-name"),
            number = $("#add-number"),
            data = {
                name: name.value,
                number: number.value
            };
        if((name.value.length===0)||(number.value.length===0)){
            return console.log("모든 항목을 입력하세요");
        }

        name.value = "";
        number.value = "";
        data = JSON.stringify(data);
        util.sendAjax('post', "http://localhost:3000/addUser/", data, "application/json");
        util.sendAjax('get', "http://localhost:3000/getContactList", null, "application/json", ajaxCallback.contactLoadHandler);
    },

    clickDeleteHandler: function () {
        let util = ns.util,
            ajaxCallback = ns.contact.ajaxCallback,
            name = event.target.parentNode.childNodes[1].innerText,
            number = event.target.parentNode.childNodes[3].innerText,
            data = {
                number: number
            };

        console.log("delete!");
        data = JSON.stringify(data);
        util.sendAjax('delete', "http://localhost:3000/deleteUser/" + name, data, "application/json");
        util.sendAjax('get', "http://localhost:3000/getContactList", null, "application/json", ajaxCallback.contactLoadHandler);
    }
};

document.addEventListener('DOMContentLoaded', ns.contact.init);