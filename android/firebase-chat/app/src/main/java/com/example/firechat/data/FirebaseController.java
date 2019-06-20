package com.example.firechat.data;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.example.firechat.model.Message;
import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.util.HashSet;

public class FirebaseController implements ChildEventListener {

    private static FirebaseController mInstance;

    public static FirebaseController i() {
        synchronized (FirebaseController.class) {
            if (mInstance == null) mInstance = new FirebaseController();
        }
        return mInstance;
    }

    private FirebaseDatabase database = FirebaseDatabase.getInstance();
    private DatabaseReference myRef = database.getReference("message");

    private HashSet<FirebaseListener> mListeners;

    public FirebaseController() {
        mListeners = new HashSet<>();
        myRef.addChildEventListener(this);

    }

    @Override
    public void onChildAdded(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {
        Message value = dataSnapshot.getValue(Message.class);
        if (mListeners.isEmpty()) return;
        for (FirebaseListener listner : mListeners) {
            listner.onChildAdded(value);
        }
    }

    @Override
    public void onChildChanged(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {

    }

    @Override
    public void onChildRemoved(@NonNull DataSnapshot dataSnapshot) {

    }

    @Override
    public void onChildMoved(@NonNull DataSnapshot dataSnapshot, @Nullable String s) {

    }

    @Override
    public void onCancelled(@NonNull DatabaseError databaseError) {

    }

    public void registerFirebaseListener(FirebaseListener listener) {
        mListeners.add(listener);
    }

    public void deleteFirebaseListener(FirebaseListener listener) {
        if (mListeners.contains(listener)) mListeners.remove(listener);
    }

    public void setValue(Object value) {
        if (myRef == null) return;
        else myRef.push().setValue(value);
    }

    public interface FirebaseListener {

        void onChildAdded(@NonNull Message value);
    }
}
