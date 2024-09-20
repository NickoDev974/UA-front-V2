import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, loadProducts } from "../../slices/productSlice";
import { selectCategory, loadCategory } from "../../slices/categorySlice";
import { selectMessages } from "../../slices/contactSlice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChampagneGlasses,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { config } from "../../config";
import {
  deleteOneProduct,
  displayProducts,
  updateOneProduct,
} from "../../api/article";
import { getAllOrders } from "../../api/order";
import moment from "moment/moment";
import { getAllUsers, updateUserRole, updateUserStatus } from "../../api/user";
import {
  displaycategory,
  updateOneCategor,
  deleteOneCategory,
} from "../../api/category";
import { getAllContactMessages } from "../../api/contactApi";

const Admin = (props) => {
  const product = useSelector(selectProducts);
  const categories = useSelector(selectCategory) || [];
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [localCategories, setLocalCategories] = useState([]);
  const contactMessages = useSelector(selectMessages);
  const [contactMessage, setContactMessage] = useState([]);
  //const [newCategoryName, setNewCategoryName] = useState("");

  //---------------------------------------------User ---------------------------------------------------------
  useEffect(() => {
    getAllUsers()
      .then((res) => {
        if (res.status === 200) {
          setUsers(res.user);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // Fonction pour mettre à jour le rôle de l'utilisateur et le state des utilisateurs
  const updateUserRoleAndState = (userId, newRoleId) => {
    updateUserRole(userId, newRoleId)
      .then((res) => {
        if (res.status === 200) {
          // Mise a jours du  state des utilisateurs après avoir reçu la réponse de la requête API
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === userId ? { ...user, id_role: newRoleId } : user
            )
          );
        }
      })
      .catch((err) => console.log(err));
  };
  // Fonction mise a jours du status utilisateur
  const updateUserStatusAndState = (userId, newStatus) => {
    updateUserStatus(userId, newStatus)
      .then((res) => {
        if (res.status === 200) {
          //mise a jours du state des utilisateurs après avoir reçu la réponse de la requête API
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === userId ? { ...user, id_status: newStatus } : user
            )
          );
        }
      })
      .catch((err) => console.log(err));
  };

  //---------------------------------------------Product ---------------------------------------------------------

  //supression d'un produit
  const onClickDeleteProduct = (id) => {
    deleteOneProduct(id)
      .then((res) => {
        if (res.status === 200) {
          displayProducts()
            .then((response) => {
              if (response.status === 200) {
                dispatch(loadProducts(response.result));
                alert("Produit supprimer avec succés");
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  //changement status article :

  const handleProductStatusChange = (e, productId) => {
    const newStatus = e.target.value;
    const productToUpdate = product.products.find((p) => p.id === productId);
    const updatedProduct = { ...productToUpdate, id_status: newStatus };
    const updatedProducts = product.products.map((p) =>
      p.id === productId ? updatedProduct : p
    );
    dispatch(loadProducts(updatedProducts));

    updateOneProduct(updatedProduct, productId)
      .then((res) => {
        if (res.status === 200) {
          alert("Statut du produit mis à jour avec succès");
        } else {
          alert("Erreur lors de la mise à jour du statut du produit");
        }
      })
      .catch((err) => {
        alert("Erreur lors de la mise à jour du statut du produit :", err);
      });
  };

  // --------------------------Pour mise en place future des cathegories -------------------------------
  //chagement category de product

  // const handleCategoryChange = (e, productId) => {
  //   const newCategoryId = e.target.value;

  //   // Mise à jour de la catégorie du produit dans le state Redux
  //   const updatedProducts = product.products.map((p) =>
  //     p.id === productId ? { ...p, id_category: newCategoryId } : p
  //   );
  //   dispatch(loadProducts(updatedProducts));

  //   // Appel de la fonction API pour mettre à jour la catégorie du produit dans la base de données
  //   updateOneProduct(productId, { id_category: newCategoryId })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         console.log("Catégorie du produit mise à jour avec succès");
  //       } else {
  //         console.log(
  //           "Erreur lors de la mise à jour de la catégorie du produit"
  //         );
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(
  //         "Erreur lors de la mise à jour de la catégorie du produit :",
  //         err
  //       );
  //     });
  // };
  // --------------------------------------------------------------------------------------------------------------------

  //---------------------------------------------Order ---------------------------------------------------------

  // afficher les commandes
  useEffect(() => {
    getAllOrders()
      .then((res) => {
        if (res.status === 200) {
          setOrders(res.result);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // Fonction pour calculer le nombre de jours écoulés entre deux dates
  const calculateDaysDifference = (orderDate) => {
    const today = new Date();
    const orderDateObj = new Date(orderDate);
    //remise a zero pour ne pas avoir de jours negatif :
    today.setHours(0, 0, 0, 0);
    orderDateObj.setHours(0, 0, 0, 0);

    const differenceInTime = today.getTime() - orderDateObj.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };

  //---------------------------------------------Category ---------------------------------------------------------

  useEffect(() => {
    // Récupérer toutes les catégories et mettre à jour le state
    displaycategory()
      .then((data) => {
        setLocalCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleStatusChange = (e, categoryId) => {
    const newStatus = e.target.value;

    updateOneCategor(categoryId, newStatus)
      .then((res) => {
        if (res.status === 200) {
          // Mise à jour du statut de la catégorie dans le state après réception de la réponse de la requête API
          const updatedCategories = localCategories.map((category) =>
            category.id === categoryId
              ? { ...category, id_status: newStatus }
              : category
          );
          // Mettre à jour le state categories avec le nouveau tableau filtré
          setLocalCategories(updatedCategories);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleDeleteCategory = (categoryId) => {
    alert("Suppression de la catégorie avec l'ID :", categoryId);
    // Récupère tous les produits associés à la catégorie a supprimer
    const productsAssociated = Array.isArray(product.products)
      ? product.products.filter((product) => product.id_category === categoryId)
      : [];

    // Vérif s'il y a des produits associés
    if (productsAssociated.length === 0) {
      // Aucun produit n'est associé, on supprime
      deleteOneCategory(categoryId)
        .then((res) => {
          if (res.status === 200) {
            displaycategory()
              .then((response) => {
                if (response.status === 200) {
                  dispatch(loadCategory(response.result));
                }
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    } else {
      // Des produits sont associés, affiche un message à l'utilisateur pour l'informer
      alert(
        "Il existe des produits associés à cette catégorie. Veuillez les retirer avant de supprimer la catégorie."
      );
    }
  };

  //---------------------------------------------contact Messages ---------------------------------------------------------

  useEffect(() => {
    // Charger tous les messages de contact depuis votre API

    getAllContactMessages()
      .then((data) => {
        setContactMessage(data);
      })

      .catch((err) => console.log(err));
  }, []);

  //---------------------------------------------Return affichage ----------------------------------------------------------
  //------------------------------------------------------------------------------------------------------------------------
  return (
    <section className="admin">
      {/* nav de admin */}
      <nav className="navAdmin">
        <ul>
          <li>
            Commandes
            {/* <a href="#order">Commandes</a> */}
            <ul>
              <li>
                <a href="#orderToutes">Toutes</a>
              </li>
              <li>
                <a href="#orderPrepare">A préparer</a>
              </li>
              <li>
                <a href="#orderRecupere">A récupérer</a>
              </li>
              <li>
                <a href="#orderTerminee">Terminées</a>
              </li>
              <li>
                <a href="#orderAnnulee">Annulées</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#product">Produits</a>
          </li>
          <li>
            <a href="#category">Catégories</a>
          </li>
          <li>
            <a href="#user">Utilisateurs</a>
          </li>
          <li>
            <a href="#messages">Messsages</a>
          </li>
        </ul>
      </nav>
      <h2>Administration</h2>
      {/* les commandes */}
      <article className="/flexTable ">
        <h3 id="order">Mes commandes</h3>
        {/* toutes les commandes  */}
        <div>
          <h4 id="orderToutes">Toutes les commandes</h4>
          <table className="tableProduct">
            <thead>
              <tr>
                <th>Numéro</th>
                <th>Prix total</th>
                <th>Date de commande</th>
                <th>Nbr Jours</th>
                <th>Etat</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((o) => (
                  <tr key={o.id}>
                    <td>
                      <Link to={`/orderDetail/${o.id}`}>{o.id}</Link>
                    </td>
                    <td>{o.total_price} €</td>
                    <td>{moment(o.order_date).format("DD-MM-YYYY")}</td>
                    <td>{calculateDaysDifference(o.order_date)} J</td>
                    <td>
                      {o.id_order_status === 1 && "À préparer"}
                      {o.id_order_status === 2 && "À récupérer"}
                      {o.id_order_status === 3 && "Terminée"}
                      {o.id_order_status === 4 && "Annulée"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5"></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* commandes a preparer  */}
        <div>
          <h4 id="orderPrepare">Commandes à préparer</h4>
          <table className="tableProduct">
            <thead>
              <tr>
                <th>Numéro</th>
                <th>Prix total</th>
                <th>Date de commande</th>
                <th>Nbr Jours</th>
                {/* <th>État</th> */}
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((o) => {
                  if (o.id_order_status === 1) {
                    return (
                      <tr key={o.id}>
                        <td>
                          <Link to={`/orderDetail/${o.id}`}>{o.id}</Link>
                        </td>
                        <td>{o.total_price} €</td>
                        <td>{moment(o.order_date).format("DD-MM-YYYY")}</td>
                        <td>{calculateDaysDifference(o.order_date)} jours</td>
                        {/* <td>{o.id_order_status}</td> */}
                      </tr>
                    );
                  }
                })
              ) : (
                <tr>
                  <td colSpan="5"></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* commandes a recuperer*/}
        <div>
          <h4 id="orderRecupere">A récupérer</h4>
          <table className="tableProduct">
            <thead>
              <tr>
                <th>Numéro</th>
                <th>Prix total</th>
                <th>Date de commande</th>
                <th>Nbr Jours</th>
                {/* <th>État</th> */}
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((o) => {
                  if (o.id_order_status === 2) {
                    return (
                      <tr key={o.id}>
                        <td>
                          <Link to={`/orderDetail/${o.id}`}>{o.id}</Link>
                        </td>
                        <td>{o.total_price} €</td>
                        <td>{moment(o.order_date).format("DD-MM-YYYY")}</td>
                        <td>{calculateDaysDifference(o.order_date)} jours</td>
                        {/* <td>{o.id_order_status}</td> */}
                      </tr>
                    );
                  }
                })
              ) : (
                <tr>
                  <td colSpan="5"></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* commandes a terminées*/}
        <div>
          <h4 id="orderTerminee">Terminées</h4>
          <table className="tableProduct">
            <thead>
              <tr>
                <th>Numéro</th>
                <th>Prix total</th>
                <th>Date de commande</th>
                <th>Nbr Jours</th>
                {/* <th>État</th> */}
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((o) => {
                  if (o.id_order_status === 3) {
                    return (
                      <tr key={o.id}>
                        <td>
                          <Link to={`/orderDetail/${o.id}`}>{o.id}</Link>
                        </td>
                        <td>{o.total_price} €</td>
                        <td>{moment(o.order_date).format("DD-MM-YYYY")}</td>
                        <td>{calculateDaysDifference(o.order_date)} jours</td>
                        {/* <td>{o.id_order_status}</td> */}
                      </tr>
                    );
                  }
                })
              ) : (
                <tr>
                  <td colSpan="5"></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* commandes annulées*/}
        <div>
          <h4 id="orderAnnulee">Annulées</h4>
          <table className="tableProduct">
            <thead>
              <tr>
                <th>Numéro</th>
                <th>Prix total</th>
                <th>Date de commande</th>
                <th>Nbr Jours</th>
                {/* <th>État</th> */}
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((o) => {
                  if (o.id_order_status === 4) {
                    return (
                      <tr key={o.id}>
                        <td>
                          <Link to={`/orderDetail/${o.id}`}>{o.id}</Link>
                        </td>
                        <td>{o.total_price} €</td>
                        <td>{moment(o.order_date).format("DD-MM-YYYY")}</td>
                        <td>{calculateDaysDifference(o.order_date)} jours</td>
                        {/* <td>{o.id_order_status}</td> */}
                      </tr>
                    );
                  }
                })
              ) : (
                <tr>
                  <td colSpan="5"></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </article>
      <hr />
      {/* les produits */}
      <article>
        <h3 id="product">Mes Produits</h3>
        <div className="addProduct">
          <h4>Ajouter un produit</h4>

          <Link to="/addProduct">
            <FontAwesomeIcon className="icone" icon={faPlusCircle} />
          </Link>
        </div>
        <table className="tableProduct-first">
          <thead>
            <tr>
              <th>Image</th>
              <th>Nom</th>
              <th>Prix</th>
              <th>Stock</th>
              <th>Action</th>
              <th>Status</th>
              <th>Catégorie</th>
            </tr>
          </thead>
          <tbody>
            {product.products.length > 0 ? (
              product.products.map((p) => {
                return (
                  <tr key={p.id}>
                    <td>
                      <img
                        src={config.pict_url + p.img}
                        style={{ width: "100px", height: "100px" }}
                      />
                    </td>
                    <td>{p.name}</td>

                    <td>{p.price}€ </td>
                    <td> {p.stock}</td>
                    <td>
                      <button>
                        <Link
                          className="editProduct"
                          to={`/editProduct/${p.id}`}
                        >
                          Modifier
                        </Link>
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          onClickDeleteProduct(p.id);
                        }}
                      >
                        Supprimer
                      </button>
                    </td>
                    <td>
                      <select
                        value={p.id_status}
                        onChange={(e) => handleProductStatusChange(e, p.id)}
                      >
                        <option value="2">Visible</option>
                        <option value="1">Invisible</option>
                      </select>
                    </td>
                    <td>
                      {/* <select
                        value={p.id_category}
                        onChange={(e) => handleCategoryChange(e, p.id)}
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select> */}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="3"></td>
              </tr>
            )}
          </tbody>
        </table>
      </article>
      <hr />
      {/* les category */}
      <article>
        <h3 id="category">Catégories</h3>
        <h4>Ajouter une Catégorie</h4>
        <Link to="/addCategory">
          <FontAwesomeIcon className="icone" icon={faPlusCircle} />
        </Link>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(localCategories) &&
              localCategories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>
                    <select
                      value={category.id_status}
                      onChange={(e) => handleStatusChange(e, category.id)}
                    >
                      <option value="2">Visible</option>
                      <option value="1">Invisible</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={() => handleDeleteCategory(category.id)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </article>
      <hr />
      {/* les users */}
      <article>
        <h3 id="user">Tous les utilisateurs</h3>
        <table className="tableProduct">
          <thead>
            <tr>
              <th>N° Client</th>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Date d'inscription</th>
              <th>derniere connection </th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    {new Date(user.create_at).toLocaleDateString("fr-FR")}
                  </td>
                  <td>
                    {new Date(user.connectionTimestamp).toLocaleDateString(
                      "fr-FR"
                    )}
                  </td>
                  <td>
                    <select
                      value={user.id_role}
                      onChange={(e) => {
                        const newRoleId = e.target.value;
                        updateUserRoleAndState(user.id, newRoleId);
                      }}
                    >
                      <option value={1}>User</option>
                      <option value={2}>Admin</option>
                      <option value={3}>Prépa</option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={user.id_status}
                      onChange={(e) => {
                        const newStatus = e.target.value;
                        updateUserStatusAndState(user.id, newStatus);
                      }}
                    >
                      <option value="2">Visible</option>
                      <option value="1">Invisible</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">Aucun utilisateur trouvé</td>
              </tr>
            )}
          </tbody>
        </table>
      </article>
      <hr />
      {/* les messages */}
      <article>
        <h3 id="messages">Messages de contact</h3>
        <table className="tableProduct">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date et heure d'envoi</th>
            </tr>
          </thead>
          <tbody>
            {contactMessage.length > 0 ? (
              contactMessage.map((message) => (
                <tr key={message.id}>
                  <td>{message.lastname}</td>
                  <td>{message.firstname}</td>
                  <td>
                    <a href={`mailto:${message.email}`}>{message.email}</a>
                  </td>
                  <td>{message.content}</td>
                  <td>
                    {moment(message.send_at).format("DD-MM-YYYY HH:mm:ss")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Chargement en cours...</td>
              </tr>
            )}
          </tbody>
        </table>
      </article>
    </section>
  );
};

export default Admin;
