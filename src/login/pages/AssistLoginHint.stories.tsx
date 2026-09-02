import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "assist-login-hint.ftl" });

const meta = {
    title: "login/assist-login-hint.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

/** The account carries no name, so the greeting and the escape hatch both fall back. */
export const WithoutName: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                assistLoginHintName: "",
                assistLoginHintInitials: "AN",
                assistLoginHintEmail: "anna.nachname@connext.de"
            }}
        />
    )
};

/** `offerPasskey` is on, so the passwordless affordance is offered as well. */
export const WithPasskey: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                assistLoginHintOfferPasskey: true
            }}
        />
    )
};

/**
 * A long double-barrelled name and a long address — the two values most likely to wrap, and both
 * are caller-supplied, so the layout has to hold without them being trusted.
 */
export const LongNameAndAddress: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                assistLoginHintName: "Prof. Dr. Maximiliane Schmidt-Hohenzollern",
                assistLoginHintInitials: "MS",
                assistLoginHintEmail: "maximiliane.schmidt-hohenzollern@sehr-langer-mandantenname.connext.de"
            }}
        />
    )
};
