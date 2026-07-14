import { useState } from "react";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function TrustedDeviceRegister(props: PageProps<Extract<KcContext, { pageId: "trusted-device-register.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

    const { msg, msgStr } = i18n;

    const { url, trustedDeviceName } = kcContext;

    const [deviceName, setDeviceName] = useState(trustedDeviceName);

    function handleYesClick(e: React.MouseEvent<HTMLButtonElement>) {
        const result = window.prompt(msgStr("trustedDeviceName"), deviceName);
        if (result === null) {
            e.preventDefault();
            return;
        }
        setDeviceName(result);
    }

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode={<></>}>
            <form id="kc-form-trusted-device" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <h2 id="kc-trusted-device-title">{msg("trustedDeviceHeader")}</h2>

                <div className={kcClsx("kcFormGroupClass")}>
                    <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                        <div className={kcClsx("kcFormOptionsWrapperClass")} />
                    </div>

                    <input type="hidden" id="kc-trusted-device-name" name="trusted-device-name" value={deviceName} />

                    <div className={kcClsx("kcFormButtonsClass")}>
                        <button
                            className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                            name="trusted-device"
                            id="kc-trusted-device-yes"
                            type="submit"
                            value="yes"
                            onClick={handleYesClick}
                        >
                            {msg("trustedDeviceYes")}
                        </button>

                        <button
                            className={kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                            name="trusted-device"
                            id="kc-trusted-device-no"
                            type="submit"
                            value="no"
                        >
                            {msg("trustedDeviceNo")}
                        </button>

                        <div className={kcClsx("kcInputHelperTextAfterClass")} id="form-help-text-after-trusted-device" aria-live="polite">
                            {msg("trustedDeviceExplanation")}
                        </div>
                    </div>
                </div>
            </form>
        </Template>
    );
}
