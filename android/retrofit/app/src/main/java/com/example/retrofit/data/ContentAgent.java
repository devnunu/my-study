package com.example.retrofit.data;

import com.example.retrofit.model.Content;
import com.example.retrofit.model.HttpResponse;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ContentAgent {

    private static final ContentAgent INSTANCE = new ContentAgent();

    private ContentAgent() {
    }

    public static ContentAgent getInstance() {
        return INSTANCE;
    }

    public void fetchContent(final RetroCallback callback) {
        ContentService service = Repo.createService(ContentService.class);
        service.fetchContent().enqueue(new Callback<HttpResponse<Content>>() {
            @Override
            public void onResponse(Call<HttpResponse<Content>> call, Response<HttpResponse<Content>> response) {
                if (response.isSuccessful()) {
                    HttpResponse<Content> res = response.body();
                    Content content = res.getData();
                    callback.onFetchContent(content);
                } else {
                    callback.onFetchContent(null);
                }
            }

            @Override
            public void onFailure(Call<HttpResponse<Content>> call, Throwable t) {
                callback.onFetchContent(null);
            }
        });
    }

    public interface RetroCallback {
        void onFetchContent(Content content);
    }
}
