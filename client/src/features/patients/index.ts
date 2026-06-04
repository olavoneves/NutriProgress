export { patientService } from './services';
export type {
  PatientDetail,
  CreatePatientData,
  PatientSummary,
  PatientListResponse,
  PatientFilters,
} from './services';

export type { Patient } from './types';

export {
  usePatients,
  usePatientDetails,
  usePatientMutations,
} from './hooks';

export { PatientCard }              from './components/PatientCard';
export { PatientForm }              from './components/PatientForm';
export { PatientFilters as PatientFiltersComponent } from './components/PatientFilters';
export { PatientBadge }             from './components/PatientBadge';
export { PatientDetailCard }        from './components/PatientDetailCard';

export { patientSchema } from './validations';
export type { PatientSchema } from './validations';
