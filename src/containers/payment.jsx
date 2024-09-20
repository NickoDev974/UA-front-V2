import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/checkout-form";
import { Elements } from "@stripe/react-stripe-js";

const Payment = (props) => {
  const stripePromise = loadStripe(
    "pk_test_51LoWZjBQwgcwEFPsQctlrKIBTm5xYhXbHu7Zaf49l7YH7teORhvSUkLHio8s8btRH7lzmX60zkE71FeGOC5w8zcy00pzbU5ooL"
  );

  return (
    <section className="payment">
      <h2>Paiement</h2>
      <p className="paraPayment">
        Votre commande numéro :<strong> {props.params.orderId} </strong>à bien
        été prise en charge.
        <br /> Payement en ligne sécurisé BIENTOT disponible. <br />
        Le solde de votre commande vous sera demandé lors de la récupération de
        vos produits en boutique.
      </p>
      <Elements stripe={stripePromise}>
        <CheckoutForm orderId={props.params.orderId} />
      </Elements>
    </section>
  );
};

export default Payment;
