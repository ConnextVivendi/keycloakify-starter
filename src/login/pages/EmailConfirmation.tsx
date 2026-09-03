import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function EmailConfirmation(props: PageProps<Extract<KcContext, { pageId: "email-confirmation.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { msg } = i18n;

    const { magicLinkContinuation } = kcContext;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayInfo={false}
            displayMessage={false}
            displayRequiredFields={false}
            headerNode={<></>}
        >
            <div>
                <div className="kc-email-confirmation-message">{msg("magicLinkSuccessfulLogin")}</div>
                {magicLinkContinuation.sameBrowser && (
                    <p>
                        <a
                            href={magicLinkContinuation.url}
                            id="mode-barcode"
                            className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                        >
                            {msg("loginPage")}
                        </a>
                    </p>
                )}
            </div>
        </Template>
    );
}
