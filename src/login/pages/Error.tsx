import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { useEffect } from "react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

const FALLBACK_BASE_URL = "https://services.connext.de";
const DELAYED_REDIRECT_SECONDS = 60;

const COOKIE_NOT_FOUND_MARKERS = ["Cookie not found", "Cookie konnte nicht gefunden werden"];

function isCookieNotFoundError(summary: string) {
    return COOKIE_NOT_FOUND_MARKERS.some(marker => summary.includes(marker));
}

export default function Error(props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { message, client, skipLink } = kcContext;

    const { msg, msgStr } = i18n;

    const isBaseUrlConfirmed = !!client?.baseUrl;
    const targetUrl = client?.baseUrl || FALLBACK_BASE_URL;

    const shouldRedirectImmediately = !skipLink && isBaseUrlConfirmed && isCookieNotFoundError(message.summary);
    const shouldRedirectAfterDelay = !skipLink && isBaseUrlConfirmed && !shouldRedirectImmediately;
    const shouldShowButton = !skipLink && (shouldRedirectAfterDelay || !isBaseUrlConfirmed);

    useEffect(() => {
        if (shouldRedirectImmediately) {
            window.location.href = targetUrl;
            return;
        }

        if (shouldRedirectAfterDelay) {
            const timeoutId = setTimeout(() => {
                window.location.href = targetUrl;
            }, DELAYED_REDIRECT_SECONDS * 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [shouldRedirectImmediately, shouldRedirectAfterDelay, targetUrl]);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={shouldRedirectImmediately ? <></> : msg("errorTitle")}
        >
            <div id="kc-error-message">
                {!shouldRedirectImmediately && (
                    <p className="instruction" dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }} />
                )}
                {shouldRedirectAfterDelay && (
                    <p className="kc-error-redirect-notice">{msgStr("errorRedirectNotice", `${DELAYED_REDIRECT_SECONDS}`)}</p>
                )}
                {shouldShowButton && (
                    <p>
                        <a
                            id="backToApplication"
                            className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                            href={targetUrl}
                        >
                            {msg("errorBackToAccountManagement")}
                        </a>
                    </p>
                )}
            </div>
        </Template>
    );
}
