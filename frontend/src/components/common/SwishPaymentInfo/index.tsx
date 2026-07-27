import {t} from "@lingui/macro";
import QRCode from "react-qr-code";
import {Button, Text} from "@mantine/core";
import {Event, Order} from "../../../types.ts";
import {Card} from "../Card";
import {formatCurrency} from "../../../utilites/currency.ts";

interface SwishPaymentInfoProps {
    event: Event;
    order: Order;
}

export const buildSwishLink = (swishNumber: string, amount: number, message: string): string => {
    const payee = swishNumber.replace(/\D/g, "");
    const amt = Number.isInteger(amount) ? String(amount) : amount.toFixed(2);

    return `https://app.swish.nu/1/p/sw/?sw=${payee}&amt=${amt}&cur=SEK&msg=${encodeURIComponent(message)}`;
};

export const SwishPaymentInfo = ({event, order}: SwishPaymentInfoProps) => {
    const swishNumber = event?.settings?.swish_number;

    // Swish only supports SEK payments
    if (!swishNumber || order?.currency !== "SEK" || !order?.total_gross) {
        return null;
    }

    const swishLink = buildSwishLink(swishNumber, order.total_gross, order.public_id);

    return (
        <Card>
            <h3 style={{marginTop: 0}}>{t`Pay with Swish`}</h3>
            <Text size="sm" mb="md">
                {t`Scan the QR code with your phone camera, or tap the button if you are on your phone. The number, amount, and message are prefilled.`}
            </Text>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "16px"}}>
                <div style={{background: "#ffffff", padding: "12px", borderRadius: "8px"}}>
                    <QRCode value={swishLink} size={168}/>
                </div>
                <Button
                    component="a"
                    href={swishLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth
                >
                    {t`Open Swish`} — {formatCurrency(order.total_gross, order.currency)}
                </Button>
            </div>
            <Text size="sm" mt="md" c="dimmed">
                {t`Swish number`}: {swishNumber}
                <br/>
                {t`Amount`}: {formatCurrency(order.total_gross, order.currency)}
                <br/>
                {t`Message`}: {order.public_id}
            </Text>
        </Card>
    );
};
