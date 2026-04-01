import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function AssistLoginOtp(props: PageProps<Extract<KcContext, { pageId: "assist-login-otp.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg, msgStr } = i18n;

    const { url, messagesPerField } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("otp")}
            headerNode={msg("assistOtpTitle")}
        >
            <form id="kc-otp-login-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <div className={kcClsx("kcFormGroupClass")}>
                    <label htmlFor="otp" className={kcClsx("kcLabelClass")}>
                        {msg("assistOtpLabel")}
                    </label>
                    <input
                        id="otp"
                        name="otp"
                        type="text"
                        inputMode="text"
                        autoComplete="one-time-code"
                        autoFocus
                        className={kcClsx("kcInputClass")}
                        aria-invalid={messagesPerField.existsError("otp") ? "true" : undefined}
                    />
                    {messagesPerField.existsError("otp") && (
                        <span
                            id="input-error-otp"
                            className={kcClsx("kcInputErrorMessageClass")}
                            aria-live="polite"
                            dangerouslySetInnerHTML={{ __html: messagesPerField.get("otp") }}
                        />
                    )}
                </div>
                <div className={kcClsx("kcFormGroupClass")}>
                    <p className="instruction">{msg("assistOtpInstruction")}</p>
                </div>
                <div className={kcClsx("kcFormGroupClass")}>
                    <input
                        className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass")}
                        name="login"
                        id="kc-login"
                        type="submit"
                        value={msgStr("doLogIn")}
                    />
                </div>
            </form>
        </Template>
    );
}
