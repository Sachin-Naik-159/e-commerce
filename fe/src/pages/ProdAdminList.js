import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProdAdminList() {
  const navigate = useNavigate();
  const [pagedata, setPagedata] = useState({ page: 0, lastpage: 0, skip: 0 });
  const [allProduct, setAllProduct] = useState([]);
  const api_URL = process.env.REACT_APP_BASE_API_URL;
  const postPerPage = 10;

  // Get Products
  const products = async () => {
    let resp = await axios.get(
      `${api_URL}/product/allproducts/null/${postPerPage}/${pagedata.skip}`
    );
    setAllProduct(resp.data.products);
    setPagedata({ ...pagedata, lastpage: resp.data.count / postPerPage });
  };

  //Get next Products
  const nextProd = async () => {
    let page = pagedata.page + 1;
    let skip = page * postPerPage;
    setPagedata({ ...pagedata, page: page, skip: skip });
    let resp = await axios.get(
      `${api_URL}/product/allproducts/null/${postPerPage}/${skip}`
    );
    setAllProduct(resp.data.products);
  };

  //Get prev Products
  const prevProd = async () => {
    let page = pagedata.page - 1;
    let skip = page * postPerPage;
    setPagedata({ ...pagedata, page: page, skip: skip });
    let resp = await axios.get(
      `${api_URL}/product/allproducts/null/${postPerPage}/${skip}`
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
        <table className="table table-striped table-bordered">
          <thead>
            <tr className="row">
              <th className="col-1 text-center">#</th>
              <th className="col-3 text-center">img</th>
              <th className="col-2 text-center">Name</th>
              <th className="col-2 text-center">Price</th>
              <th className="col-2 text-center">Quantity</th>
              <th className="col-2 text-center">Edit</th>
            </tr>
          </thead>
          <tbody>
            {allProduct.map((data, index) => {
              return (
                <tr className="row" key={data._id}>
                  <td className="col-1 text-center">{index + 1}</td>
                  <td className="col-3 text-center">
                    <img
                      src={data.image}
                      alt={data.name}
                      style={{ width: "10vw" }}
                    />
                  </td>
                  <td className="col-2 text-center">{data.name}</td>
                  <td className="col-2 text-center">{data.price}</td>
                  <td className="col-2 text-center">{data.quantity}</td>
                  <td className="col-2 text-center">
                    <button
                      className="btn btn-warning"
                      type="button"
                      onClick={() => {
                        navigate(`/editproduct/${data._id}`);
                      }}
                    >
                      <i className="fa-solid fa-pen fa-2xs"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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

export default ProdAdminList;
