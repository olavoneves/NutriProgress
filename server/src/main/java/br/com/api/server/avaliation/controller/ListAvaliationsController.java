package br.com.api.server.avaliation.controller;

import br.com.api.server.avaliation.domain.dto.AvaliationData;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/avaliations")
public class ListAvaliationsController {

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<AvaliationData>> listAvaliationsByPatient() {

    }

    @GetMapping("/{id}")
    public ResponseEntity<AvaliationData> findAvaliationById(@PathVariable UUID id) {

    }

    @GetMapping("/patient/{patientId}/latest")
    public ResponseEntity<AvaliationData> listLatestAvaliation() {

    }
}
