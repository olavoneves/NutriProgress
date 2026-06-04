import { z } from 'zod';

export const patientSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Nome completo é obrigatório')
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(255, 'Nome muito longo'),

  email: z
    .string()
    .email('Email inválido')
    .optional()
    .or(z.literal('')),

  phone: z
    .string()
    .regex(/^[0-9]{10,11}$/, 'Telefone inválido (apenas números)')
    .optional()
    .or(z.literal('')),

  gender: z
    .enum(['MALE', 'FEMALE', 'OTHER'])
    .optional(),

  birthDate: z
    .string()
    .optional()
    .or(z.literal('')),

  height: z
    .string()
    .optional()
    .or(z.literal('')),

  goal: z
    .string()
    .max(1000, 'Objetivo muito longo')
    .optional()
    .or(z.literal('')),

  notes: z
    .string()
    .max(5000, 'Observações muito longas')
    .optional()
    .or(z.literal('')),
});

export type PatientSchema = z.infer<typeof patientSchema>;
