import {Event} from "../../../../../../types.ts";
import {Card} from "../../../../../common/Card";
import {t} from "@lingui/macro";

interface OfflinePaymentMethodProps {
    event: Event;
}

export const OfflinePaymentMethod = ({event}: OfflinePaymentMethodProps) => {
    const eventSettings = event?.settings;

    // On the payment step the instructions come from the public event settings where
    // Liquid tokens ({{ swish.link }} etc.) are not rendered; strip them so organizers
    // can use tokens that only resolve on the confirmation page and in emails.
    const instructions = (eventSettings?.offline_payment_instructions || "")
        .replace(/\{\{[^}]*\}\}/g, "");

    return (
        <div>
            <h2>{t`Payment Instructions`}</h2>
            <Card>
                <div
                    dangerouslySetInnerHTML={{
                        __html: instructions,
                    }}
                />
            </Card>
        </div>
    );
};
