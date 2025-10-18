package com.kaiburr.task1.service;

import com.kaiburr.task1.model.Task;
import com.kaiburr.task1.model.TaskExecution;
import com.kaiburr.task1.repo.TaskRepository;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final CommandValidator validator;

    public TaskService(TaskRepository taskRepository, CommandValidator validator) {
        this.taskRepository = taskRepository;
        this.validator = validator;
    }

    public List<Task> listAll() {
        return taskRepository.findAll();
    }

    public Optional<Task> getById(String id) {
        return taskRepository.findById(id);
    }

    public List<Task> findByName(String q) {
        return taskRepository.findByNameContainingIgnoreCase(q);
    }

    public Task upsert(Task task) {
        validator.validateSafe(task.getCommand());
        return taskRepository.save(task);
    }

    public void delete(String id) {
        taskRepository.deleteById(id);
    }

    public Task execute(String id) throws Exception {
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
        validator.validateSafe(task.getCommand());

        Instant start = Instant.now();
        Process process = null;
        StringBuilder out = new StringBuilder();
        int code = 0;
        try {
            process = new ProcessBuilder()
                    .command(osCommand(task.getCommand()))
                    .redirectErrorStream(true)
                    .start();
            
            try (BufferedReader br = new BufferedReader(new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8))) {
                String line;
                while ((line = br.readLine()) != null) {
                    out.append(line).append(System.lineSeparator());
                }
            }
            code = process.waitFor();
        } catch (Exception e) {
            out.append("Command execution failed: ").append(e.getMessage());
            code = -1;
        }
        Instant end = Instant.now();

        TaskExecution exec = new TaskExecution();
        exec.setStartTime(start);
        exec.setEndTime(end);
        String output = out.toString();
        if (code != 0) {
            output = output + "\nExit code: " + code;
        }
        exec.setOutput(output);
        task.getTaskExecutions().add(exec);
        return taskRepository.save(task);
    }

    private List<String> osCommand(String cmd) {
        String os = System.getProperty("os.name").toLowerCase();
        if (os.contains("win")) {
            return List.of("cmd.exe", "/c", cmd);
        }
        return List.of("/bin/sh", "-c", cmd);
    }
}


