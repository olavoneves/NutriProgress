package br.com.api.server.avaliation.controller;

import br.com.api.server.avaliation.domain.dto.AvaliationData;
import br.com.api.server.avaliation.domain.dto.UpdateAvaliationData;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/avaliations")
public class UpdateAvaliationController {

    @PutMapping("/{id}")
    public ResponseEntity<AvaliationData> updateAvaliation(@PathVariable UUID id, @Valid @RequestBody UpdateAvaliationData data) {

    }

    @PatchMapping("/{id}/disable-avaliation")
    public ResponseEntity<Void> softDelete(@PathVariable UUID id) {

    }
}
