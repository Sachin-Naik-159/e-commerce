import React, { useEffect, useState } from "react";
import { Button, CardImg, Col, Container, Form, Row } from "react-bootstrap";
import Stars from "../components/Stars";
import axios from "axios";
import { toast } from "react-toastify";
import Review from "../components/Review";
import BtnAddCart from "../components/BtnAddCart";

function Product() {
  const api_URL = process.env.REACT_APP_BASE_API_URL;
  let id = window.location.pathname.split("/")[2];
  let initialState = {
    id: "1",
    name: "",
    price: 0,
    rating: [],
    image: "",
    description: "",
    quantity: 0,
  };
  const [prod, setProduct] = useState({
    product: initialState,
    rating: initialState.rating,
  });
  const [review, setReview] = useState({
    comment: "",
    rate: 0,
  });

  // Get product with id
  const getproduct = async () => {
    let resp = await axios.get(`${api_URL}/product/${id}`);
    let rate = [];
    resp.data.rating.map((e) => {
      rate = [...rate, e.rate];
      return null;
    });
    setProduct({ product: resp.data, rating: rate });
  };

  // Give review
  const reviewHandler = async (e) => {
    e.preventDefault();
    console.log(review);
    if (review.rate !== 0) {
      let resp = await axios.put(`${api_URL}/product/rate/${id}`, review);
      if (resp.status === 200) {
        toast.success(resp.data.message);
        setReview({ comment: "", rate: 0 });
        getproduct();
      } else {
        toast.error(resp.data.message);
      }
    } else {
      toast.error("Please Rate");
    }
  };

  useEffect(() => {
    getproduct();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Row>
        <Col lg={5} className="d-flex justify-content-center">
          <CardImg
            className="img-fluid rounded p-4"
            src={prod.product.image}
            alt="Product Image"
            style={{ width: "30rem" }}
          />
        </Col>

        {/* Product Details */}
        <Col lg={4} className="mt-2">
          <Container className="p-2 mt-4 mb-5 bg-white rounded shadow">
            <h1>{prod.product.name}</h1>
            <hr />
            <Stars rate={prod.rating} />
            <hr />
            <p>
              <strong>Description:</strong> {prod.product.description}
            </p>
          </Container>
        </Col>
        <Col lg={2} className="mt-2">
          <Container className="p-2 mt-4 mb-5 bg-white rounded shadow">
            <h5>Price: ₹{prod.product.price}</h5>
            <hr />
            {prod.product.quantity > 0 ? (
              <h5>Status: In Stock</h5>
            ) : (
              <h5>Status: Not In Stock</h5>
            )}
            <hr />
            {prod.product.quantity > 0 ? (
              <BtnAddCart data={prod.product} />
            ) : (
              <Button type="button" variant="secondary disabled">
                Notift
              </Button>
            )}
          </Container>
        </Col>
        <Col lg={1}></Col>
      </Row>

      {/* Reviews */}
      {prod.rating.length > 0 ? (
        <Row className="p-5">
          <h1 className="d-flex justify-content-center">Reviews</h1>
          <Review data={prod.product.rating} />
        </Row>
      ) : (
        <></>
      )}

      {/* Rate product */}
      {localStorage.getItem("user") !== null ? (
        <Row className="p-4">
          <Container className="mt-4 mb-5 bg-white rounded shadow">
            <h1>Write a Review</h1>
            <Form className="ml-5 mr-5" onSubmit={reviewHandler}>
              <Form.Label className="mt-3">Rating</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) =>
                  setReview({ ...review, rate: Number(e.target.value) })
                }
              >
                <option value="0">Choose a rating</option>
                <option value="1">1-Poor</option>
                <option value="2">2-Fair</option>
                <option value="3">3-Average</option>
                <option value="4">4-Good</option>
                <option value="5">5-Excelent</option>
              </Form.Select>
              <Form.Label className="mt-3">Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Review"
                value={review.comment}
                onChange={(e) =>
                  setReview({ ...review, comment: e.target.value })
                }
              />
              <Button type="submit" variant="warning" className="mt-3 mb-3">
                Submit
              </Button>
            </Form>
          </Container>
        </Row>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Product;
