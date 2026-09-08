import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "./Template";
import AssistLoginOtp from "./pages/AssistLoginOtp";
import OtpForm from "./pages/OtpForm";
import EmailConfirmation from "./pages/EmailConfirmation";
import EmailConfirmationError from "./pages/EmailConfirmationError";
import ViewEmail from "./pages/ViewEmail";
import ViewEmailContinuation from "./pages/ViewEmailContinuation";
import TrustedDeviceRegister from "./pages/TrustedDeviceRegister";
import LoginPageExpired from "./pages/LoginPageExpired";
const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);
const WebauthnRegister = lazy(() => import("./pages/WebauthnRegister"));
const LoginUpdatePassword = lazy(() => import("./pages/LoginUpdatePassword"));
const UpdateEmail = lazy(() => import("./pages/UpdateEmail"));
const LoginConfigTotp = lazy(() => import("./pages/LoginConfigTotp"));
const LoginRecoveryAuthnCodeConfig = lazy(
    () => import("./pages/LoginRecoveryAuthnCodeConfig")
);
const LoginOtp = lazy(() => import("./pages/LoginOtp"));
const Error = lazy(() => import("./pages/Error"));

import "./visa.css";

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "assist-login-otp.ftl":
                        return (
                            <AssistLoginOtp
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "otp-form.ftl":
                        return (
                            <OtpForm
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "email-confirmation.ftl":
                        return (
                            <EmailConfirmation
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "email-confirmation-error.ftl":
                        return (
                            <EmailConfirmationError
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "view-email.ftl":
                        return (
                            <ViewEmail
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "view-email-continuation.ftl":
                        return (
                            <ViewEmailContinuation
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "trusted-device-register.ftl":
                        return (
                            <TrustedDeviceRegister
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "webauthn-register.ftl":
                        return (
                            <WebauthnRegister
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "login-update-password.ftl":
                        return (
                            <LoginUpdatePassword
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "update-email.ftl":
                        return (
                            <UpdateEmail
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                    case "login-config-totp.ftl":
                        return (
                            <LoginConfigTotp
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "login-recovery-authn-code-config.ftl":
                        return (
                            <LoginRecoveryAuthnCodeConfig
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "login-otp.ftl":
                        return (
                            <LoginOtp
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "login-page-expired.ftl":
                        return (
                            <LoginPageExpired
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "error.ftl":
                        return (
                            <Error
                                {...{ kcContext, i18n, classes }}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    default:
                        return (
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={true}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}

const classes = {} satisfies { [key in ClassKey]?: string };
