import {Attendee, Product, ProductPriceType} from "../types.ts";

export const getAttendeeProductTitle = (attendee: Attendee, product: Product): string => {
    if (product.type !== ProductPriceType.Tiered) {
        return product.title;
    }

    const productPrice = product.prices
        ?.find(price => price.id === attendee.product_price_id);

    return product.title + (productPrice?.label ? ` - ${productPrice.label}` : '');
}

export const getAttendeeProductPrice = (
    attendee: Attendee,
    product: Product,
    priceDisplayMode?: 'INCLUSIVE' | 'EXCLUSIVE',
): number => {
    const productPrice = product.prices
        ?.find(price => price.id === attendee.product_price_id);

    if (!productPrice) {
        return 0;
    }

    if (priceDisplayMode === 'INCLUSIVE') {
        return productPrice.price_including_taxes_and_fees
            ?? (productPrice.price ?? 0) + (productPrice.tax_total ?? 0) + (productPrice.fee_total ?? 0);
    }

    return productPrice.price ?? 0;
}
