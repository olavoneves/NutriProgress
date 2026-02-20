CREATE TABLE patients (
    id BINARY(16) NOT NULL,
    nutritionist_id BINARY(16) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    email VARCHAR(150),
    phone VARCHAR(50),
    notes TEXT,
    active TINYINT(1) NOT NULL DEFAULT 1,
    archived_at DATETIME NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NULL,
    PRIMARY KEY (id),
    INDEX idx_patient_nutritionist (nutritionist_id),
    CONSTRAINT fk_patient_nutritionist
        FOREIGN KEY (nutritionist_id) REFERENCES nutritionists(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
