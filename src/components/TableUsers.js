import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { Button } from "react-bootstrap";
import _ from "lodash";
import { fetchAllUsers } from "../services/UserService";
import ModalEditUser from "./ModalEditUser";

function TableUsers({ newUser = {} }) {
  const [listUsers, setListUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
  const [dataEditUser, setDataEditUser] = useState({});

  useEffect(() => {
    getUsers(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setListUsers([newUser, ...listUsers]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newUser]);

  const getUsers = async (page) => {
    const res = await fetchAllUsers(page);
    if (res && res.data) {
      setListUsers(res.data);
      setTotalPages(res.total_pages);
    }
  };

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };

  const handleEditUser = (user) => {
    setIsShowModalEditUser(true);
    setDataEditUser(user);
  };

  const handleUpdateTable = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers)
    const index = listUsers.findIndex((item) => item.id === user.id);
    cloneListUsers[index].first_name = user.first_name
    setListUsers(cloneListUsers)
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
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
                  <td>
                    <Button
                      variant="warning"
                      className="mr-20"
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </Button>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <ModalEditUser
        show={isShowModalEditUser}
        handleClose={() => setIsShowModalEditUser(false)}
        dataEditUser={dataEditUser}
        handleUpdateTable={handleUpdateTable}
      />

      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
    </>
  );
}

export default TableUsers;
