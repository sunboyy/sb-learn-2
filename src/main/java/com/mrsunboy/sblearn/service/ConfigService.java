package com.mrsunboy.sblearn.service;

import com.mrsunboy.sblearn.data.Config;
import com.mrsunboy.sblearn.repository.ConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ConfigService {
    private final Map<String, Integer> defaultConfiguration = new HashMap<>();

    @Autowired
    private ConfigRepository configRepository;

    public ConfigService() {
        defaultConfiguration.put(Config.ALLOW_SELF_REGISTRATION, 0);
    }

    public Config getConfig(String name) {
        Config config = configRepository.findById(name).orElse(null);
        if (config != null) {
            return config;
        }
        if (defaultConfiguration.containsKey(name)) {
            return addConfig(name, defaultConfiguration.get(name));
        }
        return null;
    }

    private Config addConfig(String name, int value) {
        Config config = new Config();
        config.setName(name);
        config.setValue(value);
        configRepository.save(config);
        return config;
    }
}
