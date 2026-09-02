# Abhängigkeiten (Windows)

-   `winget install --id chocolatey.chocolatey --source winget`
-   `choco upgrade chocolatey`
-   `choco install openjdk maven -y`
-   `choco install nodejs -y`
-   `npm install -g yarn`

Optional bei Cache-Problemen:

-   `yarn cache clean`

# Keycloakify Workflow

-   `yarn install`
-   `npx keycloakify add-story`
-   `yarn storybook`
-   `npm run build-keycloak-theme`

## CSS-Anpassungen

-   Datei: `src/login/visa.css`
-   Einbindung: `import "./visa.css";` in `src/login/KcPage.tsx`
-   Styling über Keycloak-Klassen (`kc*Class`) und projektspezifische Klassen

## Template-Anpassungen

-   `npx keycloakify eject-page`
-   Ergebnisdatei: `src/login/Template.tsx`

# Erweiterung: assist-login-hint.ftl

Bestätigungsseite der **verkürzten Anmeldung** (FLW-312). Auf geteilten Pflegegeräten merkt sich die
VIVA Flow App die letzten zehn erfolgreichen Anmeldungen lokal und startet die Authorize-Anfrage mit
`login_hint` neu. Diese Seite begrüßt das gemerkte Konto, bevor Keycloak das Kennwort abfragt.

Gerendert wird sie vom SPI `assist-login-hint-authenticator`
(`VivendiServices/keycloak-assist-extensions`), der als REQUIRED-Schritt vor
`auth-username-password-form` in `Assist-Browser-Flow forms` läuft.

## Ziel

-   Rendering und Styling der Custom-FTL-Seite in React/Keycloakify
-   Typsichere Abbildung der vom Authenticator gesetzten `kcContext`-Felder
-   Storybook-Vorschau für lokale Validierung

## Wichtig: alle Anzeigewerte stammen aus dem Request, nicht aus einem User-Lookup

`assistLoginHintEmail` ist der zurückgespiegelte `login_hint`; `assistLoginHintName` ist das vom
Aufrufer mitgegebene `viva_login_name` (im Java-Teil bereinigt und längenbegrenzt). Es findet
**bewusst kein User-Lookup und kein `context.setUser()`** statt — sonst könnte eine selbst gebaute
Authorize-URL verraten, ob eine Adresse existiert. Die Seite darf deshalb **nichts** anzeigen, was
nicht aus dem Request stammt.

Zwei Folgen für diese Seite:

-   Der Name ist **nicht verifiziert** — die Adresse steht immer daneben, weil sie der ehrliche Teil
    ist: sie ist der Benutzername, der anschließend authentifiziert wird.
-   Weil kein User gesetzt ist, ist `auth.showUsername` false und `Template.tsx` rendert den
    `headerNode`. Würde der Authenticator wieder `setUser()` aufrufen, ersetzt `Template.tsx` die
    Begrüßung stillschweigend durch den eigenen `kc-username`-Block (gleiche Bedingung wie in
    Keycloaks `base/login/template.ftl`).

## Diese Seite sammelt kein Passwort

Drei Buttons posten jeweils ein eigenes `assistAction` (`continue` / `passkey` / `restart`) an
`url.loginAction`. Authentifiziert wird erst im nächsten Schritt durch Keycloaks eigenes
`auth-username-password-form`.

## Relevante Dateien

-   `src/login/pages/AssistLoginHint.tsx`
    -   React-Implementierung (Begrüßung als `headerNode`, Identitätszeile, drei Block-Buttons)
-   `src/login/KcPage.tsx`
    -   Routing-Erweiterung: `case "assist-login-hint.ftl"`
-   `src/login/KcContext.ts`
    -   Typ-Erweiterung für `assist-login-hint.ftl`
-   `src/login/KcPageStory.tsx`
    -   Mock-Daten in `kcContextExtensionPerPage` für Storybook
