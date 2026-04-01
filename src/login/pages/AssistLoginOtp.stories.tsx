import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "assist-login-otp.ftl" });

const meta = {
    title: "login/assist-login-otp.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <KcPageStory />
};

export const WithOtpError: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                messagesPerField: {
                    existsError: (fieldName: string, ...otherFieldNames: string[]) => {
                        const fieldNames = [fieldName, ...otherFieldNames];
                        return fieldNames.includes("otp");
                    },
                    get: (fieldName: string) => {
                        if (fieldName === "otp") {
                            return "The one-time code is invalid or expired.";
                        }
                        return "";
                    }
                }
            }}
        />
    )
};
