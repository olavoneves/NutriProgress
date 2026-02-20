package br.com.api.server.auth.controller;

import br.com.api.server.auth.domain.dto.UserDetailsData;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class ListUserController {

    @GetMapping("/me")
    public ResponseEntity<UserDetailsData> listUser() {

    }
}
