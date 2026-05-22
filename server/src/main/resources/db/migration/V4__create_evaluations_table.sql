CREATE TABLE evaluations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    nutritionist_id UUID NOT NULL REFERENCES nutritionists(id) ON DELETE CASCADE,
    evaluation_date DATE NOT NULL,
    evaluation_number INT,
    weight DECIMAL(5,2),
    height DECIMAL(5,2),
    bmi DECIMAL(4,2),
    body_fat_percentage DECIMAL(4,2),
    muscle_mass DECIMAL(5,2),
    visceral_fat INT,
    waist_circumference DECIMAL(5,2),
    hip_circumference DECIMAL(5,2),
    chest_circumference DECIMAL(5,2),
    arm_circumference DECIMAL(5,2),
    thigh_circumference DECIMAL(5,2),
    calf_circumference DECIMAL(5,2),
    notes TEXT,
    photos JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by UUID,
    updated_by UUID,
    CONSTRAINT uk_patient_number UNIQUE (patient_id, evaluation_number)
);

CREATE INDEX idx_evaluations_patient_id ON evaluations(patient_id);
CREATE INDEX idx_evaluations_patient_date ON evaluations(patient_id, evaluation_date DESC);
CREATE INDEX idx_evaluations_nutritionist_id ON evaluations(nutritionist_id);

-- Trigger para auto-incrementar evaluation_number por paciente
CREATE OR REPLACE FUNCTION set_evaluation_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.evaluation_number IS NULL THEN
        SELECT COALESCE(MAX(evaluation_number), 0) + 1
        INTO NEW.evaluation_number
        FROM evaluations
        WHERE patient_id = NEW.patient_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_evaluation_number
    BEFORE INSERT ON evaluations
    FOR EACH ROW
    EXECUTE FUNCTION set_evaluation_number();
