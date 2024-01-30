import axios from "axios";
import React, { useEffect, useState } from "react";

function UserList() {
  const api_URL = process.env.REACT_APP_BASE_API_URL;
  const [user, setUser] = useState([
    {
      _id: "",
      name: "",
      username: "",
      email: "",
      isAdmin: false,
    },
  ]);
  const refreshList = async () => {
    try {
      const resp = await axios.get(`${api_URL}/user/allusers`);
      if (resp.status === 200) {
        setUser(resp.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    refreshList();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr className="row">
            <th className="col-1 text-center">#</th>
            <th className="col-2 text-center">Full Name</th>
            <th className="col-2 text-center">User Name</th>
            <th className="col-6 text-center">Email</th>
            <th className="col-1 text-center">Admin</th>
          </tr>
        </thead>
        <tbody>
          {user.map((e, index) => (
            <tr className="row" key={e._id}>
              <td className="col-1 text-center">{index + 1}</td>
              <td className="col-2 text-center">{e.name}</td>
              <td className="col-2 text-center">{e.username}</td>
              <td className="col-6 text-center">{e.email}</td>
              <td className="col-1 text-center">
                {e.isAdmin ? <b>Yes</b> : <b>No</b>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
