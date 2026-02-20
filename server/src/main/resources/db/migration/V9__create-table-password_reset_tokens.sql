CREATE TABLE password_reset_tokens (
    id BINARY(16) NOT NULL,
    token VARCHAR(255) NOT NULL,
    user_id BINARY(16) NOT NULL,
    expires_at DATETIME NOT NULL,
    used TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_password_reset_token (token),
    INDEX idx_password_reset_user (user_id),
    CONSTRAINT fk_password_reset_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
