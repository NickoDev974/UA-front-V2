import { useState, useEffect } from "react";
import { addOneCategor, displaycategory } from "../../../api/category";
import { Link } from "react-router-dom";

const AddCategory = () => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [localCategories, setLocalCategories] = useState([]);

  const handleNewCategoryNameChange = (event) => {
    setNewCategoryName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCategoryData = {
      name: newCategoryName,
      id_status: 2,
    };

    addOneCategor(newCategoryData)
      .then((res) => {
        setNewCategoryName("");

        // Mettre à jour la liste des catégories après l'ajout
        displaycategory()
          .then((data) => {
            setLocalCategories(data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.error("Erreur lors de l'ajout de la catégorie :", err);
      });
  };
  useEffect(() => {
    // Récupérer toutes les catégories et mettre à jour le state
    displaycategory()
      .then((data) => {
        setLocalCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <article className="category">
      <Link className="return" to="/admin">
        ⬅️ Retour à la page admin
      </Link>
      <div className="boxCategory">
        <div className="newCategory">
          <h3>Ajouter une catégorie</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="newCategoryName">Nom de la catégorie :</label>
              <input
                type="text"
                id="newCategoryName"
                value={newCategoryName}
                onChange={handleNewCategoryNameChange}
                required
              />
            </div>
            <button type="submit">Ajouter</button>
          </form>
        </div>
        <div className="existingCategory">
          <h3>Catégories existantes</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(localCategories) &&
                localCategories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </article>
  );
};

export default AddCategory;
