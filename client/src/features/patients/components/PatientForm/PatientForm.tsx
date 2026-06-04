import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import { patientSchema } from '../../validations';
import type { PatientSchema } from '../../validations';
import { GENDER_LABELS } from '@utils/constants';
import type { PatientDetail } from '../../services';
import {
  FormContainer,
  FormGrid,
  FormSection,
  FormSectionTitle,
  SelectWrapper,
  SelectLabel,
  SelectField,
  FormActions,
  TextareaWrapper,
  TextareaLabel,
  TextareaField,
} from './PatientForm.styles';

interface PatientFormProps {
  defaultValues?: Partial<PatientDetail>;
  onSubmit: (data: PatientSchema) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  submitLabel?: string;
}

export const PatientForm: React.FC<PatientFormProps> = ({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading = false,
  submitLabel = 'Salvar',
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PatientSchema>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      fullName:  defaultValues?.fullName  ?? '',
      email:     defaultValues?.email     ?? '',
      phone:     defaultValues?.phone     ?? '',
      gender:    defaultValues?.gender,
      birthDate: defaultValues?.birthDate
                   ? defaultValues.birthDate.split('T')[0]
                   : '',
      height:    defaultValues?.height
                   ? String(defaultValues.height)
                   : '',
      goal:      defaultValues?.goal      ?? '',
      notes:     defaultValues?.notes     ?? '',
    },
  });

  const loading = isLoading || isSubmitting;

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormSection>
        <FormSectionTitle>Dados Pessoais</FormSectionTitle>
        <FormGrid>
          <Input
            {...register('fullName')}
            label="Nome completo"
            placeholder="Nome do paciente"
            error={errors.fullName?.message}
            required
          />
          <Input
            {...register('email')}
            label="Email"
            type="email"
            placeholder="email@exemplo.com"
            error={errors.email?.message}
          />
          <Input
            {...register('phone')}
            label="Telefone"
            type="tel"
            placeholder="11999999999"
            error={errors.phone?.message}
            helperText="Apenas números, 10 ou 11 dígitos"
          />
          <Input
            {...register('birthDate')}
            label="Data de Nascimento"
            type="date"
            error={errors.birthDate?.message}
          />
        </FormGrid>

        <FormGrid columns={2}>
          <SelectWrapper>
            <SelectLabel>Gênero</SelectLabel>
            <SelectField {...register('gender')}>
              <option value="">Selecione</option>
              {(Object.entries(GENDER_LABELS) as [keyof typeof GENDER_LABELS, string][]).map(
                ([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                )
              )}
            </SelectField>
          </SelectWrapper>

          <Input
            {...register('height')}
            label="Altura (cm)"
            type="number"
            placeholder="165"
            error={errors.height?.message}
            helperText="Em centímetros"
          />
        </FormGrid>
      </FormSection>

      <FormSection>
        <FormSectionTitle>Informações Clínicas</FormSectionTitle>

        <TextareaWrapper>
          <TextareaLabel>Objetivo</TextareaLabel>
          <TextareaField
            {...register('goal')}
            placeholder="Ex: Perder 5kg, ganhar massa muscular..."
            rows={3}
          />
          {errors.goal && (
            <span className="error-msg">{errors.goal.message}</span>
          )}
        </TextareaWrapper>

        <TextareaWrapper>
          <TextareaLabel>Observações</TextareaLabel>
          <TextareaField
            {...register('notes')}
            placeholder="Observações sobre o paciente..."
            rows={4}
          />
          {errors.notes && (
            <span className="error-msg">{errors.notes.message}</span>
          )}
        </TextareaWrapper>
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

PatientForm.displayName = 'PatientForm';
