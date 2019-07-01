package com.example.retrofit.data;

import com.example.retrofit.model.Content;
import com.example.retrofit.model.HttpResponse;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Headers;

public interface ContentService {
    @Headers({"Accept: application/json"})
    @GET("/")
    Call<HttpResponse<Content>> fetchContent();

}
