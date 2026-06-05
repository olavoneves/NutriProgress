import { z } from 'zod';

const optionalPositiveNumber = z
  .string()
  .optional()
  .or(z.literal(''))
  .refine(
    (val) => !val || (!isNaN(parseFloat(val)) && parseFloat(val) > 0),
    { message: 'Deve ser um número positivo' }
  );

export const evaluationSchema = z.object({
  evaluationDate: z
    .string()
    .min(1, 'Data da avaliação é obrigatória'),

  weight:            optionalPositiveNumber,
  height:            optionalPositiveNumber,
  bodyFatPercentage: optionalPositiveNumber,
  muscleMass:        optionalPositiveNumber,
  visceralFat:       optionalPositiveNumber,

  waistCircumference:  optionalPositiveNumber,
  hipCircumference:    optionalPositiveNumber,
  chestCircumference:  optionalPositiveNumber,
  armCircumference:    optionalPositiveNumber,
  thighCircumference:  optionalPositiveNumber,
  calfCircumference:   optionalPositiveNumber,

  notes: z
    .string()
    .max(5000, 'Observações muito longas')
    .optional()
    .or(z.literal('')),
});

export type EvaluationSchema = z.infer<typeof evaluationSchema>;
