/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<ThemeName>()
    .withCustomTranslations({
        en: {
            assistOtpServiceTimeout:
                "The OTP service did not respond in time. Please try again.",
            assistOtpServiceError:
                "The OTP service is currently unavailable. Please try again later.",
            assistOtpInvalidFormat:
                "Invalid OTP format. Use a 6- to 8-digit one-time code.",
            assistOtpInvalidCode: "The provided OTP is invalid.",
            assistOtpTitle: "One-time password verification",
            assistOtpLabel: "One-time password",
            assistOtpInstruction:
                "Enter your one-time password from the external authentication app.",
            footer_imprint: "Legal Notice",
            footer_privacy: "Privacy Policy",
            "profile.attributes.salutation": "Salutation",
            "profile.attributes.salutation.options.salutation_mr": "Mr.",
            "profile.attributes.salutation.options.salutation_mrs": "Ms.",
            "profile.attributes.salutation.options.salutation_diverse": "Diverse",
            "profile.attributes.company": "Company",
            magicLinkConfirmation: "Check your email, and click on the link to log in!",
            doResend: "Resend",
            magicLinkContinuationConfirmation:
                "Check your email, and click on the link to log in! Please do not close this tab.",
            magicLinkSuccessfulLogin:
                "Authentication session confirmed. Please return to login page tab.",
            magicLinkFailLogin:
                "Authentication session expired. Please close this tab and restart the login flow.",
            loginPage: "Login page",
            multipleSessionsError:
                "Multiple login sessions opened on same browser. Please close it and restart login.",
            loginOtpTitle: "Enter authentication code",
            loginOtpInstruction: "Enter the code from your authenticator app.",
            loginOtpOneTime: "One-time code",
            loginOtpOneTimeDescription:
                "Enter the one-time code that we sent you by email.",
            loginOtpOneTimeDescription2:
                "Didn't receive an email? Please check your spam folder or request a new code.",
            loginOtpOneTime2faHint:
                "For added security and convenience, we recommend setting up an authenticator app or a security key in your account management settings.",
            trustedDeviceDisplayName: "Trusted device",
            trustedDeviceHelpText: "Trusted devices are verified automatically.",
            trustedDeviceHeader: "Trust this device?",
            trustedDeviceYes: "Yes",
            trustedDeviceNo: "No",
            trustedDeviceExplanation:
                "Trusted devices do not need a second factor. Do not trust public or shared machines.",
            trustedDeviceName: "Name this device"
        },
        de: {
            assistOtpServiceTimeout:
                "Der OTP-Dienst hat nicht rechtzeitig geantwortet. Bitte versuchen Sie es erneut.",
            assistOtpServiceError:
                "Der OTP-Dienst ist derzeit nicht verfügbar. Bitte versuchen Sie es später erneut.",
            assistOtpInvalidFormat:
                "Ungültiges OTP-Format. Verwenden Sie einen 6- bis 8-stelligen Einmalcode.",
            assistOtpInvalidCode: "Das eingegebene OTP ist ungültig.",
            assistOtpTitle: "Einmalpasswort-Verifizierung",
            assistOtpLabel: "Einmalpasswort",
            assistOtpInstruction:
                "Geben Sie Ihr Einmalpasswort aus der externen Authentifizierungs-App ein.",
            footer_imprint: "Impressum",
            footer_privacy: "Datenschutz",
            "profile.attributes.salutation": "Anrede",
            "profile.attributes.salutation.options.salutation_mr": "Herr",
            "profile.attributes.salutation.options.salutation_mrs": "Frau",
            "profile.attributes.salutation.options.salutation_diverse": "Divers",
            "profile.attributes.company": "Firma",
            magicLinkConfirmation:
                "Überprüfen Sie Ihre E-Mails und klicken Sie auf den Link, um sich anzumelden!",
            doResend: "Erneut senden",
            magicLinkContinuationConfirmation:
                "Überprüfen Sie Ihre E-Mails und klicken Sie auf den Link, um sich anzumelden! Bitte schließen Sie diesen Tab nicht.",
            magicLinkSuccessfulLogin:
                "Authentifizierungssitzung bestätigt. Bitte kehren Sie zum Login-Seiten-Tab zurück.",
            magicLinkFailLogin:
                "Authentifizierungssitzung abgelaufen. Bitte schließen Sie diesen Tab und starten Sie den Login-Vorgang neu.",
            loginPage: "Login-Seite",
            multipleSessionsError:
                "Mehrere Login-Sitzungen im selben Browser geöffnet. Bitte schließen Sie sie und starten Sie den Login-Vorgang neu.",
            loginOtpTitle: "Authentifizierungscode eingeben",
            loginOtpInstruction: "Geben Sie den Code aus Ihrer Authenticator-App ein.",
            loginOtpOneTime: "Einmalcode",
            loginOtpOneTimeDescription:
                "Geben Sie den Einmalcode ein, den wir Ihnen per E-Mail gesendet haben.",
            loginOtpOneTimeDescription2:
                "Keine E-Mail erhalten? Bitte prüfen Sie auch Ihren Spam-Ordner oder fordern Sie einen neuen Code an.",
            loginOtpOneTime2faHint:
                "Für mehr Sicherheit und Komfort empfehlen wir, in der Kontoverwaltung eine Authenticator-App oder einen Sicherheitsschlüssel einzurichten.",
            trustedDeviceDisplayName: "Vertrauenswürdiges Gerät",
            trustedDeviceHelpText:
                "Vertrauenswürdige Geräte werden automatisch überprüft",
            trustedDeviceHeader: "Diesem Gerät vertrauen?",
            trustedDeviceYes: "Ja",
            trustedDeviceNo: "Nein",
            trustedDeviceExplanation:
                "Der zweite Faktor wird auf einem vertrauenswürdigen Gerät nicht mehr angefordert. Vertrauen Sie niemals öffentlichen oder gemeinsam genutzten Computern.",
            trustedDeviceName: "Name dieses Geräts"
        }
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
