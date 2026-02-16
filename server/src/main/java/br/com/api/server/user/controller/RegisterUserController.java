package br.com.api.server.user.controller;

import br.com.api.server.user.domain.dto.RegistrationData;
import br.com.api.server.user.domain.dto.UserData;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/users")
public class RegisterUserController {

    @PostMapping
    public ResponseEntity<UserData> register(@Valid @RequestBody RegistrationData data, UriComponentsBuilder uriBuilder) {

    }
}
