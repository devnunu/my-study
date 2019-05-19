package com.example.save;

import android.content.Intent;
import android.os.Bundle;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class PersonDetailActivity extends AppCompatActivity implements View.OnClickListener {

    public static final String PARAM_INTENT_PERSON = "person";
    public static final String RESULT_INTENT_PERSON = "resultperson";

    private Person person;
    private EditText mEditTextName, mEditTextAge;
    private Button mButtonUpdate;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.acitivity_person_detail);

        mEditTextName = findViewById(R.id.edittext_name);
        mEditTextAge = findViewById(R.id.edittext_age);
        mButtonUpdate = findViewById(R.id.button_update);
        mButtonUpdate.setOnClickListener(this);

        Intent intent = getIntent();
        person = (Person) intent.getSerializableExtra(PARAM_INTENT_PERSON);

        if (person != null) render();
        else Toast.makeText(getBaseContext(), "값이 없습니다", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onClick(View view) {
        if (view.getId() == R.id.button_update) {
            String name = mEditTextName.getText().toString();
            String age = mEditTextAge.getText().toString();

            if (isEmptyString(name) || isEmptyString(age)) {
                Toast.makeText(getBaseContext(), "값을 입력해주세요", Toast.LENGTH_SHORT).show();
                return;
            }

            Person newPerson = new Person(name, Integer.valueOf(age));
            newPerson.set_id(person.get_id());
            Intent intent = new Intent();
            intent.putExtra(RESULT_INTENT_PERSON, newPerson);
            setResult(RESULT_OK, intent);
            finish();
        }
    }

    private void render() {
        mEditTextName.setText(person.getName());
        mEditTextAge.setText(String.valueOf(person.getAge()));
    }

    private boolean isEmptyString(String str) {
        return str == null || str.equals("");
    }
}
