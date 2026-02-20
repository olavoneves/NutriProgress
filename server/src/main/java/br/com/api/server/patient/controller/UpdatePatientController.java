package br.com.api.server.patient.controller;

import br.com.api.server.patient.domain.dto.PatientData;
import br.com.api.server.patient.domain.dto.UpdatePatientData;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/patients")
public class UpdatePatientController {

    @PutMapping("/{id}")
    public ResponseEntity<PatientData> updatePatient(@PathVariable UUID id, @Valid @RequestBody UpdatePatientData data) {

    }

    @PatchMapping("/{id}/archive")
    public ResponseEntity<Void> archivePatient(@PathVariable UUID id) {

    }

    @PatchMapping("/{ìd}/restore")
    public ResponseEntity<Void> restorePatient(@PathVariable UUID id) {

    }
}
