package com.example.retrofit;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import com.example.retrofit.data.ContentAgent;
import com.example.retrofit.model.Content;

import java.util.Objects;

public class MainActivity extends AppCompatActivity implements View.OnClickListener, ContentAgent.RetroCallback {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        findViewById(R.id.button).setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        if (v.getId() == R.id.button) ContentAgent.getInstance().fetchContent(this);
    }

    @Override
    public void onFetchContent(Content content) {
        if (content != null) {
            ((TextView) findViewById(R.id.title)).setText(content.getTitle());
            ((TextView) findViewById(R.id.description)).setText(content.getDescription());
        }
    }
}
