import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import { registerSchema, type RegisterSchema } from '../../validations';
import { SPECIALTY_LABELS } from '@utils/constants';
import {
  FormContainer,
  FormTitle,
  FormSubtitle,
  FormRow,
  FormFooter,
  FormLink,
  SelectField,
  SelectLabel,
  SelectWrapper,
  CheckboxRow,
  CheckboxLabel,
} from './RegisterForm.styles';

interface RegisterFormProps {
  onSubmit: (values: RegisterSchema) => Promise<void>;
  isLoading?: boolean;
  loginHref?: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  isLoading = false,
  loginHref = '/login',
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      crn: '',
      phone: '',
      specialty: '',
      clinicName: '',
      acceptTerms: false,
    },
  });

  const loading = isLoading || isSubmitting;

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormTitle>Criar conta</FormTitle>
      <FormSubtitle>
        Comece gratuitamente. Sem cartão de crédito.
      </FormSubtitle>

      <Input
        {...register('fullName')}
        label="Nome completo"
        placeholder="Dr. João Silva"
        error={errors.fullName?.message}
        required
        leftIcon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        }
      />

      <Input
        {...register('email')}
        label="Email profissional"
        type="email"
        placeholder="seu@email.com"
        error={errors.email?.message}
        required
        autoComplete="email"
        leftIcon={
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        }
      />

      <FormRow>
        <Input
          {...register('password')}
          label="Senha"
          type="password"
          placeholder="Mínimo 8 caracteres"
          error={errors.password?.message}
          required
          autoComplete="new-password"
        />
        <Input
          {...register('confirmPassword')}
          label="Confirmar senha"
          type="password"
          placeholder="Repita a senha"
          error={errors.confirmPassword?.message}
          required
          autoComplete="new-password"
        />
      </FormRow>

      <FormRow>
        <Input
          {...register('crn')}
          label="CRN"
          placeholder="Ex: CRN-3/12345"
          error={errors.crn?.message}
          required
          helperText="Registro Profissional"
        />
        <Input
          {...register('phone')}
          label="Telefone"
          type="tel"
          placeholder="11999999999"
          error={errors.phone?.message}
          helperText="Apenas números"
        />
      </FormRow>

      <SelectWrapper>
        <SelectLabel>Especialidade</SelectLabel>
        <SelectField {...register('specialty')}>
          <option value="">Selecione sua especialidade</option>
          {Object.entries(SPECIALTY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </SelectField>
      </SelectWrapper>

      <Input
        {...register('clinicName')}
        label="Nome da Clínica / Consultório"
        placeholder="Opcional"
        error={errors.clinicName?.message}
        helperText="Como você atende seus pacientes?"
      />

      <CheckboxRow>
        <input
          {...register('acceptTerms')}
          type="checkbox"
          id="acceptTerms"
        />
        <CheckboxLabel htmlFor="acceptTerms">
          Concordo com os{' '}
          <FormLink href="/terms" target="_blank" rel="noopener">
            Termos de Uso
          </FormLink>{' '}
          e{' '}
          <FormLink href="/privacy" target="_blank" rel="noopener">
            Política de Privacidade
          </FormLink>
        </CheckboxLabel>
      </CheckboxRow>
      {errors.acceptTerms && (
        <span style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '-0.75rem' }}>
          {errors.acceptTerms.message}
        </span>
      )}

      <Button
        type="submit"
        fullWidth
        isLoading={loading}
        disabled={loading}
      >
        Criar conta grátis
      </Button>

      <FormFooter>
        Já tem uma conta?{' '}
        <FormLink href={loginHref}>Entrar</FormLink>
      </FormFooter>
    </FormContainer>
  );
};

RegisterForm.displayName = 'RegisterForm';
