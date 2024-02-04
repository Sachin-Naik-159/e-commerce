import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AllOrders = () => {
  const navigate = useNavigate();
  const api_URL = process.env.REACT_APP_BASE_API_URL;
  const type = window.location.pathname.split("/")[1];
  const [orderList, setOrderList] = useState([]);

  //Get Order data
  const getOrder = async () => {
    try {
      let resp;
      if (type === "adminallorders") {
        resp = await axios.get(`${api_URL}/user/allorders/admin`);
      } else {
        resp = await axios.get(`${api_URL}/user/allorders/user`);
      }
      if (resp.status === 200) {
        setOrderList(resp.data);
        console.log(resp.data);
      }
    } catch (err) {}
  };

  const orderDetails = (id) => {
    navigate(`/orderdetail/${id}`);
  };

  //Table structure
  function TableHead() {
    return (
      <thead>
        <tr className="row">
          <th className="col-1 text-center">#</th>
          <th className="col-3 text-center">ID</th>
          <th className="col-2 text-center">Date</th>
          <th className="col-2 text-center">Total($)</th>
          <th className="col-1 text-center">Paid</th>
          <th className="col-1 text-center">Delivered</th>
          <th className="col-2 text-center">Action</th>
        </tr>
      </thead>
    );
  }
  function FullTable() {
    return (
      <table className="table table-striped table-bordered">
        <TableHead />
        <tbody>
          {orderList.map((e, i) => (
            <tr className="row" key={e._id}>
              {type === "adminallorders" ? (
                <td className="col-1 text-center">{e.custId.username}</td>
              ) : (
                <td className="col-1 text-center">{i + 1}</td>
              )}
              <td className="col-3 text-center">{e._id}</td>
              <td className="col-2 text-center">
                {` ${new Date(e.createdAt)}`.substring(5, 16)}
              </td>
              <td className="col-2 text-center">{e.amount}</td>
              <td className="col-1 text-center">
                {e.deal_status === "Not Paid" ? <>N</> : <>Y</>}
              </td>
              <td className="col-1 text-center">N</td>
              <td className="col-2 text-center">
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    orderDetails(e._id);
                  }}
                >
                  <i className="fa-solid fa-info fa-xs"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  useEffect(() => {
    getOrder();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      {type === "adminallorders" ? (
        <div className="d-grid text-center mt-3">
          <h1>All Orders</h1>
          {orderList.length === 0 ? (
            <h4 className="mt-5">Empty</h4>
          ) : (
            <div className="row mt-2">
              <FullTable />
            </div>
          )}
        </div>
      ) : (
        <div className="d-grid text-center mt-3">
          <h1>Order History</h1>
          {orderList.length === 0 ? (
            <h4 className="mt-5">Empty</h4>
          ) : (
            <div className="row mt-2">
              <FullTable />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllOrders;
