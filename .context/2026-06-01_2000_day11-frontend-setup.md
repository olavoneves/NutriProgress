# Day 11 — Setup Frontend + Design System

**Data:** 2026-06-01  
**Branch:** `feature/day11-frontend-setup` → PR #17 → `develop` → PR #18 → `main`  
**Commit main:** `d7dfa96`  
**Build:** ✅ `npm run build` sem erros TypeScript; dev server sobe em `:3000`; PWA Service Worker gerado

---

## O que foi implementado

### Packages instalados (client/)

**Runtime:**
- `recharts` ^3.8.1 — gráficos
- `date-fns` ^4.4.0 — formatação de datas
- `react-hook-form` ^7.77.0 — formulários
- `@hookform/resolvers` ^5.4.0 — integração zod
- `zod` ^4.4.3 — validação de schema
- `react-hot-toast` ^2.6.0 — notificações

**Dev:**
- `vite-plugin-pwa` — Service Worker + manifest
- `prettier` — formatação
- `@types/styled-components` — tipagem (styled-components v6 inclui nativamente, mas instalado por compat)

### Design System

**`src/styles/tokens.ts`**
- Design tokens puros: colors (primary/brand/gray/error/warning/success/info), typography (fontFamily/fontSize/fontWeight/lineHeight), spacing (numérico 0-20), borderRadius, shadows, breakpoints, zIndex, transitions
- Exporta `tokens` as const + tipo `Tokens`

**`src/styles/theme.ts`**
- `lightTheme` = spread do `theme` existente de `lib/theme/theme.ts` + aliases extras: `error` (= `danger`), `brand`/`brandHover`/`brandActive`, `borderRadius` (= `radii`)
- Mantém compatibilidade total com componentes existentes (que usam `theme.radii.*`, `theme.spacing.sm/md/lg`, `theme.colors.danger.*`)
- Exporta `Theme` = `typeof lightTheme`

**`src/styles/global.ts`**
- `GlobalStyles` (styled-components `createGlobalStyle`) — CSS vars em `:root`, reset CSS, tipografia base, scrollbar customizada, `::selection`, `@import Inter` font

**`src/styled.d.ts`**
- Augmenta `DefaultTheme` do styled-components: `extends Theme` (de `@styles/theme`)
- Garante que `${({ theme }) => theme.xxx}` seja totalmente tipado em todos os componentes

### Infraestrutura (vite.config.ts)

- **VitePWA:** `registerType: autoUpdate`, manifest embutido, Workbox com `NetworkFirst` para `/api/*` (TTL 5min, max 100 entries)
- **Novos aliases:** `@styles` → `src/styles`, `@routes` → `src/routes`
- **Build chunk splitting:** `vendor` (react/react-dom/react-router-dom), `charts` (recharts), `forms` (react-hook-form/@hookform/resolvers/zod), `styled` (styled-components)
- **Removido:** `vite.config.js` antigo (stale compiled artifact que bloqueava aliases novos)

### tsconfig.app.json

- Paths adicionados: `"@styles/*": ["./src/styles/*"]`, `"@routes/*": ["./src/routes/*"]`

### AuthContext (store/auth/AuthContext.tsx)

Reescrito com:
- **Reducer pattern:** `authReducer` com actions `AUTH_START / AUTH_SUCCESS / AUTH_FAILURE / AUTH_LOGOUT / CLEAR_ERROR`
- **Restore de sessão:** `useEffect` busca `getStoredTokens()` → chama `GET /nutritionists/me` → dispatch AUTH_SUCCESS ou AUTH_LOGOUT
- **`login(credentials)`:** POST `/auth/login`, chama `handleAuthSuccess`, faz dispatch AUTH_FAILURE em erro
- **`loginGoogle(idToken)`:** POST `/auth/google`, mesmo fluxo
- **`clearError()`:** limpa campo `error` no estado
- **Backward compat:** `useAuthContext` = alias de `useAuth`
- Interface `AuthContextValue extends AuthState` (user, isAuthenticated, isLoading, error + funções)

### API Endpoints (axios.config.ts)

Adicionados:
- `AUTH.REGISTER: '/auth/register'`
- `AUTH.GOOGLE: '/auth/google'`

### Entry Points

**`src/main.tsx`** — ordem: `setupInterceptors()` → `ThemeProvider(lightTheme)` → `GlobalStyles` → `App` → `Toaster`

