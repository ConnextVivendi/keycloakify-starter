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

---

# Erweiterung: otp-form.ftl

E-Mail-basiertes OTP-Formular (Custom SPI). Zeigt die E-Mail-Adresse des Nutzers im Header, ein Eingabefeld für den Einmalcode sowie Submit- und Resend-Button.

## Relevante Dateien
- `src/login/pages/OtpForm.tsx`
- `src/login/pages/OtpForm.stories.tsx`
- `src/login/KcContext.ts` – `"otp-form.ftl"`: `auth.attemptedUsername`, `url.loginRestartFlowUrl`, `url.loginAction`
- `src/login/KcPageStory.tsx` – Mock: `attemptedUsername`, `loginRestartFlowUrl`, `loginAction`

## i18n-Keys
- `loginOtpOneTime`, `loginOtpOneTimeDescription`, `loginOtpOneTimeDescription2`, `loginOtpOneTime2faHint`, `doResend`

---

# Erweiterung: view-email.ftl

Warteseite nach dem Versenden des Magic-Link-E-Mails. Zeigt die E-Mail-Adresse des Nutzers und die Aufforderung, auf den Link in der E-Mail zu klicken.

## Relevante Dateien
- `src/login/pages/ViewEmail.tsx`
- `src/login/pages/ViewEmail.stories.tsx`
- `src/login/KcContext.ts` – `"view-email.ftl"`: `auth.attemptedUsername`

## i18n-Keys
- `magicLinkConfirmation`

---

# Erweiterung: view-email-continuation.ftl

Wartet im ursprünglichen Browser-Tab auf die Bestätigung des Magic Links (anderer Tab oder Gerät). Lädt die Seite automatisch alle 5 Sekunden neu (`setTimeout` + `window.location.reload()`), bis die Sitzung fortgesetzt wird.

## Relevante Dateien
- `src/login/pages/ViewEmailContinuation.tsx`
- `src/login/pages/ViewEmailContinuation.stories.tsx`
- `src/login/KcContext.ts` – `"view-email-continuation.ftl"`: `auth.attemptedUsername`

## i18n-Keys
- `magicLinkContinuationConfirmation`

---

# Erweiterung: email-confirmation.ftl

Bestätigungsseite, die im neuen Tab erscheint, nachdem der Nutzer auf den Magic Link geklickt hat. Zeigt bei `sameBrowser: true` einen Link zurück zur Login-Seite.

## Relevante Dateien
- `src/login/pages/EmailConfirmation.tsx`
- `src/login/pages/EmailConfirmation.stories.tsx`
- `src/login/KcContext.ts` – `"email-confirmation.ftl"`: `magicLinkContinuation.sameBrowser`, `magicLinkContinuation.url`

## i18n-Keys
- `magicLinkSuccessfulLogin`, `loginPage`

---

# Erweiterung: email-confirmation-error.ftl

Fehlerseite, wenn die Magic-Link-Sitzung abgelaufen ist oder mehrere Browser-Tabs das Login gleichzeitig versuchen.

## Relevante Dateien
- `src/login/pages/EmailConfirmationError.tsx`
- `src/login/pages/EmailConfirmationError.stories.tsx`
- `src/login/KcContext.ts` – `"email-confirmation-error.ftl"`: `{}` (keine Custom-Felder)

## i18n-Keys
- `magicLinkFailLogin`, `multipleSessionsError`

---

# Erweiterung: trusted-device-register.ftl

Custom-SPI-Seite: fragt den Nutzer, ob dem aktuellen Gerät vertraut werden soll. Der „Ja"-Button öffnet einen `window.prompt()` zur Umbenennung des Geräts (gleiche Logik wie im Original-FTL). Der Gerätename wird als verstecktes Feld `trusted-device-name` übermittelt; der Button `trusted-device` sendet den Wert `yes` bzw. `no`.

## Relevante Dateien
- `src/login/pages/TrustedDeviceRegister.tsx`
- `src/login/pages/TrustedDeviceRegister.stories.tsx`
- `src/login/KcContext.ts` – `"trusted-device-register.ftl"`: `trustedDeviceName`, `url.loginAction`
- `src/login/KcPageStory.tsx` – Mock: `trustedDeviceName: "Chrome on Windows"`, `loginAction: "#"`
- `src/login/visa.css` – `#kc-trusted-device-no { margin-top: 10px; }` (aus FTL-Inline-Style übernommen)

## i18n-Keys (entsprechen den SPI-Message-Bundle-Keys)
- `trustedDeviceDisplayName` → `trusted-device-display-name`
- `trustedDeviceHelpText` → `trusted-device-help-text`
- `trustedDeviceHeader` → `trusted-device-header`
- `trustedDeviceYes` → `trusted-device-yes`
- `trustedDeviceNo` → `trusted-device-no`
- `trustedDeviceExplanation` → `trusted-device-explanation`
- `trustedDeviceName` → `trusted-device-name`