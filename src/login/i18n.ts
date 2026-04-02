/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder
	.withThemeName<ThemeName>()
	.withCustomTranslations({
		en: {
			assistOtpServiceTimeout: "The OTP service did not respond in time. Please try again.",
			assistOtpServiceError: "The OTP service is currently unavailable. Please try again later.",
			assistOtpInvalidFormat: "Invalid OTP format. Use a 6- to 8-digit one-time code.",
			assistOtpInvalidCode: "The provided OTP is invalid.",
			assistOtpTitle: "One-time password verification",
			assistOtpLabel: "One-time password",
			assistOtpInstruction: "Enter your one-time password from the external authentication app.",
			footer_imprint: "Legal Notice",
			footer_privacy: "Privacy Policy"
		},
		de: {
			assistOtpServiceTimeout: "Der OTP-Dienst hat nicht rechtzeitig geantwortet. Bitte versuchen Sie es erneut.",
			assistOtpServiceError: "Der OTP-Dienst ist derzeit nicht verfügbar. Bitte versuchen Sie es später erneut.",
			assistOtpInvalidFormat: "Ungültiges OTP-Format. Verwenden Sie einen 6- bis 8-stelligen Einmalcode.",
			assistOtpInvalidCode: "Das eingegebene OTP ist ungültig.",
			assistOtpTitle: "Einmalpasswort-Verifizierung",
			assistOtpLabel: "Einmalpasswort",
			assistOtpInstruction: "Geben Sie Ihr Einmalpasswort aus der externen Authentifizierungs-App ein.",
			footer_imprint: "Impressum",
			footer_privacy: "Datenschutz"
		}
	})
	.build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
