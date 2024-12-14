import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import CartContext from "../Store/CartContext";

const ProductList = () => {
  const productsArr = [
    {
      id: "1",
      quantity: 1,
      title: "Colors",
      price: 100,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
    },
    {
      id: "2",
      quantity: 1,
      title: "Black and white Colors",
      price: 50,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
    },
    {
      id: "3",
      quantity: 1,
      title: "Yellow and Black Colors",
      price: 70,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
    },
    {
      id: "4",
      quantity: 1,
      title: "Blue Color",
      price: 100,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
    },
  ];

  let cartContext = useContext(CartContext);
  const addItemToCart = (item) => {
    cartContext.addItem(item);
  };

  return (
    <>
      <Container>
        <h1 className="text-center p-3">Products</h1>
        <Row className="justify-content-center">
          {productsArr.map((product, index) => (
            <Col className="md-4" key={index}>
              <Card className="mb-4" style={{ width: "18rem" }}>
                <Card.Title className="text-center pt-3">
                  {product.title}
                </Card.Title>
                <Card.Body>
                  <Card.Img variant="top" src={product.imageUrl} />
                  <Card.Text className="pt-3">${product.price}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => addItemToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default ProductList;
