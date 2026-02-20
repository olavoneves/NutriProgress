CREATE TABLE users (
    id BINARY(16) NOT NULL,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(255) NOT NULL,
    active TINYINT(1) NOT NULL DEFAULT 1,
    email_verified TINYINT(1) NOT NULL DEFAULT 0,
    role VARCHAR(50) NOT NULL,
    last_login_at DATETIME NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
