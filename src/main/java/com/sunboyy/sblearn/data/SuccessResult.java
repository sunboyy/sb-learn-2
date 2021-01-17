package com.sunboyy.sblearn.data;

public class SuccessResult<T> implements Result<T> {
    private T data;

    public SuccessResult(T data) {
        this.data = data;
    }

    @Override
    public boolean isSuccess() {
        return true;
    }

    public T getData() {
        return data;
    }
}
