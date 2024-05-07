// Component imports
import { DashboardContainer } from "@/components/ui/DashboardContainer";

// Hook, util, and schema imports
import { useState, useEffect, useContext } from "react";
import AuthContext from "@/context/AuthContext";
import post from "@/utils/post";

// Stripe imports
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements, CardElement, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import getStripe from "@/lib/getStripe";

export default function Checkout() {

    const stripePromise = loadStripe("pk_live_51PDa40DapKE0mGmXR1Opc5N2JAu8RCfh235l905xZcYv6b1Z2IFDIVpsDmKaPvrjTkGN7boyOeCsyKNTl5vpptk800GFYH8gNl");

    return(
        <DashboardContainer
            dropDown={false}
            header="Checkout"
            subHeader="Checkout with Stripe"
        >
            <Elements stripe={stripePromise}>
                <CheckoutStripe />
            </Elements>
        </DashboardContainer>
    );
}

function CheckoutStripe() {

    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState<boolean>(false);

    const { user } = useContext(AuthContext);

    async function handleSubmit(e: any) {
        e.preventDefault();

        const paymentMethod = await stripe?.createPaymentMethod({
            type: "card",
            card: elements?.getElement(CardElement)!,
            billing_details: {
                name: user?.name,
                email: "info@omnistudy.io"
            } 
        });

        post(async (data: any) => {
            await confirmPayment(data.clientSecret);
        }, "/payments/subscription", {
            paymentMethod: paymentMethod?.paymentMethod?.id,
            plan: {
                "monthly_price_id": "price_1PDbkRDapKE0mGmXzA9AjgMX",
                "annual_price_id": "price_1PDbkgDapKE0mGmXdY8eJKMx"
            }, 
            type: "monthly"
        });
    }

    async function confirmPayment(clientSecret: string) {
        // Confirm the payment
        const confirmPayment = await stripe?.confirmCardPayment(clientSecret);
        if(confirmPayment?.error) {
            console.error(confirmPayment.error);
            return;
        } else {
            console.log("Payment successful");
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement></CardElement>
                <button type="submit" disabled={!stripe || loading}>Pay</button>
            </form>
        </div>
    );
}