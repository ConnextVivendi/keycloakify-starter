# Abhängigkeiten
- `winget install --id chocolatey.chocolatey --source winget`
- `choco upgrade chocolatey`
- `choco install openjdk maven -y`
- `choco install nodejs -y`
- `npm install -g pnpm`

Bei Bedarf: `pnpm store prune`

# Keycloackify
- `pnpm install`
- `npx keycloakify add-story`
- `pnpm run storybook`

## CSS Anpassungen
- `src/login/visa.css`
- `import "./visa.css";` in `src/login/KcPage.tsx`
- Keycloak-Standardklassen (wie .kcFormCardClass) oder direkt Tailwind-Klassen überschreiben

## Template Anpassungen
- `npx keycloakify eject-page` -> `Template.tsx`