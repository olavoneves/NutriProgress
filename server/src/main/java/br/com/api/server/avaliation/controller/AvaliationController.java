package br.com.api.server.avaliation.controller;

import br.com.api.server.avaliation.domain.dto.AvaliationData;
import br.com.api.server.avaliation.domain.dto.RegistrationAvaliationData;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/avaliations")
public class AvaliationController {

    @PostMapping
    public ResponseEntity<AvaliationData> registerAvaliation(@Valid @RequestBody RegistrationAvaliationData data) {

    }
}
