package com.mrsunboy.sblearn.data;

public class AuthTokens {
    private String accessToken;

    public AuthTokens(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getAccessToken() {
        return accessToken;
    }
}
