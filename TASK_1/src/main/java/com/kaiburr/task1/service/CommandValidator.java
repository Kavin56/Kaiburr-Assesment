package com.kaiburr.task1.service;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CommandValidator {
    private static final List<String> DISALLOWED = List.of(
            "rm ", "rm -", "shutdown", "reboot", "mkfs", ":(){:|:&};:",
            "; rm", "&& rm", "| rm", "> /dev/", "chmod 777 /", "chown -R /");

    public void validateSafe(String command) {
        if (command == null || command.isBlank()) {
            throw new IllegalArgumentException("Command must not be empty");
        }
        String lower = command.toLowerCase();
        for (String bad : DISALLOWED) {
            if (lower.contains(bad)) {
                throw new IllegalArgumentException("Unsafe command detected");
            }
        }
    }
}


