package com.example.save;

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.widget.Toast;

import java.util.ArrayList;

public class DbHelper extends SQLiteOpenHelper {
    private Context context;

    public DbHelper(Context context, String name, SQLiteDatabase.CursorFactory factory, int version) {
        super(context, name, factory, version);
        this.context = context;
    }

    /**
     * Database가 존재하지 않을 때, 딱 한번 실행된다. * DB를 만드는 역할을 한다. * @param db
     */
    @Override
    public void onCreate(SQLiteDatabase db) {
        // String 보다 StringBuffer가 Query 만들기 편하다.
        StringBuffer sb = new StringBuffer();
        sb.append(" CREATE TABLE TEST_TABLE ( ");
        sb.append(" _ID INTEGER PRIMARY KEY AUTOINCREMENT, ");
        sb.append(" NAME TEXT, ");
        sb.append(" AGE INTEGER ) ");

        // SQLite Database로 쿼리 실행
        db.execSQL(sb.toString());
        Toast.makeText(context, "Table 생성완료", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        Toast.makeText(context, "버전이 올라갔습니다.", Toast.LENGTH_SHORT).show();
    }

    public void testDB() {
        SQLiteDatabase db = getReadableDatabase();
    }

    public void addPerson(Person person) {
        SQLiteDatabase db = getWritableDatabase();

        StringBuffer sb = new StringBuffer();
        sb.append(" INSERT INTO TEST_TABLE ( ");
        sb.append(" NAME, AGE ) ");
        sb.append(" VALUES ( ?, ?) ");

        db.execSQL(sb.toString(), new Object[]{person.getName(), person.getAge()});
        Toast.makeText(context, "Insert 완료", Toast.LENGTH_SHORT).show();
    }

    public ArrayList getAllPersonData() {
        StringBuffer sb = new StringBuffer();
        sb.append(" SELECT _ID, NAME, AGE FROM TEST_TABLE ");
        // 읽기 전용 DB 객체를 만든다.
        SQLiteDatabase db = getReadableDatabase();
        Cursor cursor = db.rawQuery(sb.toString(), null);
        ArrayList people = new ArrayList(); Person person = null;
        // moveToNext 다음에 데이터가 있으면 true 없으면 false
        while( cursor.moveToNext() ) {
            person = new Person();
            person.set_id(cursor.getInt(0));
            person.setName(cursor.getString(1));
            person.setAge(cursor.getInt(2));
            people.add(person);
        }
        return people;
    }

    public void deletePerson(int primaryId) {
        SQLiteDatabase db = getWritableDatabase();

        StringBuffer sb = new StringBuffer();
        sb.append("DELETE FROM TEST_TABLE WHERE _ID= ?");
        db.execSQL(sb.toString(), new Object[]{primaryId});
        Toast.makeText(context, "Delete 완료", Toast.LENGTH_SHORT).show();
    }

    public void updatePerson(Person person) {
        SQLiteDatabase db = getWritableDatabase();

        StringBuffer sb = new StringBuffer();
        sb.append("UPDATE TEST_TABLE SET NAME=?, AGE=? WHERE _ID=?");
        db.execSQL(sb.toString(), new Object[]{person.getName(), person.getAge(),person.get_id()});
        Toast.makeText(context, "Update 완료", Toast.LENGTH_SHORT).show();
    }

}