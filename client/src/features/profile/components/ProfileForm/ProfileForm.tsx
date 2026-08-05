import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import { SPECIALTY_LABELS } from '@utils/constants';
import type { NutritionistProfile } from '../../services';
import {
  FormContainer,
  FormGrid,
  SelectWrapper,
  SelectLabel,
  SelectField,
  FormActions,
} from './ProfileForm.styles';

const profileSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(255, 'Nome muito longo'),
  phone: z
    .string()
    .regex(/^[0-9]{10,11}$/, 'Telefone inválido')
    .optional()
    .or(z.literal('')),
  crn:        z.string().max(50, 'CRN muito longo').optional().or(z.literal('')),
  specialty:  z.string().optional(),
  clinicName: z.string().max(255, 'Nome muito longo').optional().or(z.literal('')),
});

export type ProfileSchema = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  profile:   NutritionistProfile;
  onSubmit:  (data: ProfileSchema) => Promise<void>;
  isLoading: boolean;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  profile,
  onSubmit,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName:   profile.fullName   ?? '',
      phone:      profile.phone      ?? '',
      crn:        profile.crn        ?? '',
      specialty:  profile.specialty  ?? '',
      clinicName: profile.clinicName ?? '',
    },
  });

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormGrid>
        <Input
          {...register('fullName')}
          label="Nome completo"
          error={errors.fullName?.message}
          required
        />
        <Input
          label="Email"
          value={profile.email}
          disabled
          readOnly
          helperText="O email não pode ser alterado"
        />
        <Input
          {...register('phone')}
          label="Telefone"
          type="tel"
          placeholder="11999999999"
          error={errors.phone?.message}
        />
        <Input
          {...register('crn')}
          label="CRN"
          placeholder="CRN-3/12345"
          error={errors.crn?.message}
        />
      </FormGrid>

      <FormGrid>
        <SelectWrapper>
          <SelectLabel htmlFor="profile-specialty">Especialidade</SelectLabel>
          <SelectField id="profile-specialty" {...register('specialty')}>
            <option value="">Selecione</option>
            {Object.entries(SPECIALTY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </SelectField>
        </SelectWrapper>

        <Input
          {...register('clinicName')}
          label="Clínica / Consultório"
          error={errors.clinicName?.message}
        />
      </FormGrid>

      <FormActions>
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          disabled={isLoading || !isDirty}
        >
          Salvar Alterações
        </Button>
      </FormActions>
    </FormContainer>
  );
};

ProfileForm.displayName = 'ProfileForm';
