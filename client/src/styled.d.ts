import type { Theme } from '@styles/theme';
import 'styled-components';

declare module 'styled-components' {
  // A augmentação de módulo exige `interface` (type alias não faz merge),
  // e o corpo é intencionalmente vazio: herda tudo de `Theme`.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends Theme {}
}
