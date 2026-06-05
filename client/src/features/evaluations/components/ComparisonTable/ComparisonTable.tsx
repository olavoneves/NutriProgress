import React from 'react';
import { formatDate } from '@utils/formatters';
import type { EvolutionComparison } from '../../services';
import {
  TableContainer,
  TableTitle,
  Table,
  TableHead,
  TableBody,
  Th,
  Td,
  TdDiff,
} from './ComparisonTable.styles';

interface ComparisonTableProps {
  comparison: EvolutionComparison;
}

interface Row {
  label:         string;
  unit:          string;
  first?:        number;
  last?:         number;
  diff?:         number;
  pct?:          number;
  lowerIsBetter: boolean;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  comparison,
}) => {
  const rows: Row[] = [
    {
      label:         'Peso',
      unit:          'kg',
      first:         comparison.firstWeight,
      last:          comparison.lastWeight,
      diff:          comparison.weightDifference,
      pct:           comparison.weightChangePercentage,
      lowerIsBetter: true,
    },
    {
      label:         'IMC',
      unit:          '',
      first:         comparison.firstBmi,
      last:          comparison.lastBmi,
      diff:          comparison.bmiDifference,
      lowerIsBetter: true,
    },
    {
      label:         '% Gordura',
      unit:          '%',
      first:         comparison.firstBodyFat,
      last:          comparison.lastBodyFat,
      diff:          comparison.bodyFatDifference,
      pct:           comparison.bodyFatChangePercentage,
      lowerIsBetter: true,
    },
    {
      label:         'Massa Muscular',
      unit:          'kg',
      first:         comparison.firstMuscleMass,
      last:          comparison.lastMuscleMass,
      diff:          comparison.muscleMassDifference,
      pct:           comparison.muscleMassChangePercentage,
      lowerIsBetter: false,
    },
  ].filter((r) => r.first != null || r.last != null);

  const getDiffColor = (
    diff: number | undefined,
    lowerIsBetter: boolean
  ) => {
    if (diff == null || diff === 0) return 'neutral';
    const improved = lowerIsBetter ? diff < 0 : diff > 0;
    return improved ? 'good' : 'bad';
  };

  return (
    <TableContainer>
      <TableTitle>
        Comparativo: Avaliação #{comparison.firstEvaluationNumber}
        {' → '}#{comparison.lastEvaluationNumber}
        {comparison.daysBetween != null &&
          ` (${comparison.daysBetween} dias)`}
      </TableTitle>

      <Table>
        <TableHead>
          <tr>
            <Th>Métrica</Th>
            <Th align="right">
              Inicial
              <br />
              <small>{formatDate(comparison.firstEvaluationDate)}</small>
            </Th>
            <Th align="right">
              Atual
              <br />
              <small>{formatDate(comparison.lastEvaluationDate)}</small>
            </Th>
            <Th align="right">Diferença</Th>
          </tr>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            const direction = getDiffColor(row.diff, row.lowerIsBetter);
            return (
              <tr key={row.label}>
                <Td>{row.label}</Td>
                <Td align="right">
                  {row.first != null
                    ? `${row.first.toFixed(1)} ${row.unit}`
                    : '—'}
                </Td>
                <Td align="right">
                  {row.last != null
                    ? `${row.last.toFixed(1)} ${row.unit}`
                    : '—'}
                </Td>
                <TdDiff direction={direction} align="right">
                  {row.diff != null
                    ? `${row.diff > 0 ? '+' : ''}${row.diff.toFixed(1)} ${row.unit}`
                    : '—'}
                  {row.pct != null && (
                    <span className="pct">
                      ({row.pct > 0 ? '+' : ''}{row.pct.toFixed(1)}%)
                    </span>
                  )}
                </TdDiff>
              </tr>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

ComparisonTable.displayName = 'ComparisonTable';
