package com.example.firechat.view;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.example.firechat.R;
import com.example.firechat.data.UserController;
import com.example.firechat.model.User;

public class IntroActivity extends AppCompatActivity implements View.OnClickListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.screen_intro);

        findViewById(R.id.button_enter).setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {
        if (view.getId() == R.id.button_enter) {
            setUserInfomation();
            Intent intent = new Intent(this, ChatActivity.class);
            startActivity(intent);
        }
    }

    public void setUserInfomation() {
        User user = new User();
        String username = ((EditText) findViewById(R.id.edittext_username)).getText().toString();
        user.name = username;
        UserController.i().setUser(user);
    }
}
