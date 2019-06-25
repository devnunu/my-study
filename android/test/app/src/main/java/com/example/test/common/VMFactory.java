package com.example.test.common;

import androidx.annotation.NonNull;
import androidx.lifecycle.ViewModel;
import androidx.lifecycle.ViewModelProvider;

import com.example.test.domain.test.TestVM;
import com.example.test.domain.user.UserVM;

public class VMFactory extends ViewModelProvider.NewInstanceFactory {

    public static volatile VMFactory INSTANCE;

    public static VMFactory getInstance() {
        if (INSTANCE == null) {
            synchronized (VMFactory.class) {
                if (INSTANCE == null) {
                    INSTANCE = new VMFactory();
                }
            }
        }
        return INSTANCE;
    }

    @NonNull
    @Override
    public <T extends ViewModel> T create(@NonNull Class<T> modelClass) {
        if (modelClass.isAssignableFrom(UserVM.class)) {
            return (T) new UserVM();
        }else if (modelClass.isAssignableFrom(TestVM.class)) {
            return (T) new TestVM();
        }
        throw new IllegalArgumentException("Unknown ViewModel class: " + modelClass.getName());
    }
}