-   `src/login/pages/AssistLoginHint.stories.tsx`
    -   Storybook-Stories: Default, ohne Namen, mit Passkey, lange Werte
-   `src/login/i18n.ts`
    -   Übersetzungs-Keys
-   `src/login/visa.css`
    -   `.kc-hint-identity`, `.kc-hint-initials`, `.kc-hint-email`

## kcContext-Felder (vom Authenticator via `form.setAttribute` gesetzt)

-   `assistLoginHintName` — Anzeigename, `""` wenn nicht mitgegeben
-   `assistLoginHintEmail` — der `login_hint`
-   `assistLoginHintInitials` — zwei Buchstaben für den Avatar
-   `assistLoginHintOfferPasskey` — schaltet den Passkey-Button (Default false)

## i18n-Keys für assist-login-hint

-   `assistLoginHintTitle`
-   `assistLoginHintTitleNamed`
-   `assistLoginHintContinue`
-   `assistLoginHintPasskey`
-   `assistLoginHintNotYou`
-   `assistLoginHintNotYouNamed`

Diese Keys existieren **doppelt**: hier für die React-Seite und als `.properties` im Provider-JAR
(`theme-resources/messages/`) für dessen FTL-Fallback. Nichts hält beide synchron — bei Textänderungen
beide Seiten pflegen. Die `assistOtp*`-Keys driften bereits so.

## Validierung

-   Storybook prüfen: `yarn storybook` → `login/assist-login-hint.ftl`
-   Build prüfen: `yarn build`
-   Theme-JAR bauen: `npm run build-keycloak-theme` (benötigt Maven auf dem PATH)

---

# Erweiterung: assist-login-otp.ftl

Dieses Projekt enthält eine Keycloakify-Erweiterung für eine nicht im Keycloak-Standard enthaltene Seite: `assist-login-otp.ftl`.

## Ziel

-   Rendering und Styling der Custom-FTL-Seite in React/Keycloakify
-   Typsichere Abbildung der benötigten `kcContext`-Daten
-   Storybook-Vorschau für lokale Validierung

## Relevante Dateien

-   `src/login/pages/AssistLoginOtp.tsx`
    -   React-Implementierung der Seite (Header, OTP-Formular, Fehlermeldung, Submit)
-   `src/login/KcPage.tsx`
    -   Routing-Erweiterung: `case "assist-login-otp.ftl"`
-   `src/login/KcContext.ts`
    -   Typ-Erweiterung für `assist-login-otp.ftl` (benötigte Context-Felder)
-   `src/login/KcPageStory.tsx`
    -   Mock-Daten in `kcContextExtensionPerPage` für Storybook
-   `src/login/pages/AssistLoginOtp.stories.tsx`
    -   Storybook-Story der Seite
-   `src/login/i18n.ts`
    -   Übersetzungs-Keys für die OTP-spezifischen Texte/Fehler

## i18n-Keys für assist-login-otp

-   `assistOtpServiceTimeout`
-   `assistOtpServiceError`
-   `assistOtpInvalidFormat`
-   `assistOtpInvalidCode`
-   `assistOtpTitle`
-   `assistOtpLabel`
-   `assistOtpInstruction`

## Validierung

-   Storybook prüfen: `yarn storybook`
-   Build prüfen: `yarn build`

## Footer (global, i18n-basiert)

-   Komponente: `src/login/components/Footer.tsx`
-   Einbindung: `<Footer i18n={i18n} />` am Ende des Root-`<div>` in `Template.tsx`
-   Links ausschließlich in `FOOTER_LINKS`-Array konfigurieren
-   Neuen Link hinzufügen: Eintrag in `FOOTER_LINKS` + i18n-Key in `i18n.ts`
-   i18n-Keys: `footer_imprint`, `footer_privacy`
-   Styling: `.kc-footer` in `visa.css`

---

# Erweiterung: otp-form.ftl

E-Mail-basiertes OTP-Formular (Custom SPI). Zeigt die E-Mail-Adresse des Nutzers im Header, ein Eingabefeld für den Einmalcode sowie Submit- und Resend-Button.

