CREATE TABLE email_verification_tokens (
    id BINARY(16) NOT NULL,
    token VARCHAR(255) NOT NULL,
    user_id BINARY(16) NOT NULL,
    expires_at DATETIME NOT NULL,
    verified TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_email_verification_token (token),
    INDEX idx_email_verification_user (user_id),
    CONSTRAINT fk_email_verification_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
