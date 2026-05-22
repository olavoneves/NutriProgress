package com.nutriprogress.modules.nutritionist.entity;

import com.nutriprogress.modules.patient.entity.Patient;
import com.nutriprogress.modules.user.entity.User;
import com.nutriprogress.shared.audit.AuditableEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "nutritionists")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Nutritionist extends AuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "full_name", nullable = false, length = 255)
    private String fullName;

    @Column(length = 50)
    private String crn;

    @Column(length = 20)
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(length = 100)
    private Specialty specialty;

    @Column(name = "clinic_name", length = 255)
    private String clinicName;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "subscription_plan", nullable = false, length = 50)
    @Builder.Default
    private SubscriptionPlan subscriptionPlan = SubscriptionPlan.FREE;

    @Column(name = "subscription_expires_at")
    private LocalDateTime subscriptionExpiresAt;

    @OneToMany(mappedBy = "nutritionist", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Patient> patients = new ArrayList<>();
}
