package com.example.save;

import android.content.Intent;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {

    private final int REQUESTCODE_COMMON = 1;
    private final String DATABASE_NAME = "User";
    private DbHelper dbHelper;
    private ArrayList<Person> people;

    private EditText mNameEditText, mAgeEditText;
    private Button mButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        people = new ArrayList();

        mNameEditText = findViewById(R.id.text_name);
        mAgeEditText = findViewById(R.id.text_age);
        mButton = findViewById(R.id.button_submit);

        mButton.setOnClickListener(this);

        initDb();
    }

    @Override
    protected void onResume() {
        super.onResume();
        readPeopleDataAndUpdateListView();
    }

    private void initDb() {
        dbHelper = new DbHelper(MainActivity.this, DATABASE_NAME, null, 1);
        dbHelper.testDB();
    }

    private void render() {
        ListView listview = findViewById(R.id.listview_person);
        PersonListAdapter adapter = new PersonListAdapter(people);
        listview.setAdapter(adapter);
    }

    @Override
    public void onClick(View view) {
        if (view.getId() == R.id.button_submit) handleOnClickSubmitButton();
    }

    private void handleOnClickSubmitButton() {
        String name = mNameEditText.getText().toString();
        String age = mAgeEditText.getText().toString();

        if (isEmptyString(name) || isEmptyString(age)) {
            Toast.makeText(getBaseContext(), "값을 입력해주세요", Toast.LENGTH_SHORT).show();
            return;
        }

        Person person = new Person(name, Integer.parseInt(age));
        dbHelper.addPerson(person);
        resetEditTexts();
        readPeopleDataAndUpdateListView();
    }

    private void readPeopleDataAndUpdateListView() {
        people = dbHelper.getAllPersonData();
        render();
    }

    private void resetEditTexts() {
        mNameEditText.setText("");
        mAgeEditText.setText("");
    }

    private boolean isEmptyString(String str) {
        return str == null || str.equals("");
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        Person person = (Person) data.getSerializableExtra(PersonDetailActivity.RESULT_INTENT_PERSON);
        dbHelper.updatePerson(person);
        readPeopleDataAndUpdateListView();
    }

    class PersonListAdapter extends BaseAdapter implements View.OnClickListener {
        private List people;

        public PersonListAdapter(List people) {
            this.people = people;
        }

        @Override
        public int getCount() {
            return this.people.size();
        }

        @Override
        public Object getItem(int position) {
            return this.people.get(position);
        }

        @Override
        public long getItemId(int position) {
            return position;
        }

        @Override
        public View getView(int position, View convertView, ViewGroup parent) {
            if (convertView == null) {
                LayoutInflater inflater = (LayoutInflater) getBaseContext().getSystemService(LAYOUT_INFLATER_SERVICE);
                convertView = inflater.inflate(R.layout.listitem_person, parent, false);
            }

            Person person = (Person) getItem(position);
            ((TextView) convertView.findViewById(R.id.text_item_name)).setText(getNotNullString(person.getName()));
            ((TextView) convertView.findViewById(R.id.text_item_age)).setText(getNotNullString(String.valueOf(person.getAge())));

            ((TextView) convertView.findViewById(R.id.text_update)).setOnClickListener(this);
            ((TextView) convertView.findViewById(R.id.text_update)).setTag(position);

            ((TextView) convertView.findViewById(R.id.text_delete)).setOnClickListener(this);
            ((TextView) convertView.findViewById(R.id.text_delete)).setTag(position);

            return convertView;
        }

        @Override
        public void onClick(View view) {
            int position = Integer.valueOf(view.getTag().toString());
            Person person = (Person) getItem(position);
            if (view.getId() == R.id.text_delete) {
                dbHelper.deletePerson(person.get_id());
                readPeopleDataAndUpdateListView();
            } else if (view.getId() == R.id.text_update) {
                Intent intent = new Intent(getBaseContext(), PersonDetailActivity.class);
                intent.putExtra(PersonDetailActivity.PARAM_INTENT_PERSON, person);
                startActivityForResult(intent, REQUESTCODE_COMMON);
            }
        }

        private String getNotNullString(String str) {
            if (str == null) return "";
            return str;
        }
    }
}