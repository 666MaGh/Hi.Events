import {Event, Order} from "../../../../../../types.ts";
import {Card} from "../../../../../common/Card";
import {SwishPaymentInfo} from "../../../../../common/SwishPaymentInfo";
import {t} from "@lingui/macro";

interface OfflinePaymentMethodProps {
    event: Event;
    order?: Order;
}

export const OfflinePaymentMethod = ({event, order}: OfflinePaymentMethodProps) => {
    const eventSettings = event?.settings;

    return (
        <div>
            <h2>{t`Payment Instructions`}</h2>
            {order && <SwishPaymentInfo event={event} order={order}/>}
            <Card>
                <div
                    dangerouslySetInnerHTML={{
                        __html: eventSettings?.offline_payment_instructions || "",
                    }}
                />
            </Card>
        </div>
    );
};
