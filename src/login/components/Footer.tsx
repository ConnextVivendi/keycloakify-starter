import type { I18n } from "../i18n";

type FooterLink = {
    href: string;
    labelKey: string;
};

const FOOTER_LINKS: FooterLink[] = [
    {
        href: "https://connext.de/unternehmen/impressum.aspx",
        labelKey: "footer_imprint"
    },
    {
        href: "https://services.connext.de/account/v1/Dateien/VivendiAssist-Datenschutzerklaerung.pdf",
        labelKey: "footer_privacy"
    }
];

export function Footer(props: { i18n: I18n }) {
    const { i18n } = props;

    const { msg } = i18n;

    return (
        <footer className="kc-footer">
            <nav>
                {FOOTER_LINKS.map(({ href, labelKey }) => (
                    <a key={labelKey} href={href} target="_blank" rel="noopener noreferrer">
                        {msg(labelKey as Parameters<typeof msg>[0])}
                    </a>
                ))}
            </nav>
        </footer>
    );
}
