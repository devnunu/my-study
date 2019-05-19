package com.example.firechat.view;

import android.content.Context;
import android.view.LayoutInflater;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.example.firechat.R;
import com.example.firechat.model.Message;

public class ChatItemView extends LinearLayout {

    private Message mMessage;
    private boolean mMyMessage;

    // view
    private ImageView mImageView;
    private TextView mTextMessage;
    private TextView mTextCreateTime;

    public ChatItemView(Context context) {
        super(context);
        LayoutInflater.from(context).inflate(R.layout.item_chat, this);

        mImageView = findViewById(R.id.image_profile);
        mTextMessage=findViewById(R.id.text_message);
        mTextCreateTime=findViewById(R.id.text_createtime);
    }

    public void setData(Message message,boolean myMessage) {
        mMyMessage = myMessage;
        mMessage = message;
        render();
    }

    private void render() {
        if (mMessage == null) return;

//        if(mMyMessage) {
//            RelativeLayout.LayoutParams params1 = (RelativeLayout.LayoutParams) mImageView.getLayoutParams();
//            params1.addRule(RelativeLayout.ALIGN_PARENT_LEFT, R.id.layout_chat_item);
//            mImageView.setLayoutParams(params1);
//
//            RelativeLayout.LayoutParams params2 = (RelativeLayout.LayoutParams) mTextMessage.getLayoutParams();
//            params2.addRule(RelativeLayout.LEFT_OF, R.id.image_profile);
//            mTextMessage.setLayoutParams(params2);
//
//            RelativeLayout.LayoutParams params3 = (RelativeLayout.LayoutParams) mTextCreateTime.getLayoutParams();
//            params3.addRule(RelativeLayout.LEFT_OF, R.id.text_message);
//            mTextCreateTime.setLayoutParams(params3);
//        }

        mTextMessage.setText(mMessage.message);
        mTextCreateTime.setText(mMessage.createTime);
    }

}
