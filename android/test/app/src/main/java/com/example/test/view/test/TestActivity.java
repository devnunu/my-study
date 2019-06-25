package com.example.test.view.test;

import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.databinding.DataBindingUtil;
import androidx.fragment.app.FragmentActivity;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;

import com.example.test.R;
import com.example.test.common.Event;
import com.example.test.common.VMFactory;
import com.example.test.databinding.ActivityTestBinding;
import com.example.test.domain.test.TestVM;
import com.example.test.view.common.BaseActivity;

public class TestActivity extends BaseActivity {

    private TestVM testVM;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ActivityTestBinding binding = DataBindingUtil.setContentView(this, R.layout.activity_test);

        testVM = obtainVM(this);
        binding.setTestvm(testVM);
        binding.setLifecycleOwner(this);

        testVM.getOnClickTitleEdit().observe(this, new Observer<Event<String>>() {
            @Override
            public void onChanged(Event<String> stringEvent) {

            }
        });
    }

    private TestVM obtainVM(FragmentActivity activity) {
        VMFactory factory = VMFactory.getInstance();
        return ViewModelProviders.of(activity, factory).get(TestVM.class);
    }
}
