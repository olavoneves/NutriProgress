package br.com.api.server.user.controller;

import br.com.api.server.user.domain.dto.UserData;
import br.com.api.server.user.domain.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class ListUsersController {

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserData> findById(@PathVariable UUID id) {

    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserData>> findAll() {

    }

    @GetMapping("/actives")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserData>> findUsersActive() {

    }

    @GetMapping("/admins")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserData>> findAdmins() {

    }

    @GetMapping("/me")
    public ResponseEntity<UserData> findUserPrincipal(@AuthenticationPrincipal User user) {

    }
}
