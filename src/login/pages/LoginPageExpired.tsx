import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function LoginPageExpired(
    props: PageProps<Extract<KcContext, { pageId: "login-page-expired.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { url } = kcContext;

    const { msg } = i18n;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("pageExpiredTitle")}
        >
            <p className="instruction">{msg("pageExpiredMessage")}</p>
            <p>
                <a
                    id="loginRestartLink"
                    href={url.loginRestartFlowUrl}
                    className={kcClsx(
                        "kcButtonClass",
                        "kcButtonPrimaryClass",
                        "kcButtonBlockClass",
                        "kcButtonLargeClass"
                    )}
                >
                    {msg("pageExpiredRestartButton")}
                </a>
            </p>
            <p>
                <a
                    id="loginContinueLink"
                    href={url.loginAction}
                    className={kcClsx(
                        "kcButtonClass",
                        "kcButtonDefaultClass",
                        "kcButtonBlockClass",
                        "kcButtonLargeClass"
                    )}
                >
                    {msg("pageExpiredContinueButton")}
                </a>
            </p>
        </Template>
    );
}
