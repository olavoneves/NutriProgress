package br.com.api.server.patient.controller;

import br.com.api.server.patient.domain.dto.PatientData;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/patients")
public class ListPatientsController {

    @GetMapping
    public ResponseEntity<List<PatientData>> findNutritionistPatients() {

    }

    @GetMapping("/{id}")
    public ResponseEntity<PatientData> findById(@PathVariable UUID id) {

    }
}
