package com.sunboyy.sblearn.domain.config;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Config {
    public static final String ALLOW_SELF_REGISTRATION = "ALLOW_SELF_REGISTRATION";

    @Id
    private String name;

    private int value;

    public String getName() {
        return name;
    }

    public int getValue() {
        return value;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setValue(int value) {
        this.value = value;
    }
}
