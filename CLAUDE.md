---
applyTo: "**"
---

# Keycloakify Login-Theme – Agent Instructions

Dieses Projekt ist ein **Keycloakify**-basiertes Keycloak-Login-Theme (React + TypeScript + Vite).
Halte dich strikt an die folgenden Konventionen.

---

## Paketmanager

Dieses Projekt verwendet **yarn**. Ausschließlich:

```bash
yarn install                    # Abhängigkeiten installieren
npm run build-keycloak-theme    # Theme-JAR bauen → dist_keycloak/
yarn storybook                  # Lokale Vorschau starten
yarn format                     # Prettier auf alle Dateien anwenden
yarn cache clean                # Cache leeren
npx keycloakify ...             # Keycloakify-CLI (bleibt npx)
npx eslint .                    # Linting ausführen
```

Niemals `npm install`, `pnpm install` oder `pnpm run` verwenden.

---

## Build / Validierung

```bash
# Vollständiger Build (tsc + Vite + Keycloakify-Packaging)
npm run build-keycloak-theme

# Nur TypeScript-Check + Vite-Build
yarn build

# Visuelle Validierung einzelner Seiten
yarn storybook
# → im Browser zur Story navigieren: login/<page-id>
```

**Kein Test-Runner vorhanden** (kein Jest, kein Vitest).
Storybook ist das einzige automatisierte Validierungstool.
`npm run build-keycloak-theme` ist der finale Validierungsschritt — er führt `tsc` + Vite-Build + Keycloakify-Packaging durch.

Build-Ausgabe: `dist_keycloak/` – deployable Keycloak-Theme-JAR.

---

## Projektstruktur

```
src/
  kc.gen.tsx                  # Auto-generiert – nicht manuell bearbeiten
  main.tsx                    # Einstiegspunkt
  assets/                     # Statische Assets (SVG, Bilder)
  login/
    KcPage.tsx                # Seiten-Router – hier neue Seiten eintragen
    KcContext.ts              # Typ-Erweiterungen für Custom-FTL-Seiten
    KcPageStory.tsx           # Storybook-Mock-Daten
    Template.tsx              # Globales Layout (Logo, Footer, Meldungen)
    i18n.ts                   # Alle Custom-Übersetzungskeys
    visa.css                  # Gesamtes Custom-CSS, einmalig importiert
    components/
      Footer.tsx              # Globale Footer-Komponente
    pages/
      *.tsx                   # Eine Datei pro Seite
      *.stories.tsx           # Storybook-Story pro Seite
```

---

## TypeScript

-   **Strict-Modus** aktiv: `strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true`
-   Target: `ES2020`, Modulauflösung: `bundler`
-   JSX-Transform: `react-jsx` — **kein `import React from "react"` erforderlich**
-   `allowImportingTsExtensions: true` — `.tsx`-Dateien direkt importieren
-   Unbenutzte Variablen und Parameter sind **Kompilierfehler**, keine Warnungen
-   Type-only Imports mit `import type { Foo } from "..."` kennzeichnen

---

## Code-Style (Prettier)

| Einstellung     | Wert                                    |
| --------------- | --------------------------------------- |
| Print Width     | 90 (Seiten/Templates: 150)              |
| Tab Width       | 4 Leerzeichen (keine Tabs)              |
| Semicolons      | Ja                                      |
| Quotes          | Doppelte Anführungszeichen (`"`)        |
| Trailing Commas | Keine                                   |
| Arrow Parens    | Weglassen bei einem Argument (`x => x`) |
| Bracket Spacing | Ja                                      |

`yarn format` formatiert alle Dateien. Konfiguration in `.prettierrc.json`.

---

## ESLint

-   ESLint 9 Flat Config (`eslint.config.js`)
-   Plugins: `typescript-eslint`, `react`, `react-hooks`, `react-refresh`, `storybook`
-   `react-hooks/exhaustive-deps` ist projektbedingt **deaktiviert**
-   Formatting-Regeln an Prettier delegiert (via `eslint-config-prettier`)
-   Deaktivierte Regeln: `@typescript-eslint/no-redeclare`, `no-labels`

---

## Namenskonventionen

| Entität               | Konvention                   | Beispiel                           |
| --------------------- | ---------------------------- | ---------------------------------- |
| React-Komponenten     | PascalCase                   | `AssistLoginOtp`                   |
| Dateien (Komponenten) | PascalCase                   | `AssistLoginOtp.tsx`               |
| i18n-Keys             | camelCase mit Feature-Präfix | `assistOtpTitle`, `footer_imprint` |
| CSS-Klassen (custom)  | `.kc-`-Präfix                | `.kc-footer`, `.kc-logo`           |
| Konstanten            | SCREAMING_SNAKE_CASE         | `FOOTER_LINKS`                     |
| Page-IDs (FTL)        | kebab-case `.ftl`            | `assist-login-otp.ftl`             |

