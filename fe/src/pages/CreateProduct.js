import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function CreateProduct() {
  const api_URL = process.env.REACT_APP_BASE_API_URL;
  //Logged in user
  const user = useSelector((state) => {
    return state.userReducer.user;
  });
  // Handle Inmage
  const [image, setImage] = useState("");
  const handleFileSelect = (event) => {
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
    // setProduct({
    //   ...product,
    //   image: `${api_URL}/file/${response.data.fileName}`,
    // });
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

  const [cstCatagory, setCstCatagory] = useState(false);

  //Product
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    catagory: "",
    subcatagory: "",
    image: "",
  });

  const subminHandler = async (e) => {
    e.preventDefault();
    let imgRes = "";
    if (image !== "") {
      imgRes = await handleImgUpload();
      // setProduct({
      //   ...product,
      //   image: `${api_URL}/file/${imgRes.data.fileName}`,
      // });
    }
    console.log(product);
    const resp = await axios.post(`${api_URL}/product/${user._id}`, {
      ...product,
      image: `${api_URL}/file/${imgRes.data.fileName}`,
    });
    if (resp.status === 200) {
      toast.success(resp.data.message);
    }
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
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                className="mb-3"
                type="checkbox"
                id="cstcat"
                value={true}
                label="CustomCatagory"
                checked={cstCatagory}
                onChange={(e) => setCstCatagory(e.target.value)}
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
                      setProduct({ ...product, subcatagory: e.target.value })
                    }
                  ></Form.Control>
                </Form.Group>
              ) : (
                <>
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
                </>
              )}
            </Form.Group>

            {/* <Form.Group className="mb-3">
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
            </Form.Group> */}

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleFileSelect} />
            </Form.Group>
            <Button type="submit" variant="dark">
              Create
            </Button>
          </Form>
        </Col>
      </Container>
    </div>
  );
}

export default CreateProduct;
