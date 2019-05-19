package com.example.firechat.model;

import com.example.firechat.util.DateUtil;

public class Message {
    public String username;
    public String message;
    public String createTime;

    public Message() {

    }

    public Message(String username, String message) {
        this.username = username;
        this.message = message;
        createTime = DateUtil.getTimenow();
    }
}
