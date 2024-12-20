import { useContext, useRef } from "react";
import CartContext from "../../Store/CartContaxt";
import "./ShoesForm.css";

const ShoesForm = (props) => {
  const shoesName = useRef();
  const description = useRef();
  const price = useRef();
  const large = useRef();
  const medium = useRef();
  const small = useRef();

  const cartCtx = useContext(CartContext);

  const addItemInContext = (event) => {
    event.preventDefault();

    let item = {
      shoesName: shoesName.current.value,
      description: description.current.value,
      price: price.current.value,
      large: large.current.value,
      medium: medium.current.value,
      small: small.current.value,
    };

    cartCtx.addItem(item);
  };

  return (
    <div className="form-div">
      <form className="form-submit">
        <label className="form-label" htmlFor="shoesName">
          Shoe Name
        </label>
        <input
          className="form-input"
          id="shoesName"
          type="text"
          ref={shoesName}
          required
        />

        <label className="form-label" htmlFor="description">
          Description
        </label>
        <input
          className="form-input"
          id="description"
          type="text"
          ref={description}
          required
        />

        <label className="form-label" htmlFor="price">
          Price
        </label>
        <input
          className="form-input"
          id="price"
          type="number"
          ref={price}
          required
        />

        <h3>Size Quantity Available</h3>

        <label className="form-label" htmlFor="large">
          Large
        </label>
        <input
          className="form-input"
          id="large"
          type="number"
          ref={large}
          required
        />

        <label className="form-label" htmlFor="medium">
          Medium
        </label>
        <input
          className="form-input"
          id="medium"
          type="number"
          ref={medium}
          required
        />

        <label className="form-label" htmlFor="small">
          Small
        </label>
        <input
          className="form-input"
          id="small"
          type="number"
          ref={small}
          required
        />

        <button className="form-button" onClick={addItemInContext}>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ShoesForm;
