import { useState } from "react";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function OtpForm(props: PageProps<Extract<KcContext, { pageId: "otp-form.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg, msgStr } = i18n;

    const { auth, url, messagesPerField } = kcContext;

    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo={true}
            headerNode={
                <div id="kc-username" className={`${kcClsx("kcFormGroupClass")} kc-otp-username`}>
                    <label id="kc-attempted-username">{auth.attemptedUsername}</label>
                    <a id="reset-login" href={url.loginRestartFlowUrl} aria-label={msgStr("restartLoginTooltip")}>
                        <div className="kc-login-tooltip">
                            <i className={kcClsx("kcResetFlowIcon")}></i>
                            <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
                        </div>
                    </a>
                </div>
            }
        >
            <p>{msg("loginOtpOneTimeDescription")}</p>
            <p>{msg("loginOtpOneTimeDescription2")}</p>
            <form
                id="kc-otp-login-form"
                className={kcClsx("kcFormClass")}
                action={url.loginAction}
                onSubmit={() => {
                    setIsSubmitting(true);
                    return true;
                }}
                method="post"
            >
                <div className={kcClsx("kcFormGroupClass")}>
                    <div className={kcClsx("kcLabelWrapperClass")}>
                        <label htmlFor="otp" className={kcClsx("kcLabelClass")}>
                            {msg("loginOtpOneTime")}
                        </label>
                    </div>

                    <div className={kcClsx("kcInputWrapperClass")}>
                        <input
                            id="otp"
                            name="otp"
                            autoComplete="one-time-code"
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            className={kcClsx("kcInputClass")}
                            autoFocus
                            aria-invalid={messagesPerField.existsError("totp") ? "true" : undefined}
                        />
                        {messagesPerField.existsError("totp") && (
                            <span
                                id="input-error-otp-code"
                                className={kcClsx("kcInputErrorMessageClass")}
                                aria-live="polite"
                                dangerouslySetInnerHTML={{ __html: messagesPerField.get("totp") }}
                            />
                        )}
                    </div>
                </div>

                <p className="kc-otp-2fa-hint">{msg("loginOtpOneTime2faHint")}</p>

                <div className={kcClsx("kcFormGroupClass")}>
                    <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                        <div className={kcClsx("kcFormOptionsWrapperClass")} />
                    </div>

                    <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                        <input
                            className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                            name="submit"
                            id="kc-submit"
                            type="submit"
                            value={msgStr("doSubmit")}
                            disabled={isSubmitting}
                        />
                        <input
                            className={kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                            name="resend"
                            id="kc-resend"
                            type="submit"
                            value={msgStr("doResend")}
                            disabled={isSubmitting}
                        />
                    </div>
                </div>
            </form>
        </Template>
    );
}
