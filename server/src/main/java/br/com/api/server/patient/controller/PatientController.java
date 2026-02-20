package br.com.api.server.patient.controller;

import br.com.api.server.patient.domain.dto.PatientData;
import br.com.api.server.patient.domain.dto.RegistrationPatientData;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    @PostMapping
    public ResponseEntity<PatientData> registerPatient(@Valid @RequestBody RegistrationPatientData data, UriComponentsBuilder uriBuilder) {

    }
}
