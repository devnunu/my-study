package com.example.test.domain.user;

import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.example.test.common.Event;

public class UserVM extends ViewModel {

    private final MutableLiveData<String> mId = new MutableLiveData<>();
    private final MutableLiveData<String> mPassword = new MutableLiveData<>();
    private final MutableLiveData<String> mPasswordIdentify = new MutableLiveData<>();
    private final MutableLiveData<String> mName = new MutableLiveData<>();
    private final MutableLiveData<String> mGender = new MutableLiveData<>();
    private final MutableLiveData<Integer> mAge = new MutableLiveData<>();

    private final MutableLiveData<Event<String>> mOnLoginEvent = new MutableLiveData<>();

    public MutableLiveData<Event<String>> getOnLoginEvent() {
        return mOnLoginEvent;
    }

    public MutableLiveData<String> getId() {
        return mId;
    }

    public MutableLiveData<String> getPassword() {
        return mPassword;
    }

    public MutableLiveData<String> getPasswordIdentify() {
        return mPasswordIdentify;
    }

    public MutableLiveData<String> getName() {
        return mName;
    }

    public MutableLiveData<String> getGender() {
        return mGender;
    }

    public MutableLiveData<Integer> getAge() {
        return mAge;
    }

    public void onSignUp() {
        String SignupErrorMsg = validSignupArgs();
        mOnLoginEvent.setValue(new Event<>(SignupErrorMsg));
    }

    private String validSignupArgs() {
        String password = mPassword.getValue();
        String passwordIdentify = mPasswordIdentify.getValue();

        boolean test =password.equals(passwordIdentify);

        if (mId == null) {
            return "아이디를 입력해주시기 바랍니다.";
        } else if (mPassword == null) {
            return "패스워드를 입력해주시기 바랍니다.";
        } else if (mPasswordIdentify == null) {
            return "패스워드 재확인을 입력해주시기 바랍니다.";
        } else if (mName == null) {
            return "이름을 입력해주시기 바랍니다.";
        } else if (mGender == null) {
            return "성별을 입력해주시기 바랍니다.";
        } else if (mAge == null) {
            return "나이를 입력해주시기 바랍니다.";
        } else if (!(mPasswordIdentify.toString().equals(mPassword.toString()))) {
            return "패스워드는 동일해야합니다.";
        }
        return null;
    }
}
