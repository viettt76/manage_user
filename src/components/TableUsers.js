import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUsers } from "../services/UserService";
function TableUsers() {
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const res = await fetchAllUsers();

    if (res && res.data && res.data.data) setListUsers(res.data.data);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {listUsers &&
          listUsers.length > 0 &&
          listUsers.map((user, index) => {
            return (
              <tr key={`user-${index}`}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
}

export default TableUsers;
