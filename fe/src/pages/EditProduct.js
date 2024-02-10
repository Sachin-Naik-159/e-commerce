import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Row, Col, Container, Form, CardImg } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditProduct() {
  const api_URL = process.env.REACT_APP_BASE_API_URL;
  const prod_id = window.location.pathname.split("/")[2];
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Handle Inmage
  const [image, setImage] = useState("");
  const handleFileSelect = (event) => {
    setLoading(true);
    const img = event.target.files[0];
    setImage(img);
  };
  const handleImgUpload = async () => {
    let formData = new FormData();
    formData.append("file", image);
    const response = await axios.post(`${api_URL}/file/uploadFile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  };

  //Get Catagory
  const [cat, setCat] = useState({
    catagory: [],
    subcatagory: [],
  });
  const getCatagory = async () => {
    let resp = await axios.get(`${api_URL}/product/getCatagory`);
    setCat({
      catagory: resp.data.catagory,
      subcatagory: resp.data.subcatagory,
    });
  };

  //Custom catagory state
  const [cstCatagory, setCstCatagory] = useState(false);
  const changeState = () => {
    if (cstCatagory) {
      setCstCatagory(false);
    } else {
      setCstCatagory(true);
    }
  };

  //Product state
  const initialProduct = {
    name: "",
    price: "",
    quantity: "",
    description: "",
    catagory: "",
    subcatagory: "",
    image: "",
  };
  const [product, setProduct] = useState(initialProduct);

  //Edit a product
  const subminHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    let imgRes = "";
    let prod = { ...product };
    if (image !== "") {
      imgRes = await handleImgUpload();
      prod = { ...product, image: `${api_URL}/file/${imgRes.data.fileName}` };
    }
    if (JSON.stringify(prod) !== JSON.stringify(initialProduct)) {
      let text = "Do you want to edit the product";
      let confirmation = window.confirm(text);
      if (confirmation === true) {
        const resp = await axios.put(`${api_URL}/product/${prod_id}`, prod);
        if (resp.status === 200) {
          setLoading(false);
          toast.success(resp.data.message);
        }
      }
      setLoading(false);
    } else toast.warning("Enter Data");
    setLoading(false);
  };

  //Delete a product
  const deleteHandler = async (e) => {
    e.preventDefault();
    let text = "Do you want to delete the product";
    let confirmation = window.confirm(text);

    if (confirmation === true) {
      try {
        let resp = await axios.delete(`${api_URL}/product/${prod_id}`);
        toast.success(resp.data.message);
        navigate("/");
      } catch (err) {}
    }
  };

  //Reference Product
  const [refProd, setRefProd] = useState(initialProduct);
  const getRefProd = async () => {
    const resp = await axios.get(`${api_URL}/product/${prod_id}`);
    setRefProd(resp.data);
  };

  //Load
  const refresh = () => {
    getRefProd();
    getCatagory();
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line
  }, []);
  return (
    <Row>
      <Col lg="3">
        <h1 className="text-center">Product Details</h1>
        <div className="d-flex align-items-center rounded mt-5 ">
          <CardImg
            className="img-fluid rounded p-4"
            src={refProd.image}
            alt="Product Image"
            style={{ height: "20rem", width: "auto" }}
          />
          <div style={{ margin: "0 0 0 2vw" }}>
            <p>
              <b>Name:</b>
              {"      "}
              {refProd.name}
            </p>
            <p>
              <b>Price:</b>
              {"     "}
              {refProd.price}
            </p>
            <p>
              <b>Quantity:</b>
              {"      "}
              {refProd.quantity}
            </p>
            <p>
              <b>Catagory:</b>
              {"      "}
              {refProd.catagory}
            </p>
            <p>
              <b>SubCatagory:</b>
              {"      "}
              {refProd.subcatagory}
            </p>
            <p>
              <b>Description:</b>
              {"      "}
              {refProd.description}
            </p>
          </div>
        </div>
        <div style={{ margin: "0 0 0 2vw" }}>
          <Button type="submit" variant="danger" onClick={deleteHandler}>
            Delete
          </Button>
        </div>
      </Col>
      <Col lg="9">
        <div className="d-flex align-items-center rounded mt-5">
          <Container
            className="p-3 mb-5 bg-white rounded"
            style={{ width: "400px" }}
          >
            <Col className=" justify-content-center align-items-center">
              <h3 className="text-center">Edit Product</h3>
              <Form className="mb-3 mt-2" onSubmit={subminHandler}>
                {/* Product Name */}
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={product.name}
                    onChange={(e) =>
                      setProduct({ ...product, name: e.target.value })
                    }
                  ></Form.Control>
                </Form.Group>
                {/* Product Price */}
                <Form.Group className="mb-3">
                  <Form.Control
                    type="number"
                    placeholder="price"
                    value={product.price}
                    onChange={(e) =>
                      setProduct({ ...product, price: e.target.value })
                    }
                  ></Form.Control>
                </Form.Group>
                {/* Product Quantity */}
                <Form.Group className="mb-3">
                  <Form.Control
                    type="number"
                    placeholder="quantity"
                    value={product.quantity}
                    onChange={(e) =>
                      setProduct({ ...product, quantity: e.target.value })
                    }
                  ></Form.Control>
                </Form.Group>
                {/* Product Catagory */}
                <Form.Group className="mb-3">
                  <Form.Check
                    className="mb-3"
                    type="checkbox"
                    id="cstcat"
                    label="CustomCatagory"
                    checked={cstCatagory}
                    onChange={changeState}
                  />
                  {cstCatagory ? (
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Custom Catagory"
                        value={product.catagory}
                        onChange={(e) =>
                          setProduct({ ...product, catagory: e.target.value })
                        }
                      ></Form.Control>
                      <Form.Control
                        type="text"
                        placeholder="Custom subcatagory"
                        value={product.subcatagory}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            subcatagory: e.target.value,
                          })
                        }
                      ></Form.Control>
                    </Form.Group>
                  ) : (
                    <Form.Group className="mb-3">
                      <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => {
                          setProduct({ ...product, catagory: e.target.value });
                          setCstCatagory(false);
                        }}
                      >
                        <option value="">Choose a catagory</option>
                        {cat.catagory.map((data) => {
                          return (
                            <option key={data} value={data}>
                              {data}
                            </option>
                          );
                        })}
                      </Form.Select>
                      <Form.Select
                        aria-label="Default select example"
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            subcatagory: e.target.value,
                          })
                        }
                      >
                        <option value="">Choose a subcatagory</option>
                        {cat.subcatagory.map((data) => {
                          return (
                            <option key={data} value={data}>
                              {data}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </Form.Group>
                  )}
                </Form.Group>
                {/* Product Description */}
                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="description"
                    value={product.description}
                    onChange={(e) =>
                      setProduct({ ...product, description: e.target.value })
                    }
                  ></Form.Control>
                </Form.Group>
                {/* Product Image */}
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Image</Form.Label>
                  <Form.Control type="file" onChange={handleFileSelect} />
                </Form.Group>
                {loading ? (
                  <div className="col-md-12 mt-3 text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <Button type="submit" variant="dark">
                    Edit
                  </Button>
                )}
              </Form>
            </Col>
          </Container>
        </div>
      </Col>
    </Row>
  );
}

export default EditProduct;
