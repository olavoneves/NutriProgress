import React from 'react';
import { Input } from '@components/ui/Input';
import {
  FiltersContainer,
  FilterTabs,
  FilterTab,
  ResultCount,
} from './PatientFilters.styles';

interface PatientFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  activeFilter: boolean | undefined;
  onActiveFilterChange: (value: boolean | undefined) => void;
  totalElements: number;
  isLoading: boolean;
}

export const PatientFilters: React.FC<PatientFiltersProps> = ({
  search,
  onSearchChange,
  activeFilter,
  onActiveFilterChange,
  totalElements,
  isLoading,
}) => (
  <FiltersContainer>
    <Input
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Buscar por nome..."
      leftIcon={
        <svg width="18" height="18" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      }
    />

    <FilterTabs>
      <FilterTab
        $active={activeFilter === true}
        onClick={() => onActiveFilterChange(true)}
      >
        Ativos
      </FilterTab>
      <FilterTab
        $active={activeFilter === false}
        onClick={() => onActiveFilterChange(false)}
      >
        Arquivados
      </FilterTab>
      <FilterTab
        $active={activeFilter === undefined}
        onClick={() => onActiveFilterChange(undefined)}
      >
        Todos
      </FilterTab>
    </FilterTabs>

    {!isLoading && (
      <ResultCount>
        {totalElements}{' '}
        {totalElements === 1 ? 'paciente' : 'pacientes'}
      </ResultCount>
    )}
  </FiltersContainer>
);

PatientFilters.displayName = 'PatientFilters';
