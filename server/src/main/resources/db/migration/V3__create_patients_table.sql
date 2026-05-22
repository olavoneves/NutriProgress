CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nutritionist_id UUID NOT NULL REFERENCES nutritionists(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    birth_date DATE,
    gender VARCHAR(20),
    height DECIMAL(5,2),
    goal TEXT,
    notes TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID,
    updated_by UUID
);

CREATE INDEX idx_patients_nutritionist_id ON patients(nutritionist_id);
CREATE INDEX idx_patients_nutritionist_active ON patients(nutritionist_id, is_active);
CREATE INDEX idx_patients_full_name ON patients(full_name);
