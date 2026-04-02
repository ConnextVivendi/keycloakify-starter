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
yarn install         # Abhängigkeiten installieren
npm run build-keycloak-theme           # Theme-JAR bauen → dist_keycloak/
yarn storybook       # Lokale Vorschau starten
yarn cache clean     # Cache leeren
npx keycloakify ...  # Keycloakify-CLI (bleibt npx)
```

Niemals `npm install`, `pnpm install` oder `pnpm run` verwenden.

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

## Template (`Template.tsx`)

- Ist das **einzige** globale Layout für alle Seiten
- Enthält: Logo, Sprachumschalter, Flash-Messages, Footer
- Seitenspezifische Logik gehört **nicht** in `Template.tsx`
- `i18n` wird als Prop übergeben und an Unterkomponenten weitergegeben

---

## Footer

- Komponente: `src/login/components/Footer.tsx`
- Einbindung: `<Footer i18n={i18n} />` am Ende des Root-`<div>` in `Template.tsx`
- Links **ausschließlich** im `FOOTER_LINKS`-Array in `Footer.tsx` definieren
- **Niemals** `<a>`-Tags hardcoded außerhalb des `.map()` schreiben
- Neuen Link hinzufügen:
  1. Eintrag in `FOOTER_LINKS` mit `href` und `labelKey`
  2. Key in `i18n.ts` für `en` und `de` ergänzen
  → kein weiterer Code notwendig

---

## i18n

- Alle Custom-Keys in `src/login/i18n.ts` via `i18nBuilder.withCustomTranslations()`
- Immer für **beide** Sprachen (`en` und `de`) pflegen
- Namenskonvention: `camelCase`, Feature-Präfix (z. B. `footer_imprint`, `assistOtpTitle`)
- Zugriff via `i18n.msg(key)` oder `i18n.msgStr(key)`
- `useI18n({ kcContext })` **nur** in `KcPage.tsx` aufrufen – `i18n`-Objekt als Prop weitergeben
- Leaf-Komponenten (z. B. `Footer`, `AssistLoginOtp`) erhalten `i18n` als Prop – sie rufen `useI18n` nicht selbst auf

---

## Neue Custom-Seite hinzufügen

1. `src/login/pages/MyPage.tsx` – React-Implementierung
2. `src/login/pages/MyPage.stories.tsx` – Storybook-Story
3. `src/login/KcContext.ts` – Typ-Erweiterung für `pageId` und Context-Felder
4. `src/login/KcPage.tsx` – `case "my-page.ftl":` im Switch ergänzen
5. `src/login/KcPageStory.tsx` – Mock-Daten in `kcContextExtensionPerPage`
6. `src/login/i18n.ts` – Neue i18n-Keys ergänzen

---

## CSS-Konventionen

- Alle Styles in `src/login/visa.css` – kein CSS-in-JS, keine CSS-Module
- Import einmalig in `KcPage.tsx`: `import "./visa.css";`
- PatternFly-Variablen für Farbüberschreibungen nutzen (`--pf-global--*`)
- Primärfarbe: `#33576e` / Hover: `#2a4a5e`
- Layout-Level: `.login-pf-page` / Custom-Komponenten: `.kc-`-Präfix
- Mobile-Breakpoint: `max-width: 767px`
- Kein `style={{}}` inline für Dinge, die ins CSS gehören

---

## Verbotene Patterns

| Verboten | Stattdessen |
|---|---|
| Hardcodierter Text im JSX | `i18n.msg("key")` |
| `useI18n({ kcContext })` in Leaf-Komponenten | `i18n` als Prop empfangen |
| `<a href="...">Text</a>` im Footer | Eintrag in `FOOTER_LINKS` |
| Mehrere Footer-Implementierungen | Nur `Footer.tsx` |
| `pnpm` / `npm run` Befehle | `yarn` |
| Inline-Arrays im JSX | Zentrale Konstantendefinition |
| Änderungen an `kc.gen.tsx` | Datei ist auto-generiert |

---

## Validierung

```bash
yarn storybook   # Alle Seiten visuell prüfen
npm run build-keycloak-theme       # Build muss fehlerfrei durchlaufen
```

Build-Ausgabe: `dist_keycloak/` – deployable Keycloak-Theme-JAR.