---

## Komponenten-Patterns

### Seiten-Komponente (Signatur)

```tsx
export default function MyPage(
    props: PageProps<Extract<KcContext, { pageId: "my-page.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });
    const { msg, msgStr } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("myPageTitle")}
        >
            {/* Inhalt */}
        </Template>
    );
}
```

### Storybook-Story (Muster)

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "my-page.ftl" });

const meta = {
    title: "login/my-page.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <KcPageStory /> };
```

---

## Template (`Template.tsx`)

-   Ist das **einzige** globale Layout für alle Seiten
-   Enthält: Logo, Sprachumschalter, Flash-Messages, Footer
-   Seitenspezifische Logik gehört **nicht** in `Template.tsx`
-   `i18n` wird als Prop übergeben und an Unterkomponenten weitergegeben

---

## Footer

-   Komponente: `src/login/components/Footer.tsx`
-   Einbindung: `<Footer i18n={i18n} />` am Ende des Root-`<div>` in `Template.tsx`
-   Links **ausschließlich** im `FOOTER_LINKS`-Array in `Footer.tsx` definieren
-   **Niemals** `<a>`-Tags hardcoded außerhalb des `.map()` schreiben
-   Neuen Link hinzufügen:
    1. Eintrag in `FOOTER_LINKS` mit `href` und `labelKey`
    2. Key in `i18n.ts` für `en` und `de` ergänzen
       → kein weiterer Code notwendig

---

## i18n

-   Alle Custom-Keys in `src/login/i18n.ts` via `i18nBuilder.withCustomTranslations()`
-   Immer für **beide** Sprachen (`en` und `de`) pflegen
-   Namenskonvention: `camelCase`, Feature-Präfix (z. B. `footer_imprint`, `assistOtpTitle`)
-   Zugriff via `i18n.msg(key)` oder `i18n.msgStr(key)`
-   `useI18n({ kcContext })` **nur** in `KcPage.tsx` aufrufen – `i18n`-Objekt als Prop weitergeben
-   Leaf-Komponenten (z. B. `Footer`, `AssistLoginOtp`) erhalten `i18n` als Prop – sie rufen `useI18n` nicht selbst auf

---

## CSS-Konventionen

-   Alle Styles in `src/login/visa.css` – kein CSS-in-JS, keine CSS-Module
-   Import einmalig in `KcPage.tsx`: `import "./visa.css";`
-   PatternFly-Variablen für Farbüberschreibungen nutzen (`--pf-global--*`)
-   Primärfarbe: `#33576e` / Hover: `#2a4a5e`
-   Layout-Level: `.login-pf-page` / Custom-Komponenten: `.kc-`-Präfix
-   Mobile-Breakpoint: `max-width: 767px`
-   Kein `style={{}}` inline für Dinge, die ins CSS gehören

---

## Neue Custom-Seite hinzufügen

1. `src/login/pages/MyPage.tsx` – React-Implementierung
2. `src/login/pages/MyPage.stories.tsx` – Storybook-Story
3. `src/login/KcContext.ts` – Typ-Erweiterung für `pageId` und Context-Felder
4. `src/login/KcPage.tsx` – `case "my-page.ftl":` im Switch ergänzen
5. `src/login/KcPageStory.tsx` – Mock-Daten in `kcContextExtensionPerPage`
6. `src/login/i18n.ts` – Neue i18n-Keys ergänzen

---

## Verbotene Patterns

| Verboten                                     | Stattdessen                         |
| -------------------------------------------- | ----------------------------------- |
| Hardcodierter Text im JSX                    | `i18n.msg("key")`                   |
| `useI18n({ kcContext })` in Leaf-Komponenten | `i18n` als Prop empfangen           |
| `<a href="...">Text</a>` im Footer           | Eintrag in `FOOTER_LINKS`           |
| Mehrere Footer-Implementierungen             | Nur `Footer.tsx`                    |
| `pnpm` / `npm install`                       | `yarn`                              |
| Inline-Arrays im JSX                         | Zentrale Konstantendefinition       |
| Änderungen an `kc.gen.tsx`                   | Datei ist auto-generiert            |
| `import React from "react"`                  | Nicht nötig (`react-jsx`-Transform) |
| `style={{}}` für Layout/Styling              | Klassen in `visa.css`               |
