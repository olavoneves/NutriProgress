CREATE TABLE subscriptions (
    id BINARY(16) NOT NULL,
    nutritionist_id BINARY(16) NOT NULL,
    plan_id BINARY(16) NOT NULL,
    status VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NULL,
    auto_renew TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_subscription_nutritionist (nutritionist_id),
    INDEX idx_subscription_plan (plan_id),
    CONSTRAINT fk_subscription_nutritionist
        FOREIGN KEY (nutritionist_id) REFERENCES nutritionists(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_subscription_plan
        FOREIGN KEY (plan_id) REFERENCES plans(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
