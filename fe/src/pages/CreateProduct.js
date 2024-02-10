import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateProduct() {
  const api_URL = process.env.REACT_APP_BASE_API_URL;
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
    if (image !== "") {
      formData.append("file", image);
      const response = await axios.post(
        `${api_URL}/file/uploadFile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    }
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

  // State for Check box
  const [cstCatagory, setCstCatagory] = useState(false);
  const changeState = () => {
    if (cstCatagory) {
      setCstCatagory(false);
    } else {
      setCstCatagory(true);
    }
  };

  //Product State
  const initialProductState = {
    name: "",
    price: "",
    quantity: "",
    description: "",
    catagory: "",
    subcatagory: "",
    image: "",
  };
  const [product, setProduct] = useState(initialProductState);

  // Product Submission
  const subminHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    let prod = product;
    let imgRes = "";
    if (
      product.name === "" ||
      product.price === "" ||
      product.quantity === "" ||
      product.catagory === ""
    )
      toast.warning("Enter Data");
    else {
      if (image !== "") {
        imgRes = await handleImgUpload();
        prod = {
          ...product,
          image: `${api_URL}/file/${imgRes.data.fileName}`,
        };
      }
      let text = "Do you want to create the product";
      let confirmation = window.confirm(text);

      if (confirmation === true) {
        const resp = await axios.post(`${api_URL}/product`, prod);
        setLoading(false);
        toast.success(resp.data.message);
        navigate("/");
      }
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCatagory();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="d-flex align-items-center rounded mt-5">
      <Container
        className="p-3 mb-5 bg-white rounded"
        style={{ width: "400px" }}
      >
        <Col className=" justify-content-center align-items-center">
          <h1 className="text-center">Create Product</h1>
          <Form className="mb-3 mt-5" onSubmit={subminHandler}>
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
                    className="mb-2"
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
                      setProduct({ ...product, subcatagory: e.target.value })
                    }
                  ></Form.Control>
                </Form.Group>
              ) : (
                <Form.Group className="mb-3">
                  <Form.Select
                    className="mb-2"
                    aria-label="Default select example"
                    onChange={(e) => {
                      setProduct({ ...product, catagory: e.target.value });
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
                      setProduct({ ...product, subcatagory: e.target.value })
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
            {/* Product description */}
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
                Create
              </Button>
            )}
          </Form>
        </Col>
      </Container>
    </div>
  );
}

export default CreateProduct;