## Relevante Dateien

-   `src/login/pages/OtpForm.tsx`
-   `src/login/pages/OtpForm.stories.tsx`
-   `src/login/KcContext.ts` – `"otp-form.ftl"`: `auth.attemptedUsername`, `url.loginRestartFlowUrl`, `url.loginAction`
-   `src/login/KcPageStory.tsx` – Mock: `attemptedUsername`, `loginRestartFlowUrl`, `loginAction`

## Hinweis: Username-Header statt Titel (bewusst so)

`OtpForm.tsx`, `ViewEmail.tsx` und `ViewEmailContinuation.tsx` rendern im `headerNode` einen Username+„Login neu starten"-Block statt eines schlichten Titels. Das ist kein Inkonsistenz-Bug: `Template.tsx` (Base-Keycloakify) macht bei nativen Seiten automatisch genau das, wenn `auth.showUsername && !auth.showResetCredentials` gilt – für Custom-SPI-Seiten fehlt dieses Feld im Context, daher wird das Verhalten hier manuell nachgebaut. Nicht angleichen.

## i18n-Keys

-   `loginOtpOneTime`, `loginOtpOneTimeDescription`, `loginOtpOneTimeDescription2`, `loginOtpOneTime2faHint`, `doResend`

## UI-Konsistenz (Alignment-Pass)

-   Button-Hierarchie korrigiert: `submit` bleibt `kcButtonPrimaryClass`, `resend` auf `kcButtonDefaultClass` (sekundär) geändert – vorher waren beide Primary, was keine klare Handlungsempfehlung gab. Inline-`style={{ display: "flex", gap: "0.5rem" }}` am Button-Container entfernt (Layout kommt jetzt ausschließlich aus `kcFormButtonsClass`, analog zu `LoginConfigTotp.tsx`/`LoginRecoveryAuthnCodeConfig.tsx`).
-   Beide Buttons zusätzlich mit `kcButtonBlockClass` (PatternFly `pf-m-block`, `width: 100%`) versehen, damit sie – wie bei `webauthn-register.ftl`/`trusted-device-register.ftl` – untereinander statt nebeneinander stehen. Ohne `kcButtonBlockClass` sind `<input type="submit">`-Elemente `inline-block` und rutschen nebeneinander, sobald Platz reicht; das war der eigentliche Grund für das abweichende Layout, nicht der zuvor entfernte Flex-Container.
-   `pf-m-block` selbst definiert keinen Abstand zwischen zwei gestapelten Buttons (nur `display: block; width: 100%`). Analog zur bestehenden `#kc-trusted-device-no { margin-top: 10px; }`-Regel (siehe `trusted-device-register.ftl`) wurde `#kc-resend { margin-top: 10px; }` in `visa.css` ergänzt, damit Submit- und Resend-Button nicht ohne Abstand aneinanderkleben.
-   Inline-Styles am Username-Header (`style={{ fontSize: "16px" }}`) und am 2FA-Hinweistext (`style={{ fontStyle: "italic" }}`) durch CSS-Klassen ersetzt: `.kc-otp-username`, `.kc-otp-2fa-hint` in `visa.css`.

---

# Erweiterung: view-email.ftl

Warteseite nach dem Versenden des Magic-Link-E-Mails. Zeigt die E-Mail-Adresse des Nutzers und die Aufforderung, auf den Link in der E-Mail zu klicken.

## Relevante Dateien

-   `src/login/pages/ViewEmail.tsx`
-   `src/login/pages/ViewEmail.stories.tsx`
-   `src/login/KcContext.ts` – `"view-email.ftl"`: `auth.attemptedUsername`

## i18n-Keys

-   `magicLinkConfirmation`

## Bugfix (Alignment-Pass)

