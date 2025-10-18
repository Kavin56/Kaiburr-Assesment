package com.kaiburr.task1;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/servers")
public class ServerController {
    private final Map<String, Server> servers = new LinkedHashMap<>();

    @GetMapping
    public Collection<Server> listServers() {
        return servers.values();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Server> getById(@PathVariable String id) {
        Server server = servers.get(id);
        if (server == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(server);
    }

    @PostMapping
    public ResponseEntity<Server> create(@RequestBody Server server) {
        if (server.getId() == null || server.getId().isBlank()) {
            server.setId(UUID.randomUUID().toString());
        }
        servers.put(server.getId(), server);
        return ResponseEntity.status(HttpStatus.CREATED).body(server);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Server> update(@PathVariable String id, @RequestBody Server server) {
        if (!servers.containsKey(id)) {
            return ResponseEntity.notFound().build();
        }
        server.setId(id);
        servers.put(id, server);
        return ResponseEntity.ok(server);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        if (servers.remove(id) == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}


