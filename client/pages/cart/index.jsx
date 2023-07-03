import Head from "next/head";
import { useState, useEffect } from "react";
import { formatUsd } from "@/helpers/currency.helper";
import PaymentMethodSelector from "@/components/cart/PaymentMethodSelector";
import CardInformationForm from "@/components/cart/CardInformationForm";
import ServicesToAvail from "@/components/cart/ServicesToAvail";
import { CartContextWrapper } from "@/components/cart/CartContextWrapper";
import { getServices } from "@/services/api/services";
import { inclusionFunctionThunk, getTotalPrice } from "@/helpers/cart.helper";

export default function Cart({ services }) {
  /* payment method */
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Visa");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiryDate, setCardExpiryDate] = useState("");
  const [cardVerificationValue, setCardVerificationValue] = useState("");
  const [cardZipCode, setCardZipCode] = useState("");

  const isSelectedPaymentMethod = (str) => {
    return str === selectedPaymentMethod
      ? "relative selectedPaymentMethod"
      : "";
  };

  const handleClickPaymentMethod = (_, str) => {
    setSelectedPaymentMethod(str);
  };

  /* cart state */
  const [cart, setCart] = useState([]);
  const [selectedService, setSelectedService] = useState(services[0].title);

  const selectService = (serviceTitle) => {
    setSelectedService(serviceTitle);
  };

  const addServiceAndInclusionToCart = inclusionFunctionThunk(cart, setCart);

  return (
    <>
      <Head>
        <title>Your Cart</title>
        <meta
          name="description"
          content="View your cart and checkout with our payment providers."
        />
      </Head>
      <section className="Cart w-full grid gap-8 xl:grid-cols-2 my-8 mb-16">
        <div className="px-2 md:px-0">
          <CartContextWrapper cart={cart}>
            <ServicesToAvail
              services={services}
              selectedService={selectedService}
              selectService={selectService}
              addServiceAndInclusionToCart={addServiceAndInclusionToCart}
            />
          </CartContextWrapper>
        </div>
        <div className="px-4 lg:px-8">
          <h2 className="uppercase text-center md:text-left font-semibold text-lg md:text-xl mb-8">
            Choose a Payment Method
          </h2>
          <PaymentMethodSelector
            handleClickPaymentMethod={handleClickPaymentMethod}
            isSelectedPaymentMethod={isSelectedPaymentMethod}
          />
          <h2 className="uppercase text-center md:text-left font-semibold text-lg md:text-xl mb-4 mt-12 xl:mt-20">
            Card Information
          </h2>
          <CardInformationForm
            fName={fName}
            setFName={setFName}
            lName={lName}
            setLName={setLName}
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            cardExpiryDate={cardExpiryDate}
            setCardExpiryDate={setCardExpiryDate}
            cardVerificationValue={cardVerificationValue}
            setCardVerificationValue={setCardVerificationValue}
            cardZipCode={cardZipCode}
            setCardZipCode={setCardZipCode}
          />

          <div className="flex flex-col items-center md:items-end">
            <div className="flex flex-col">
              <h2 className="tracking-wider uppercase font-semibold text-xl mb-2 mt-12 text-center">
                Total: {formatUsd(getTotalPrice(services, cart))}
              </h2>
              <button className="self-end py-3 px-6 shadow hover:shadow-lg transition-shadow bg-[#04b2bd] hover:bg-[#1c7b82] text-white uppercase rounded-[2rem] font-semibold tracking-wider">
                Check Out
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const { data, error } = await getServices();
  return {
    props: {
      services: data,
    },
  };
}
