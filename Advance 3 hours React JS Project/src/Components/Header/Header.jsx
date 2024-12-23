import HeaderCartButton from "./HeaderCartButton";
import "./Header.css";

const Header = (props) => {
  return (
    <div className="header">
      <h1 className="logo">Shoes Store</h1>
      <HeaderCartButton showCartHandler={props.showCartHandler} />
    </div>
  );
};

export default Header;
