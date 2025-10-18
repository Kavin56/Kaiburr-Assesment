package com.kaiburr.task1.controller;

import com.kaiburr.task1.model.Task;
import com.kaiburr.task1.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<?> get(@RequestParam(name = "id", required = false) String id,
                                 @RequestParam(name = "name", required = false) String name) {
        if (id != null) {
            return taskService.getById(id)
                    .<ResponseEntity<?>>map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        }
        if (name != null && !name.isBlank()) {
            List<Task> found = taskService.findByName(name);
            if (found.isEmpty()) return ResponseEntity.notFound().build();
            return ResponseEntity.ok(found);
        }
        return ResponseEntity.ok(taskService.listAll());
    }

    @PutMapping
    public ResponseEntity<?> put(@Valid @RequestBody Task task) {
        Task saved = taskService.upsert(task);
        return ResponseEntity.created(URI.create("/tasks?id=" + saved.getId())).body(saved);
    }

    @DeleteMapping
    public ResponseEntity<?> delete(@RequestParam("id") String id) {
        try {
            taskService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace(); // Print stack trace to console
            return ResponseEntity.status(500).body("Delete failed: " + e.getMessage());
        }
    }

    @PutMapping("/{id}/execute")
    public ResponseEntity<?> execute(@PathVariable String id) {
        try {
            Task updated = taskService.execute(id);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            e.printStackTrace(); // Print stack trace to console
            return ResponseEntity.status(500).body("Execute failed: " + e.getMessage());
        }
    }
}