**`src/App.tsx`** — ThemeProvider duplicado removido (agora só em main.tsx); mantém `ErrorBoundary` + `AuthProvider` + `BrowserRouter` + `AppRoutes`

### Arquivos de configuração

- **`.env.development`** — `VITE_API_BASE_URL=http://localhost:8080`, `VITE_APP_VERSION=1.0.0-dev`, `VITE_GOOGLE_CLIENT_ID`
- **`.env.example`** — template com URL de produção (Render)
- **`.prettierrc`** — singleQuote, semi, trailingComma es5, printWidth 80, tabWidth 2, endOfLine lf
- **`public/manifest.json`** — PWA manifest (name NutriProgress, theme_color #10b981, display standalone, icons 192/512)

---

## Gotchas Day 11

- **`vite.config.js` stale:** ao rodar `tsc -b`, o compilador não gera `.js` (emitDeclarationOnly), mas havia um `vite.config.js` de uma compilação anterior. Vite prefere `.js` sobre `.ts` → aliases novos eram ignorados. Solução: deletar `vite.config.js`, `vite.config.d.ts`, `vite.config.d.ts.map`
- **`DefaultTheme` em styled.d.ts:** deve estender `Theme` (typeof lightTheme), não `AppTheme` (typeof theme base). lightTheme tem propriedades extras (`error`, `brand`, `borderRadius`) que tornam os tipos incompatíveis se invertidos
- **Conflito `background`/`surface`:** o `theme` base tem `colors.background: string` e `colors.surface: string` (flat). O spec queria objetos `{ default, paper, elevated }` — causaria quebra nos componentes. Solução: lightTheme mantém as propriedades flat do tema base; a separação semântica fica só em tokens.ts
- **`lib/theme/theme.ts` usa `radii` (não `borderRadius`) e `spacing.xs/sm/md/lg` (não numérico):** todos os componentes existentes dependem dessa estrutura — não alterar. lightTheme adiciona `borderRadius: theme.radii` como alias paralelo

---

## Estado das features (client/)

### Completo e funcionando
- Todos os componentes UI: `Button` (5 variantes, loading, ícones), `Input` (3 variantes, label, erro), `Card`, `Modal`
- Layout: `Header`, `Sidebar` (collapse, badges, seções), `MainLayout` (Outlet pattern)
- Common: `Loading`, `ErrorBoundary`, `PrivateRoute`
- Hooks: `useDebounce`, `useLocalStorage`, `useMediaQuery` (+ useIsMobile/useIsTablet/useIsDesktop), `useClickOutside`
- Lib/api: `axios.config.ts` (api + apiRefresh + endpoints + HTTP_STATUS), `interceptors.ts` (refresh token automático, fila de requisições pendentes)
- Routes: `AppRoutes` (com Outlet + MainLayout + sidebarSections), `routes.config.ts`
- Utils: `formatters/date.ts` (formatDate, formatDateTime, formatRelative), `formatters/number.ts` (formatWeight, formatHeight, formatPercentage, formatBmi, formatCurrency), `constants.ts`
- Services: `StorageService`, `NotificationService`
- Features stubs: `auth/`, `dashboard/`, `patients/`, `evaluations/`, `profile/`

### Parcialmente implementado (stub/placeholder)
- `features/auth/pages/LoginPage.tsx` — existe, mas UI pode precisar de refinamento
- `features/auth/pages/RegisterPage.tsx` — existe
- `features/dashboard/pages/DashboardPage.tsx` — existe
- `features/patients/` — pages (List, Details, Create), hooks (usePatients, usePatientDetails), services
- `features/evaluations/` — pages (Create, Details, Evoluation), hooks (useEvaluations, useEvoluationData), services
- `features/profile/` — stub vazio
- `store/auth/AuthContext.tsx` — completo (Day 11); `store/theme/ThemeContext.tsx` — existe (toggle light/dark)

---

## Próximos passos sugeridos (Day 12+)

1. **Feature Auth:** página de Login completa com react-hook-form + zod + validação + integração real AuthContext
2. **Feature Auth:** página de Register com os mesmos padrões
3. **Feature Dashboard:** métricas reais (total pacientes, avaliações recentes), gráfico de evolução com recharts
4. **Feature Patients:** lista com busca/filtro/paginação, formulário de criação/edição completo
5. **Feature Evaluations:** formulário de criação, gráfico de evolução antropométrica
6. **Profile:** formulário de edição do nutricionista
7. **ThemeContext:** integrar toggle dark mode com lightTheme/darkTheme
