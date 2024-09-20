import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getOneOrder, updateOrderStatus } from "../../../api/order";
import moment from "moment";

const OrderDetail = (props) => {
  const [order, setOrder] = useState({ id_order_status: null });
  const [orderDetail, setOrderDetail] = useState([]);
  const [user, setUser] = useState(null);

  const changeStatus = (newStatus) => {
    // Mettre à jour le statut de la commande
    const orderId = props.params.id;
    let id_order_status = order.id_order_status;

    // Assigner l'ID du statut en fonction du nouveau statut
    switch (newStatus) {
      case "A préparer":
        id_order_status = 1;
        break;
      case "Prête au retrait":
        id_order_status = 2;
        break;
      case "Terminé":
        id_order_status = 3;
        break;
      case "Annulée":
        id_order_status = 4;
        break;
      default:
        console.log("Statut de commande invalide.");
        return;
    }

    // Appeler la fonction pour mettre à jour le statut de la commande
    updateOrderStatus(id_order_status, orderId)
      .then((res) => {
        if (res.status === 200) {
          recupOrder();
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };

  const recupOrder = () => {
    getOneOrder(props.params.id)
      .then((res) => {
        if (res.status === 200) {
          setOrder(res.order);
          setOrderDetail(res.order_line);
          setUser(res.user);
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    recupOrder();
  }, []);

  return (
    <section className="orderDetail">
      <article className="top">
        <Link className="lienRetour" to="/admin">
          Retour à l'Administration
        </Link>

        <h2>Numéro de commande : {props.params.id}</h2>
      </article>
      {user && (
        <article className="user">
          <h3>
            Utilisateur : {user.firstname} {user.lastname}
          </h3>
          <p>📞 tel : {user.phone}</p>
          <p>📬 Email : {user.email}</p>
        </article>
      )}
      <article>
        <div>
          <h3>Détails de la commande</h3>
          <table className="tableProduct first">
            <thead>
              <tr>
                <th>Nom produit</th>
                <th>Description</th>
                <th>Quantitée achetée</th>
                <th>Prix total</th>
              </tr>
            </thead>
            <tbody>
              {orderDetail &&
                orderDetail.map((o) => (
                  <tr key={o.id}>
                    <td>{o.name}</td>
                    <td>
                      {o.content && o.content.length > 30
                        ? o.content.substring(0, 30) + "..."
                        : o.content}
                    </td>
                    <td>{o.quantity}</td>
                    <td>{o.price} €</td>
                  </tr>
                ))}
            </tbody>
            {order && (
              <tfoot>
                <tr>
                  <td colSpan="3">Date</td>
                  <td>
                    {moment(order.creationTimestamp).format("DD-MM-YYYY")}
                  </td>
                </tr>
                <tr>
                  <td colSpan="3">Total de la Commande</td>
                  <td>{order.total_price} €</td>
                </tr>
                <tr>
                  <td colSpan="3">Statut de paiement</td>
                  <td>{order.payment}</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
        <div>
          {order.id_order_status === 1 && (
            <>
              <button
                onClick={() => {
                  changeStatus("Prête au retrait");
                }}
              >
                A récupérer
              </button>

              <button
                onClick={() => {
                  changeStatus("Annulée");
                }}
              >
                Annuler la commande
              </button>
            </>
          )}
          {order.id_order_status === 2 && (
            <>
              <button
                onClick={() => {
                  changeStatus("Terminé");
                }}
              >
                Commande Livrée
              </button>
              <button
                onClick={() => {
                  changeStatus("Annulée");
                }}
              >
                Annuler la commande
              </button>
            </>
          )}
          {order.id_order_status === 4 && (
            <>
              <button
                onClick={() => {
                  changeStatus("A préparer");
                }}
              >
                À préparer
              </button>
            </>
          )}
        </div>
      </article>
    </section>
  );
};

export default OrderDetail;
