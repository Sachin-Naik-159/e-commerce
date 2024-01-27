import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import CarouselUnctrl from "../components/CarouselUnctrl";

function SearchPage() {
  let q = window.location.href.split("?")[1];
  const [pagedata, setPagedata] = useState({ page: 0, lastpage: 0, skip: 0 });
  const [allProduct, setAllProduct] = useState([]);
  const postPerPage = 8;
  const api_URL = process.env.REACT_APP_BASE_API_URL;

  // Get Products
  const products = async () => {
    if (q === "") {
      setAllProduct([]);
    } else {
      if (q === undefined) {
        q = "null";
      }
      let resp = await axios.get(
        `${api_URL}/product/allproducts/${q}/${postPerPage}/${pagedata.skip}`
      );
      setAllProduct(resp.data.products);
      setPagedata({ ...pagedata, lastpage: resp.data.count / postPerPage });
    }
  };

  //Get next Products
  const nextProd = async () => {
    let page = pagedata.page + 1;
    let skip = page * postPerPage;
    setPagedata({ ...pagedata, page: page, skip: skip });
    if (q === undefined) {
      q = "null";
    }
    let resp = await axios.get(
      `${api_URL}/product/allproducts/${q}/${postPerPage}/${skip}`
    );
    setAllProduct(resp.data.products);
  };

  //Get prev Products
  const prevProd = async () => {
    let page = pagedata.page - 1;
    let skip = page * postPerPage;
    setPagedata({ ...pagedata, page: page, skip: skip });
    if (q === undefined) {
      q = "null";
    }
    let resp = await axios.get(
      `${api_URL}/product/allproducts/${q}/${postPerPage}/${skip}`
    );
    setAllProduct(resp.data.products);
  };

  useEffect(() => {
    products();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="row mt-5 ">
        {q === undefined && pagedata.page === 0 ? (
          <>
            <CarouselUnctrl />
          </>
        ) : (
          <></>
        )}
        {allProduct.length === 0 ? (
          <h2 className="mt-5 d-flex justify-content-center">No Match Found</h2>
        ) : (
          <></>
        )}
        {allProduct.map((data) => {
          return (
            <div
              className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mt-5"
              key={data._id}
            >
              <Card prod={data} />
            </div>
          );
        })}
      </div>
      <div className="row mb-5">
        <div className="col align-self-start d-flex justify-content-center">
          {pagedata.page === 0 ? (
            <></>
          ) : (
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={prevProd}
            >
              Previous
            </button>
          )}
        </div>

        <div className="col align-self-end d-flex justify-content-center">
          {pagedata.page + 1 < pagedata.lastpage ? (
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={nextProd}
            >
              Next
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
