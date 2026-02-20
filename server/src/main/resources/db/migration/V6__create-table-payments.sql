CREATE TABLE payments (
    id BINARY(16) NOT NULL,
    subscription_id BINARY(16) NOT NULL,
    gateway VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    status VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(150),
    paid_at DATETIME NULL,
    created_at DATETIME NOT NULL,
    PRIMARY KEY (id),
    INDEX idx_payment_subscription (subscription_id),
    CONSTRAINT fk_payment_subscription
        FOREIGN KEY (subscription_id) REFERENCES subscriptions(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
