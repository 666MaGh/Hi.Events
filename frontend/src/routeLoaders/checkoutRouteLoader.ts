import {LoaderFunctionArgs} from "react-router";
import {getEventPublicQuery} from "../queries/useGetEventPublic.ts";
import {getQueryClient} from "../utilites/ssrQueryClient.ts";

// Loads the public event during SSR so checkout pages get event-branded
// meta tags (og:image etc.) that link-preview scrapers can see
export const checkoutRouteLoader = async ({params}: LoaderFunctionArgs) => {
    try {
        const event = await getQueryClient().fetchQuery(
            getEventPublicQuery(params.eventId, null, false),
        );

        return {event};
    } catch {
        return {event: null};
    }
};
