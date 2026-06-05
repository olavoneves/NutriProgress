import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import { evaluationSchema, type EvaluationSchema } from '../../validations';
import type { EvaluationDTO } from '../../services';
import {
  FormContainer,
  FormSection,
  FormSectionTitle,
  FormGrid,
  FormActions,
} from './EvaluationForm.styles';

interface EvaluationFormProps {
  defaultValues?: Partial<EvaluationDTO>;
  onSubmit:       (data: EvaluationSchema) => Promise<void>;
  onCancel:       () => void;
  isLoading?:     boolean;
  submitLabel?:   string;
}

const toStr = (v?: number | null) =>
  v != null ? String(v) : '';

export const EvaluationForm: React.FC<EvaluationFormProps> = ({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading   = false,
  submitLabel = 'Salvar Avaliação',
}) => {
  const today = new Date().toISOString().split('T')[0];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EvaluationSchema>({
    resolver: zodResolver(evaluationSchema),
    defaultValues: {
      evaluationDate:     defaultValues?.evaluationDate?.split('T')[0] ?? today,
      weight:             toStr(defaultValues?.weight),
      height:             toStr(defaultValues?.height),
      bodyFatPercentage:  toStr(defaultValues?.bodyFatPercentage),
      muscleMass:         toStr(defaultValues?.muscleMass),
      visceralFat:        toStr(defaultValues?.visceralFat),
      waistCircumference: toStr(defaultValues?.waistCircumference),
      hipCircumference:   toStr(defaultValues?.hipCircumference),
      chestCircumference: toStr(defaultValues?.chestCircumference),
      armCircumference:   toStr(defaultValues?.armCircumference),
      thighCircumference: toStr(defaultValues?.thighCircumference),
      calfCircumference:  toStr(defaultValues?.calfCircumference),
      notes:              defaultValues?.notes ?? '',
    },
  });

  const loading = isLoading || isSubmitting;

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormSection>
        <FormSectionTitle>Data da Avaliação</FormSectionTitle>
        <Input
          {...register('evaluationDate')}
          label="Data"
          type="date"
          error={errors.evaluationDate?.message}
          required
        />
      </FormSection>

      <FormSection>
        <FormSectionTitle>Medidas Básicas</FormSectionTitle>
        <FormGrid>
          <Input
            {...register('weight')}
            label="Peso (kg)"
            type="number"
            step="0.1"
            placeholder="70.5"
            error={errors.weight?.message}
            helperText="Em quilogramas"
          />
          <Input
            {...register('height')}
            label="Altura (cm)"
            type="number"
            step="0.1"
            placeholder="165.0"
            error={errors.height?.message}
            helperText="O IMC será calculado automaticamente"
          />
        </FormGrid>
      </FormSection>

      <FormSection>
        <FormSectionTitle>Composição Corporal</FormSectionTitle>
        <FormGrid>
          <Input
            {...register('bodyFatPercentage')}
            label="% Gordura Corporal"
            type="number"
            step="0.1"
            placeholder="22.5"
            error={errors.bodyFatPercentage?.message}
          />
          <Input
            {...register('muscleMass')}
            label="Massa Muscular (kg)"
            type="number"
            step="0.1"
            placeholder="32.0"
            error={errors.muscleMass?.message}
          />
          <Input
            {...register('visceralFat')}
            label="Gordura Visceral"
            type="number"
            placeholder="5"
            error={errors.visceralFat?.message}
            helperText="Nível 1-59"
          />
        </FormGrid>
      </FormSection>

      <FormSection>
        <FormSectionTitle>Circunferências (cm)</FormSectionTitle>
        <FormGrid columns={3}>
          <Input
            {...register('waistCircumference')}
            label="Cintura"
            type="number"
            step="0.1"
            placeholder="75.0"
            error={errors.waistCircumference?.message}
          />
          <Input
            {...register('hipCircumference')}
            label="Quadril"
            type="number"
            step="0.1"
            placeholder="95.0"
            error={errors.hipCircumference?.message}
          />
          <Input
            {...register('chestCircumference')}
            label="Tórax"
            type="number"
            step="0.1"
            placeholder="90.0"
            error={errors.chestCircumference?.message}
          />
          <Input
            {...register('armCircumference')}
            label="Braço"
            type="number"
            step="0.1"
            placeholder="32.0"
            error={errors.armCircumference?.message}
          />
          <Input
            {...register('thighCircumference')}
            label="Coxa"
            type="number"
            step="0.1"
            placeholder="55.0"
            error={errors.thighCircumference?.message}
          />
          <Input
            {...register('calfCircumference')}
            label="Panturrilha"
            type="number"
            step="0.1"
            placeholder="36.0"
            error={errors.calfCircumference?.message}
          />
        </FormGrid>
      </FormSection>

      <FormSection>
        <FormSectionTitle>Observações</FormSectionTitle>
        <textarea
          {...register('notes')}
          placeholder="Observações sobre a avaliação..."
          rows={4}
          style={{
            width:        '100%',
            padding:      '0.75rem 1rem',
            border:       '2px solid #e5e7eb',
            borderRadius: '0.5rem',
            fontFamily:   'inherit',
            fontSize:     '1rem',
            resize:       'vertical',
            outline:      'none',
            boxSizing:    'border-box',
          }}
        />
        {errors.notes && (
          <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>
            {errors.notes.message}
          </span>
        )}
      </FormSection>

      <FormActions>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={loading}
          disabled={loading}
        >
          {submitLabel}
        </Button>
      </FormActions>
    </FormContainer>
  );
};

EvaluationForm.displayName = 'EvaluationForm';
