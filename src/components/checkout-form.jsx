import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { checkPayment, updateOrder } from "../api/order";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../slices/userSlice";
import { selectBasket, modifyBasket, cleanBasket } from "../slices/basketSlice";
import { Link } from "react-router-dom";

const CheckoutForm = (props) => {
  const [error, setError] = useState(false);
  const [redirectSuccess, setRedirectSuccess] = useState(false);
  const basket = useSelector(selectBasket);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  //pour utiliser les fonction de l API de stripe
  const stripe = useStripe();
  //pour utiliser les element de consomation de la carte
  const elements = useElements();

  //fonction de paiement lors de validation de la CB
  const handleSubmit = async (e) => {
    e.preventDefault();

    // si stripe ou terminal paiement non connectes:
    if (!stripe || !elements) {
      setError(
        "Le terminal de paiement ne reponds pas. Veuillez essayer a nouveau ulterieurement"
      );
      return;
    }

    //On recupere le mail et le numero de commande pour le suivi avec le back
    const data = {
      email: user.infos.email,
      orderId: props.orderId,
    };

    // verif via stripe que le paiment est ok
    const paymentAuth = await checkPayment(data);

    if (paymentAuth.status === 500) {
      setError("Echec du paiement");
    }
    // stock de la reponse de tetative de paiment vers stripe dans variable qui retourne une clé securisee
    const secret = paymentAuth.client_secret;
    // on envoie la demande de paiement
    const payment = await stripe.confirmCardPayment(secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: user.infos.email,
        },
      },
    });

    // reponse de payment (ok ou echec)
    if (payment.error) {
      setError(payment.error.message);
    } else {
      if (payment.paymentIntent.status === "succeeded") {
        let datas = {
          orderId: props.orderId,
          status: "payed",
        };

        //enregistrement dans la bdd que payment ok
        updateOrder(datas)
          .then((res) => {
            if (res.status === 200) {
              setRedirectSuccess(true);
            } else {
              console.log(res);
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  if (redirectSuccess) {
    return <Navigate to="/success" />;
  }
  return (
    <section className="checkout">
      {error !== null && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="card">
          <CardElement
            options={{
              style: {
                base: {
                  color: "#32325d",
                  fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                  fontSmoothing: "antialiased",
                  fontSize: "16px",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#fa755a",
                  iconColor: "#fa755a",
                },
              },
            }}
          />

          <button disabled={props.stripe}>Payer</button>
        </div>

        <div>
          <p>
            Merci pour votre commande ! Vous recevrez un email de confirmation
            dès qu'elle sera prête à être récupérée.
          </p>
        </div>
        <Link to="/product">
          <button>Retour à la boutique</button>
        </Link>
      </form>
    </section>
  );
};

export default CheckoutForm;