-   `<span className="kc-tooltip-text">${msg("restartLoginTooltip")}</span>` verwendete `${...}`-Syntax außerhalb eines Template-Literals – Nutzer sahen den literalen String `${...}` statt des übersetzten Tooltip-Texts. Korrigiert zu `{msg("restartLoginTooltip")}`.
-   Inline-`style={{ display: "flex", justifyContent: "center" }}` am Username-Header durch Klasse `.kc-username-centered` (`visa.css`) ersetzt.

---

# Erweiterung: view-email-continuation.ftl

Wartet im ursprünglichen Browser-Tab auf die Bestätigung des Magic Links (anderer Tab oder Gerät). Lädt die Seite automatisch alle 5 Sekunden neu (`setTimeout` + `window.location.reload()`), bis die Sitzung fortgesetzt wird.

## Relevante Dateien

-   `src/login/pages/ViewEmailContinuation.tsx`
-   `src/login/pages/ViewEmailContinuation.stories.tsx`
-   `src/login/KcContext.ts` – `"view-email-continuation.ftl"`: `auth.attemptedUsername`

## i18n-Keys

-   `magicLinkContinuationConfirmation`

## Bugfix (Alignment-Pass)

-   Gleicher `${msg(...)}`-Tippfehler wie in `view-email.ftl` (siehe dort) behoben; gleiche Umstellung von Inline-Flex-Style auf `.kc-username-centered`.

---

# Erweiterung: email-confirmation.ftl

Bestätigungsseite, die im neuen Tab erscheint, nachdem der Nutzer auf den Magic Link geklickt hat. Zeigt bei `sameBrowser: true` einen Link zurück zur Login-Seite.

## Relevante Dateien

-   `src/login/pages/EmailConfirmation.tsx`
-   `src/login/pages/EmailConfirmation.stories.tsx`
-   `src/login/KcContext.ts` – `"email-confirmation.ftl"`: `magicLinkContinuation.sameBrowser`, `magicLinkContinuation.url`

## i18n-Keys

-   `magicLinkSuccessfulLogin`, `loginPage`

## UI-Konsistenz (Alignment-Pass)

-   Inline-`style={{ marginBottom: ".5rem" }}` an der Erfolgsmeldung durch Klasse `.kc-email-confirmation-message` (`visa.css`) ersetzt.

---

# Erweiterung: email-confirmation-error.ftl

Fehlerseite, wenn die Magic-Link-Sitzung abgelaufen ist oder mehrere Browser-Tabs das Login gleichzeitig versuchen.

## Relevante Dateien

-   `src/login/pages/EmailConfirmationError.tsx`
-   `src/login/pages/EmailConfirmationError.stories.tsx`
-   `src/login/KcContext.ts` – `"email-confirmation-error.ftl"`: `{}` (keine Custom-Felder)

## i18n-Keys

-   `magicLinkFailLogin`, `multipleSessionsError`

---

# Erweiterung: trusted-device-register.ftl

Custom-SPI-Seite: fragt den Nutzer, ob dem aktuellen Gerät vertraut werden soll. Der „Ja"-Button öffnet einen `window.prompt()` zur Umbenennung des Geräts (gleiche Logik wie im Original-FTL). Der Gerätename wird als verstecktes Feld `trusted-device-name` übermittelt; der Button `trusted-device` sendet den Wert `yes` bzw. `no`.

## Relevante Dateien

-   `src/login/pages/TrustedDeviceRegister.tsx`
-   `src/login/pages/TrustedDeviceRegister.stories.tsx`
-   `src/login/KcContext.ts` – `"trusted-device-register.ftl"`: `trustedDeviceName`, `url.loginAction`
-   `src/login/KcPageStory.tsx` – Mock: `trustedDeviceName: "Chrome on Windows"`, `loginAction: "#"`
-   `src/login/visa.css` – `#kc-trusted-device-no { margin-top: 10px; }` (aus FTL-Inline-Style übernommen)

## i18n-Keys (entsprechen den SPI-Message-Bundle-Keys)

