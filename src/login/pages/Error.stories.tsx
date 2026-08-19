import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "error.ftl" });

const meta = {
    title: "login/error.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default:
 * - Purpose: Generic error with a confirmed client baseUrl.
 * - Scenario: An arbitrary error occurs; the client's Home URL is set, so it is trusted as a redirect target.
 * - Key Aspect: Shows the 60 second delayed-redirect hint text alongside the manual "back to account management" button.
 */
export const Default: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                message: {
                    summary: "An unexpected error occurred. Please try again later.",
                    type: "error"
                },
                client: {
                    baseUrl: "https://example.com/account"
                },
                skipLink: false
            }}
        />
    )
};

/**
 * WithCookieNotFoundError:
 * - Purpose: Tests the well-known "Cookie not found" error with a confirmed client baseUrl.
 * - Scenario: The browser rejected Keycloak's session cookie; the client's Home URL is set.
 * - Key Aspect: This combination triggers an immediate redirect with no delay and no visible hint text/button.
 */
export const WithCookieNotFoundError: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                message: {
                    summary: "Cookie not found. Please make sure cookies are enabled in your browser.",
                    type: "error"
                },
                client: {
                    baseUrl: "https://example.com/account"
                },
                skipLink: false
            }}
        />
    )
};

/**
 * WithUnconfirmedBaseUrl:
 * - Purpose: Tests the fallback path when the client has no Home URL configured.
 * - Scenario: `client.baseUrl` is empty, so the target URL falls back to the hardcoded Connext account management URL.
 * - Key Aspect: No automatic redirect is triggered since the target is not officially confirmed for this client; only the manual button is shown.
 */
export const WithUnconfirmedBaseUrl: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                message: {
                    summary: "An unexpected error occurred. Please try again later.",
                    type: "error"
                },
                client: {
                    baseUrl: ""
                },
                skipLink: false
            }}
        />
    )
};

/**
 * WithSkipLink:
 * - Purpose: Tests that Keycloak's own `skipLink` signal is always respected.
 * - Scenario: `skipLink` is true even though a confirmed `client.baseUrl` is present.
 * - Key Aspect: No link, button, or redirect is rendered at all — only the error message.
 */
export const WithSkipLink: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                message: {
                    summary: "An unexpected error occurred. Please try again later.",
                    type: "error"
                },
                client: {
                    baseUrl: "https://example.com/account"
                },
                skipLink: true
            }}
        />
    )
};
