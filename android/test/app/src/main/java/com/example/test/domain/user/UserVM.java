package com.example.test.domain.user;

import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.example.test.common.Event;
import com.example.test.model.User;

import java.util.Objects;

public class UserVM extends ViewModel {

    private final MutableLiveData<User> mUser = new MutableLiveData<>();

    private final MutableLiveData<Event<String>> mOnLoginEvent = new MutableLiveData<>();

    public UserVM() {
        mUser.setValue(new User());
    }

    public MutableLiveData<Event<String>> getOnLoginEvent() {
        return mOnLoginEvent;
    }

    public MutableLiveData<User> getUser() {
        return mUser;
    }

    public void onSignUp(String passwardidentify) {
        String SignupErrorMsg = validSignupArgs(passwardidentify);
        mOnLoginEvent.setValue(new Event<>(SignupErrorMsg));
    }


    private String validSignupArgs(String passwardidentify) {
        User user = mUser.getValue();
        if (user.getId() == null) {
            return "아이디를 입력해주시기 바랍니다.";
        } else if (user.getPassword() == null) {
            return "패스워드를 입력해주시기 바랍니다.";
        } else if (passwardidentify == null) {
            return "패스워드 재확인을 입력해주시기 바랍니다.";
        } else if (!(passwardidentify.equals(user.getPassword()))) {
            return "패스워드는 동일해야합니다.";
        }
        return "";
    }
}
