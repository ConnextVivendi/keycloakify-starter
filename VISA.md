# Abhängigkeiten (Windows)
- `winget install --id chocolatey.chocolatey --source winget`
- `choco upgrade chocolatey`
- `choco install openjdk maven -y`
- `choco install nodejs -y`
- `npm install -g yarn`

Optional bei Cache-Problemen:
- `yarn cache clean`

# Keycloakify Workflow
- `yarn install`
- `npx keycloakify add-story`
- `yarn storybook`
- `npm run build-keycloak-theme`

## CSS-Anpassungen
- Datei: `src/login/visa.css`
- Einbindung: `import "./visa.css";` in `src/login/KcPage.tsx`
- Styling über Keycloak-Klassen (`kc*Class`) und projektspezifische Klassen

## Template-Anpassungen
- `npx keycloakify eject-page`
- Ergebnisdatei: `src/login/Template.tsx`

# Erweiterung: assist-login-otp.ftl

Dieses Projekt enthält eine Keycloakify-Erweiterung für eine nicht im Keycloak-Standard enthaltene Seite: `assist-login-otp.ftl`.

## Ziel
- Rendering und Styling der Custom-FTL-Seite in React/Keycloakify
- Typsichere Abbildung der benötigten `kcContext`-Daten
- Storybook-Vorschau für lokale Validierung

## Relevante Dateien
- `src/login/pages/AssistLoginOtp.tsx`
	- React-Implementierung der Seite (Header, OTP-Formular, Fehlermeldung, Submit)
- `src/login/KcPage.tsx`
	- Routing-Erweiterung: `case "assist-login-otp.ftl"`
- `src/login/KcContext.ts`
	- Typ-Erweiterung für `assist-login-otp.ftl` (benötigte Context-Felder)
- `src/login/KcPageStory.tsx`
	- Mock-Daten in `kcContextExtensionPerPage` für Storybook
- `src/login/pages/AssistLoginOtp.stories.tsx`
	- Storybook-Story der Seite
- `src/login/i18n.ts`
	- Übersetzungs-Keys für die OTP-spezifischen Texte/Fehler

## i18n-Keys für assist-login-otp
- `assistOtpServiceTimeout`
- `assistOtpServiceError`
- `assistOtpInvalidFormat`
- `assistOtpInvalidCode`
- `assistOtpTitle`
- `assistOtpLabel`
- `assistOtpInstruction`

## Validierung
- Storybook prüfen: `yarn storybook`
- Build prüfen: `yarn build`

## Footer (global, i18n-basiert)
- Komponente: `src/login/components/Footer.tsx`
- Einbindung: `<Footer i18n={i18n} />` am Ende des Root-`<div>` in `Template.tsx`
- Links ausschließlich in `FOOTER_LINKS`-Array konfigurieren
- Neuen Link hinzufügen: Eintrag in `FOOTER_LINKS` + i18n-Key in `i18n.ts`
- i18n-Keys: `footer_imprint`, `footer_privacy`
- Styling: `.kc-footer` in `visa.css`