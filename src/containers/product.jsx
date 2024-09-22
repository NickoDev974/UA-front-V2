import { useState } from "react";
import { useSelector } from "react-redux";
import { selectProducts } from "../slices/productSlice";
//import { selectCategory } from "../slices/categorySlice";
import ArticleDetail from "../components/article-product";

import enconstruction from "/src/assets/images/page-en-construction.png";

const Product = (props) => {
  const produits = useSelector(selectProducts);
  // const categories = useSelector(selectCategory);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtrer les produits par le terme de recherche et par id_status
  const filteredProducts = produits.products.filter(
    (product) =>
      product.id_status !== 1 &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <section className="tempory">
        <img
          src={enconstruction}
          alt="page en construction"
          className="construction"
        />
      </section>
      {/* section pour affichage des article quand BDD active  */}
      <section className="shop">
        <h2>Univers aquatique vous propose :</h2>
        <div>
          <input
            className="searchBar"
            type="text"
            placeholder="Rechercher des produits..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        {filteredProducts.length > 0 && (
          <ul>
            {filteredProducts.map((product) => {
              // Vérifier si le stock est épuisé
              const stockEpuise = product.stock === 0;

              return (
                <ArticleDetail
                  key={product.id}
                  prod={product}
                  stockEpuise={stockEpuise} // Passer la valeur stockEpuise comme prop
                />
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
};

export default Product;
