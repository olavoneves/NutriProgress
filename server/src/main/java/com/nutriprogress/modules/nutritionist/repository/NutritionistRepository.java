package com.nutriprogress.modules.nutritionist.repository;

import com.nutriprogress.modules.nutritionist.entity.Nutritionist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface NutritionistRepository extends JpaRepository<Nutritionist, UUID> {

    Optional<Nutritionist> findByUserId(UUID userId);

    @Query("SELECT n FROM Nutritionist n WHERE LOWER(n.user.email) = LOWER(:email)")
    Optional<Nutritionist> findByUserEmail(String email);
}
