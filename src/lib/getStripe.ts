import { loadStripe } from "@stripe/stripe-js";

let stripePromise: any;
export default function getStripe() {
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK!);
    }
    return stripePromise;
}