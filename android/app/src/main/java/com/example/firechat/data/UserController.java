package com.example.firechat.data;

import com.example.firechat.model.User;

public class UserController {

    private static UserController mInstance;

    public static UserController i() {
        synchronized (UserController.class) {
            if (mInstance == null) mInstance = new UserController();
        }
        return mInstance;
    }

    private User mUser;

    public UserController() {
        mUser = new User();
    }

    public void setUser(User user) {
        mUser = user;
    }

    public User getUser() {
        return mUser;
    }

}
