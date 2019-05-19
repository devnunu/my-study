package com.example.firechat.view;

import android.content.Context;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.LinearLayout;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.firechat.R;
import com.example.firechat.data.FirebaseController;
import com.example.firechat.data.UserController;
import com.example.firechat.model.Message;
import com.example.firechat.model.User;

import java.util.ArrayList;

public class ChatActivity extends AppCompatActivity implements View.OnClickListener, FirebaseController.FirebaseListener {

    private User mUser;
    private ArrayList<Message> mMessages;

    // view
    private RecyclerView recyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager layoutManager;

    public ChatActivity() {
        mMessages = new ArrayList<>();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.screen_chat);

        mUser = UserController.i().getUser();

        // recycler view
        setupRecyclerView();

        findViewById(R.id.button_send).setOnClickListener(this);
        FirebaseController.i().registerFirebaseListener(this);
    }

    private void setupRecyclerView() {
        recyclerView = findViewById(R.id.layout_recycler);
        recyclerView.setHasFixedSize(true);

        layoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(layoutManager);

        mAdapter = new ChatActivityAdapter(mMessages);
        recyclerView.setAdapter(mAdapter);
    }

    @Override
    public void onClick(View view) {
        if (view.getId() == R.id.button_send) {
            String message = ((EditText) findViewById(R.id.edittext_massage)).getText().toString();
            ((EditText) findViewById(R.id.edittext_massage)).setText("");
            FirebaseController.i().setValue(new Message(mUser.name, message));
        }
    }

    @Override
    public void onChildAdded(@NonNull Message value) {
        mMessages.add(value);
        mAdapter.notifyDataSetChanged();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        FirebaseController.i().deleteFirebaseListener(this);
    }

    private class ChatActivityAdapter extends RecyclerView.Adapter<ChatActivityAdapter.ChatActivityAdapterViewHolder> {

        public ChatActivityAdapter(ArrayList<Message> messages) {
            mMessages = messages;
        }

        public class ChatActivityAdapterViewHolder extends RecyclerView.ViewHolder {
            public ChatItemView mChatItemView;

            public ChatActivityAdapterViewHolder(ChatItemView v) {
                super(v);
                mChatItemView = v;
            }
        }

        @Override
        public void onBindViewHolder(@NonNull ChatActivityAdapterViewHolder holder, int position) {
            if (mMessages == null || mMessages.isEmpty())
                return;

            Message message = mMessages.get(position);
            holder.mChatItemView.setData(message, mUser.name.equals(message.username));
        }

        @Override
        public ChatActivityAdapterViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            Context mContext = parent.getContext();
            ChatItemView mChatItemview = new ChatItemView(mContext);

            // 디자인 속성 적용
            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
            params.setMargins(0, 0, 0, 20);
            mChatItemview.setLayoutParams(params);

            // 뷰 홀더에 커스텀 뷰 적용
            ChatActivityAdapterViewHolder vh = new ChatActivityAdapterViewHolder(mChatItemview);
            return vh;
        }


        @Override
        public int getItemCount() {
            return mMessages.size();
        }
    }

}
