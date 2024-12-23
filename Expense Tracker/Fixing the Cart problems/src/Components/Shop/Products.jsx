import ProductItem from "./ProductItem";
import styles from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 6,
    title: "My first book",
    description: "The first book I ever wrote",
  },
  {
    id: "p2",
    price: 5,
    title: "My second book",
    description: "The second book I wrote",
  },
];

const Products = (props) => {
  return (
    <section className={styles.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
