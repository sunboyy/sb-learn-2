package com.sunboyy.sblearn.data;

public class FailureResult<T> implements Result<T> {
    String cause;

    public FailureResult(String cause) {
        this.cause = cause;
    }

    @Override
    public boolean isSuccess() {
        return false;
    }

    public String getCause() {
        return cause;
    }
}
