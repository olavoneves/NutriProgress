CREATE TABLE nutritionists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    crn VARCHAR(50),
    phone VARCHAR(20),
    specialty VARCHAR(100),
    clinic_name VARCHAR(255),
    avatar_url TEXT,
    subscription_plan VARCHAR(50) NOT NULL DEFAULT 'FREE',
    subscription_expires_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID,
    updated_by UUID
);

CREATE INDEX idx_nutritionists_user_id ON nutritionists(user_id);
CREATE INDEX idx_nutritionists_subscription ON nutritionists(subscription_plan);
