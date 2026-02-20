CREATE TABLE plans (
    id BINARY(16) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    max_patients INT NOT NULL,
    features TEXT,
    active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
