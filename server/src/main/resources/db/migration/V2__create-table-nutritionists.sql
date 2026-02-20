CREATE TABLE nutritionists (
    id BINARY(16) NOT NULL,
    crn VARCHAR(50) NOT NULL,
    phone VARCHAR(50),
    clinic_name VARCHAR(150),
    active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_nutritionist_user
        FOREIGN KEY (id) REFERENCES users(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
