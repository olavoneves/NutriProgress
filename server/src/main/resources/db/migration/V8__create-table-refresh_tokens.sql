CREATE TABLE refresh_tokens (
    id BINARY(16) NOT NULL,
    token VARCHAR(255) NOT NULL,
    user_id BINARY(16) NOT NULL,
    expires_at DATETIME NOT NULL,
    revoked TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_refresh_token (token),
    INDEX idx_refresh_user (user_id),
    CONSTRAINT fk_refresh_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
