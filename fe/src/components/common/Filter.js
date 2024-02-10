import axios from "axios";
import React, { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./filter.css";

function Filter() {
  const api_URL = process.env.REACT_APP_BASE_API_URL;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [cat, setCat] = useState({
    catagory: [],
    subcatagory: [],
  });

  const getCatagory = async () => {
    try {
      let resp = await axios.get(`${api_URL}/product/getCatagory`);
      setCat({
        catagory: resp.data.catagory,
        subcatagory: resp.data.subcatagory,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCatagory();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <button
        className="me-3"
        onClick={handleShow}
        style={{ background: "none", border: "none" }}
      >
        <i className="fa-solid fa-filter fa-lg"></i>
      </button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Offcanvas.Title>Catagory</Offcanvas.Title>
          {cat.catagory.map((data) => {
            return (
              <ul className="row mt-2" key={data}>
                <li>
                  <a className="ancor" href={`/search?${data}`}>
                    {data}
                  </a>
                </li>
              </ul>
            );
          })}
          <Offcanvas.Title className="mt-5">SubCatagory</Offcanvas.Title>
          {cat.subcatagory.map((data) => {
            return (
              <ul className="row mt-2" key={data}>
                <li>
                  <a className="ancor" href={`/search?${data}`}>
                    {data}
                  </a>
                </li>
              </ul>
            );
          })}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Filter;
