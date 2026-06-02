import { z } from 'zod';

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, 'Nome completo é obrigatório')
      .min(3, 'Nome deve ter no mínimo 3 caracteres')
      .max(255, 'Nome muito longo'),
    email: z
      .string()
      .min(1, 'Email é obrigatório')
      .email('Email inválido'),
    password: z
      .string()
      .min(1, 'Senha é obrigatória')
      .min(8, 'Senha deve ter no mínimo 8 caracteres')
      .regex(
        /^(?=.*[a-z])(?=.*[0-9])/,
        'Senha deve conter letras e números'
      ),
    confirmPassword: z
      .string()
      .min(1, 'Confirmação de senha é obrigatória'),
    crn: z
      .string()
      .min(1, 'CRN é obrigatório')
      .max(50, 'CRN inválido'),
    phone: z
      .string()
      .regex(/^[0-9]{10,11}$/, 'Telefone inválido')
      .optional()
      .or(z.literal('')),
    specialty: z.string().optional(),
    clinicName: z.string().optional(),
    acceptTerms: z
      .boolean()
      .refine((val) => val === true, {
        message: 'Você deve aceitar os termos de uso',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas não conferem',
    path: ['confirmPassword'],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
