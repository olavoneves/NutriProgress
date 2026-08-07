package com.nutriprogress.modules.report.controller;

import com.nutriprogress.modules.nutritionist.dto.NutritionistDTO;
import com.nutriprogress.modules.nutritionist.service.NutritionistService;
import com.nutriprogress.modules.report.service.PdfReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.UUID;

@RestController
@RequestMapping("/patients/{patientId}/report")
@RequiredArgsConstructor
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "Reports", description = "Geracao de relatorios em PDF")
public class ReportController {

    private final PdfReportService    pdfReportService;
    private final NutritionistService nutritionistService;

    /**
     * `produces` inclui JSON porque as respostas de erro (402/403/404) sao
     * serializadas pelo GlobalExceptionHandler — sem isso a negociacao de
     * conteudo poderia devolver 406 no lugar do erro real.
     */
    @GetMapping(
            value = "/pdf",
            produces = { MediaType.APPLICATION_PDF_VALUE, MediaType.APPLICATION_JSON_VALUE }
    )
    @Operation(
            summary = "Relatorio de Evolucao em PDF",
            description = "Gera PDF compartilhavel com a evolucao do paciente. " +
                          "Requer plano STARTER ou superior."
    )
    public ResponseEntity<byte[]> exportPdf(
            Authentication authentication,
            @PathVariable UUID patientId
    ) {
        NutritionistDTO nutritionist =
                nutritionistService.findByUserEmail(authentication.getName());

        byte[] pdf = pdfReportService
                .generatePatientReport(nutritionist.id(), patientId);

        ContentDisposition disposition = ContentDisposition.attachment()
                .filename("evolucao-" + LocalDate.now() + ".pdf", StandardCharsets.UTF_8)
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, disposition.toString())
                .contentType(MediaType.APPLICATION_PDF)
                .contentLength(pdf.length)
                .body(pdf);
    }
}
