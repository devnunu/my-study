package com.example.test.domain.test;

import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.example.test.common.Event;

public class TestVM extends ViewModel {

    MutableLiveData<String> mTitle = new MutableLiveData<>();

    MutableLiveData<Event<String>> mOnClickTitleEdit = new MutableLiveData<>();

    public MutableLiveData<String> getTitle() {
        return mTitle;
    }

    public MutableLiveData<Event<String>> getOnClickTitleEdit() {
        return mOnClickTitleEdit;
    }

    public void onClickTitleEdit(String title) {
        mOnClickTitleEdit.setValue(new Event<>(title));
    }
}
