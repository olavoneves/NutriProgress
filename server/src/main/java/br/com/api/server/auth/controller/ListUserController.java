package br.com.api.server.auth.controller;

import br.com.api.server.auth.domain.dto.UserDetailsData;
import br.com.api.server.auth.service.ListUserService;
import br.com.api.server.user.domain.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class ListUserController {

    private final ListUserService listUserService;

    public ListUserController(ListUserService listUserService) {
        this.listUserService = listUserService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserDetailsData> listUser(@AuthenticationPrincipal User user) {
        var response = listUserService.listUser(user);
        return ResponseEntity.ok(response);
    }
}