-   `trustedDeviceDisplayName` → `trusted-device-display-name`
-   `trustedDeviceHelpText` → `trusted-device-help-text`
-   `trustedDeviceHeader` → `trusted-device-header`
-   `trustedDeviceYes` → `trusted-device-yes`
-   `trustedDeviceNo` → `trusted-device-no`
-   `trustedDeviceExplanation` → `trusted-device-explanation`
-   `trustedDeviceName` → `trusted-device-name`

---

# Anpassung: login-otp.ftl

Native Keycloak-Seite (keine Context-Erweiterung nötig) für den Login mit einem bereits eingerichteten OTP-Credential (Authenticator-App, z. B. Google/Microsoft Authenticator, oder Hardware-Token). Anlass der Anpassung: Support-Tickets, weil Nutzer die Seite mit dem E-Mail-Code aus `otp-form.ftl` verwechselt haben und keine E-Mail erwarteten.

## Änderungen

-   Eigener Titel `loginOtpTitle` statt generischem `doLogIn`
-   Instruction-Text `loginOtpInstruction`, der explizit auf die Authenticator-App verweist
-   Input: `autoComplete="one-time-code"` (statt `off`, damit Passwort-Manager wie 1Password/Bitwarden generierte TOTP-Codes vorschlagen können) sowie `inputMode="numeric"` + `pattern="[0-9]*"` für die numerische Mobile-Tastatur

Dieselbe Autofill-/Numerik-Anpassung wurde konsistent auch auf `assist-login-otp.ftl` und `otp-form.ftl` übertragen; `otp-form.ftl` hat zusätzlich einen Doppel-Submit-Schutz (`isSubmitting`) analog zu `login-otp.ftl`/`assist-login-otp.ftl` erhalten.

## Bugfix: zu großer Abstand zwischen Instruction-Text und Submit-Button

`loginOtpInstruction` (in `#kc-form-options`) und der Submit-Button (in `#kc-form-buttons`) steckten in zwei **separaten** `.form-group`-Divs statt – wie im offiziellen Keycloakify-Default-Template (`node_modules/keycloakify/src/login/pages/LoginOtp.tsx`) und in `otp-form.ftl` – in einem **gemeinsamen** `.form-group`. Durch den Bootstrap-Clearfix `.form-horizontal .form-group:before/:after { display: table; clear: both }` kollabieren die `.form-group`-Margin (15px) und die globale `#kc-form-buttons { margin-top: 20px; }`-Regel (aus `login.css`) bei getrennten Divs NICHT (Summe: 35px statt der üblichen 20px). Korrigiert durch Zusammenführen von `#kc-form-options` und `#kc-form-buttons` in ein gemeinsames `.form-group`, wie im Original-Template. Gleicher Fix in `assist-login-otp.ftl`.

## Relevante Dateien

-   `src/login/pages/LoginOtp.tsx`
-   `src/login/pages/LoginOtp.stories.tsx`
-   `src/login/pages/AssistLoginOtp.tsx`
-   `src/login/i18n.ts` – `loginOtpTitle`, `loginOtpInstruction`

---

# Standardseiten-Überschreibungen (native Keycloak-FTL, ohne Context-Erweiterung)

Folgende Seiten sind reguläre Keycloak-FTL-Seiten (keine Custom-SPI, kein Eintrag in `KcContextExtensionPerPage`), die per `npx keycloakify eject-page` übernommen und im VISA-Design neu implementiert wurden:

