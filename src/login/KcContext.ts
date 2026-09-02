/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { ExtendKcContext } from "keycloakify/login";
import type { KcEnvName, ThemeName } from "../kc.gen";

export type KcContextExtension = {
    themeName: ThemeName;
    properties: Record<KcEnvName, string> & {};
    // NOTE: Here you can declare more properties to extend the KcContext
    // See: https://docs.keycloakify.dev/faq-and-help/some-values-you-need-are-missing-from-in-kccontext
};

export type KcContextExtensionPerPage = {
    "assist-login-hint.ftl": {
        /** Caller-supplied display name, sanitised and length-capped in Java. "" when absent. */
        assistLoginHintName: string;
        /** The `login_hint`, echoed back. Never the result of a user lookup. */
        assistLoginHintEmail: string;
        assistLoginHintInitials: string;
        assistLoginHintOfferPasskey: boolean;
        url: {
            loginAction: string;
        };
    };
    "assist-login-otp.ftl": {
        url: {
            loginAction: string;
        };
    };
    "otp-form.ftl": {
        auth: {
            attemptedUsername: string;
        };
        url: {
            loginRestartFlowUrl: string;
            loginAction: string;
        };
    };
    "email-confirmation.ftl": {
        magicLinkContinuation: {
            sameBrowser: boolean;
            url: string;
        };
    };
    "email-confirmation-error.ftl": {};
    "view-email.ftl": {
        auth: {
            attemptedUsername: string;
        };
    };
    "view-email-continuation.ftl": {
        auth: {
            attemptedUsername: string;
        };
    };
    "trusted-device-register.ftl": {
        trustedDeviceName: string;
        url: {
            loginAction: string;
        };
    };
};

export type KcContext = ExtendKcContext<KcContextExtension, KcContextExtensionPerPage>;
