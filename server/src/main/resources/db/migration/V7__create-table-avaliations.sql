CREATE TABLE avaliations (
    id BINARY(16) NOT NULL,
    patient_id BINARY(16) NOT NULL,
    nutritionist_id BINARY(16) NOT NULL,
    weight DECIMAL(6,2),
    height DECIMAL(5,2),
    bmi DECIMAL(5,2),
    waist_circumference DECIMAL(5,2),
    hip_circumference DECIMAL(5,2),
    arm_circumference DECIMAL(5,2),
    thigh_circumference DECIMAL(5,2),
    body_fat_percentage DECIMAL(5,2),
    muscle_mass DECIMAL(6,2),
    visceral_fat DECIMAL(5,2),
    notes TEXT,
    active TINYINT(1) NOT NULL DEFAULT 1,
    avaliation_date DATE NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NULL,
    PRIMARY KEY (id),
    INDEX idx_avaliation_patient (patient_id),
    INDEX idx_avaliation_nutritionist (nutritionist_id),
    CONSTRAINT fk_avaliation_patient
        FOREIGN KEY (patient_id) REFERENCES patients(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_avaliation_nutritionist
        FOREIGN KEY (nutritionist_id) REFERENCES nutritionists(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
