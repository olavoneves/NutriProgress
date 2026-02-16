package br.com.api.server.user.controller;

import br.com.api.server.user.domain.dto.UpdateData;
import br.com.api.server.user.domain.dto.UpdateRoleData;
import br.com.api.server.user.domain.dto.UserData;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UpdatesUserController {

    @PutMapping("/{id}")
    public ResponseEntity<UserData> update(@PathVariable UUID id, @Valid @RequestBody UpdateData data) {

    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> softDelete(@PathVariable UUID id) {

    }

    @PatchMapping("/{id}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> updateRole(@PathVariable UUID id, @Valid @RequestBody UpdateRoleData data) {

    }
}
