import { useState } from "react";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

/**
 * Shortened sign-in (FLW-312): the confirmation screen a shared care device lands on when the
 * VIVA Flow app re-launches the authorize request with a `login_hint` for a remembered account.
 *
 * Everything shown here is echoed back from the request — `assistLoginHintEmail` is the
 * `login_hint`, and the name is the caller's own `viva_login_name`, sanitised and length-capped by
 * `AssistLoginHintAuthenticator`. Nothing comes from a user lookup, so this page reveals nothing
 * about whether the address exists. The e-mail is always shown next to the name because the address
 * is the honest half: it is the username that will actually be authenticated.
 *
 * This page collects NO credential. Each button posts a distinct `assistAction`, and the next
 * execution (Keycloak's own `auth-username-password-form`) is what authenticates.
 */
export default function AssistLoginHint(props: PageProps<Extract<KcContext, { pageId: "assist-login-hint.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg, msgStr } = i18n;

    const { url, assistLoginHintName, assistLoginHintEmail, assistLoginHintInitials, assistLoginHintOfferPasskey } = kcContext;

    const [isSubmitting, setIsSubmitting] = useState(false);

    const hasName = assistLoginHintName.trim().length > 0;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo={false}
            headerNode={hasName ? msg("assistLoginHintTitleNamed", assistLoginHintName) : msg("assistLoginHintTitle")}
        >
            <div id="assist-login-hint-identity" className={`${kcClsx("kcFormGroupClass")} kc-hint-identity`}>
                <span id="assist-login-hint-initials" className="kc-hint-initials" aria-hidden="true">
                    {assistLoginHintInitials}
                </span>
                <span id="assist-login-hint-email" className="kc-hint-email">
                    {assistLoginHintEmail}
                </span>
            </div>

            <form
                id="kc-assist-login-hint-form"
                className={kcClsx("kcFormClass")}
                action={url.loginAction}
                onSubmit={() => {
                    setIsSubmitting(true);
                    return true;
                }}
                method="post"
            >
                <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                    <input
                        className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                        name="assistAction"
                        id="kc-login"
                        type="submit"
                        value={msgStr("assistLoginHintContinue")}
                        disabled={isSubmitting}
                        autoFocus
                    />

                    {assistLoginHintOfferPasskey && (
                        <input
                            className={kcClsx("kcButtonClass", "kcButtonSecondaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                            name="assistAction"
                            id="kc-assist-login-hint-passkey"
                            type="submit"
                            value={msgStr("assistLoginHintPasskey")}
                            disabled={isSubmitting}
                        />
                    )}

                    <input
                        className={kcClsx("kcButtonClass", "kcButtonSecondaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                        name="assistAction"
                        id="kc-assist-login-hint-restart"
                        type="submit"
                        value={hasName ? msgStr("assistLoginHintNotYouNamed", assistLoginHintName) : msgStr("assistLoginHintNotYou")}
                        disabled={isSubmitting}
                    />
                </div>
            </form>
        </Template>
    );
}
