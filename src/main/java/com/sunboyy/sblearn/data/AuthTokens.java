package com.sunboyy.sblearn.data;

public class AuthTokens {
    private final String accessToken;

    public AuthTokens(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getAccessToken() {
        return accessToken;
    }
}
