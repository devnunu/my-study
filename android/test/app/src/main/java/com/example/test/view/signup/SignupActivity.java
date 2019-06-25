package com.example.test.view.signup;

import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.databinding.DataBindingUtil;
import androidx.fragment.app.FragmentActivity;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;

import com.example.test.R;
import com.example.test.common.Event;
import com.example.test.common.VMFactory;
import com.example.test.databinding.ActivitySignupBinding;
import com.example.test.domain.user.UserVM;
import com.example.test.view.common.BaseActivity;
import com.example.test.view.home.HomeActivity;
import com.google.common.base.Strings;

public class SignupActivity extends BaseActivity {

    private UserVM userVM;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ActivitySignupBinding binding = DataBindingUtil.setContentView(this, R.layout.activity_signup);

        userVM = obtainVM(this);

        binding.setUservm(userVM);
        binding.setLifecycleOwner(this);


        userVM.getOnLoginEvent().observe(this, new Observer<Event<String>>() {
            @Override
            public void onChanged(Event<String> signupErrorMsg) {
                String result = signupErrorMsg.getContentIfNotHandled();
                onSignUp(result);
            }
        });
    }

    private UserVM obtainVM(FragmentActivity activity) {
        VMFactory factory = VMFactory.getInstance();
        return ViewModelProviders.of(activity, factory).get(UserVM.class);
    }

    private void onSignUp(@NonNull String signupErrorMsg) {
        if (Strings.isNullOrEmpty(signupErrorMsg)) {
            Intent intent = new Intent(this, HomeActivity.class);
            startActivity(intent);
        } else {
            showShortToastMsg(signupErrorMsg);
        }
    }

}
