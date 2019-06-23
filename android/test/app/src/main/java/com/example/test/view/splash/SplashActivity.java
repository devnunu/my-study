package com.example.test.view.splash;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;

import androidx.annotation.Nullable;

import com.example.test.R;
import com.example.test.view.signup.SignupActivity;

public class SplashActivity extends Activity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

        Handler hd = new Handler();
        hd.postDelayed(new splashhandler(), 3000); // 1초 후에 hd handler 실행  3000ms = 3초
    }

    private class splashhandler implements Runnable {
        public void run() {
            startActivity(new Intent(getApplication(), SignupActivity.class));
            finish();
        }
    }

    @Override
    public void onBackPressed() {
        return;
    }


}
