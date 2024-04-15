import { Card } from "../ui/Card";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Billing() {
  const [billingInfo, setBillingInfo] = useState({
    cardHolder: "",
    cardNumber: "",
    expiration: "",
    cvv: "",
    postalCode: "",
  });

  const handleBillingSubmit = () => {
    console.log(billingInfo);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="border-b border-[#34354a] pb-4">
        <h2 className="text-xl">Billing Settings</h2>
        <p className="text-[#868686] text-sm">
          Handle your billing information here.
        </p>
      </div>
      <Card className="flex flex-col gap-y-4 p-3 bg-[#f5f5f5]">
        <div className="flex flex-col">
          <label className="font-bold" htmlFor="cardHolder">
            Cardholder Name
          </label>
          <input
            className="border p-2 rounded-lg my-1 text-sm focus:outline-none focus:border-[#34354a]"
            type="text"
            name="cardHolder"
            id="cardHolder"
            placeholder="John Doe"
            onChange={(e) =>
              setBillingInfo({ ...billingInfo, cardHolder: e.target.value })
            }
          />
        </div>
        <div className="flex gap-x-2">
          <div className="flex flex-col basis-2/4">
            <label className="font-bold" htmlFor="cardNumber">
              Card Number
            </label>
            <input
              className="border p-2 rounded-lg my-1 text-sm focus:outline-none focus:border-[#34354a]"
              type="text"
              name="cardNumber"
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              onChange={(e) => {
                setBillingInfo({ ...billingInfo, cardNumber: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col basis-1/5">
            <label className="font-bold" htmlFor="expiration">
              Expiration
            </label>
            <input
              className="border p-2 rounded-lg my-1 text-sm focus:outline-none focus:border-[#34354a]"
              type="text"
              name="expiration"
              id="expiration"
              placeholder="MM/YY"
              onChange={(e) => {
                setBillingInfo({ ...billingInfo, expiration: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col basis-1/5">
            <label className="font-bold" htmlFor="cvv">
              CVV
            </label>
            <input
              className="border p-2 rounded-lg my-1 text-sm focus:outline-none focus:border-[#34354a]"
              type="text"
              name="cvv"
              id="cvv"
              placeholder="123"
              onChange={(e) => {
                setBillingInfo({ ...billingInfo, cvv: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="flex gap-x-2">
          <div className="flex flex-col basis-2/4">
            <label className="font-bold" htmlFor="postal">
              Postal Code
            </label>
            <input
              className="border p-2 rounded-lg my-1 text-sm focus:outline-none focus:border-[#34354a]"
              type="text"
              name="postal"
              id="postal"
              placeholder="12345"
              onChange={(e) => {
                setBillingInfo({ ...billingInfo, postalCode: e.target.value });
              }}
            />
          </div>
        </div>
      </Card>
      <div>
        <motion.button
          onClick={handleBillingSubmit}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          className="py-2 px-6 bg-[#00adb5] text-white rounded-lg shadow-lg"
        >
          Save Changes
        </motion.button>
      </div>
    </div>
  );
}