-   `webauthn-register.ftl` → `src/login/pages/WebauthnRegister.tsx`
-   `login-update-password.ftl` → `src/login/pages/LoginUpdatePassword.tsx`
-   `update-email.ftl` → `src/login/pages/UpdateEmail.tsx`
-   `login-config-totp.ftl` → `src/login/pages/LoginConfigTotp.tsx`
-   `login-recovery-authn-code-config.ftl` → `src/login/pages/LoginRecoveryAuthnCodeConfig.tsx`
-   `error.ftl` → `src/login/pages/Error.tsx` (siehe eigener Abschnitt „Anpassung: error.ftl" für die abweichende Redirect-Logik)

Routing für alle sechs erfolgt lazy-geladen in `src/login/KcPage.tsx`.

---

# Anpassung: error.ftl

Native Keycloak-Seite (keine Context-Erweiterung nötig, `message`/`client`/`skipLink` sind bereits Teil des Basis-`KcContext`). Anlass der Anpassung: Nutzer landeten bei Fehlern (z. B. „Cookie not found", wenn `client.baseUrl` nicht gesetzt war) auf einer Sackgasse ohne Weg zurück zur Anwendung.

## Ziel-URL-Auflösung

-   `client.baseUrl` (Keycloak Admin: „Home URL"), falls gesetzt → gilt als **bestätigtes** Ziel.
-   Sonst Fallback auf hartkodiertes `https://services.connext.de` (`FALLBACK_BASE_URL` in `Error.tsx`) → gilt als **nicht bestätigt**, da nicht client-spezifisch verifiziert.

## Redirect-/Button-Verhalten

| Fall                                                         | Verhalten                                                                                                                                   |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `skipLink === true`                                          | Kein Link, kein Button, kein Redirect (Keycloak-Signal wird respektiert)                                                                    |
| „Cookie not found"-Fehler **und** `client.baseUrl` bestätigt | Sofortiger Redirect, keine Verzögerung, kein Hinweistext                                                                                    |
| Anderer Fehler, `client.baseUrl` bestätigt                   | Redirect nach 60 Sekunden (`DELAYED_REDIRECT_SECONDS`), mit Hinweistext (`errorRedirectNotice`) und manuellem Button für sofortigen Wechsel |
| `client.baseUrl` leer (Fallback-URL aktiv)                   | Nur Button, kein automatischer Redirect (Ziel für diesen Client nicht offiziell bestätigt)                                                  |

## Hinweis: Erkennung des „Cookie not found"-Fehlers (Heuristik, kein stabiler Key-Vergleich)

Keycloak liefert für diesen Fehler nur den bereits übersetzten Fließtext in `message.summary`, keinen stabilen Message-Key. Erkennung erfolgt daher über `String.includes(...)` auf einen kurzen Teilstring statt auf den vollständigen Standardtext (`cookieNotFoundMessage` in `keycloakify/src/login/i18n/messages_defaultSet/{en,de}.ts`), damit realmspezifische Anpassungen des restlichen Satzes die Erkennung nicht brechen:

-   Englisch: `"Cookie not found"`
-   Deutsch: `"Cookie konnte nicht gefunden werden"`

Wird der Anfang dieser Texte in einem Realm überschrieben, greift die Sofort-Redirect-Logik nicht mehr und der Fehler fällt in den 60-Sekunden-Zweig zurück.

## Relevante Dateien

-   `src/login/pages/Error.tsx`
-   `src/login/pages/Error.stories.tsx`
-   `src/login/KcPage.tsx` – Routing-Erweiterung: `case "error.ftl"`
-   `src/login/visa.css` – `.kc-error-redirect-notice`

## i18n-Keys

-   `errorBackToAccountManagement`
-   `errorRedirectNotice` (mit `{0}`-Platzhalter für die Sekundenanzahl)

## Feature-Flags (`src/login/config.ts`)

-   `SHOW_LOGOUT_SESSIONS`: steuert, ob die Checkbox „Andere Sitzungen abmelden" (`logoutOtherSessions`) sichtbar ist. Aktuell `false` – bei `false` wird stattdessen ein verstecktes Feld `logout-sessions=on` gerendert, damit das Backend-Verhalten unverändert bleibt.
-   Wird von allen fünf oben genannten Seiten konsistent über eine lokale `LogoutOtherSessions`-Helper-Komponente pro Seite verwendet.
-   Neue Feature-Flags hier ergänzen, nicht seitenlokal hardcoden.
