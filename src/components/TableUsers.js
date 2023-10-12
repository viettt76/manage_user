import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { Button } from "react-bootstrap";
import _ from "lodash";
import { fetchAllUsers } from "../services/UserService";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import "./TableUser.scss";

function TableUsers({ newUser = {} }) {
  const [listUsers, setListUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
  const [dataEditUser, setDataEditUser] = useState({});

  const [isShowModalDeleteUser, setIsShowModalDeleteUser] = useState(false);
  const [dataDeleteUser, setDataDeleteUser] = useState({});

  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");

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

  const handleUpdateTable = (user, action) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    const index = listUsers.findIndex((item) => item.id === user.id);
    if (action === "edit") {
      cloneListUsers[index].first_name = user.first_name;
    } else if (action === "delete") {
      cloneListUsers.splice(index, 1);
    }
    setListUsers(cloneListUsers);
  };

  const handleEditUser = (user) => {
    setIsShowModalEditUser(true);
    setDataEditUser(user);
  };

  const handleDeleteUser = (user) => {
    setIsShowModalDeleteUser(true);
    setDataDeleteUser(user);
  };

  const handleSortHeader = (sortByValue, sortFieldValue) => {
    setSortBy(sortByValue)
    setSortField(sortFieldValue)

    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = _.orderBy(cloneListUsers, [sortFieldValue], [sortByValue])
    setListUsers(cloneListUsers)
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="sort-header">
                <span>ID</span>
                <div>
                  <i
                    className="fa-solid fa-arrow-down-long"
                    onClick={() => handleSortHeader("desc", "id")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up-long"
                    onClick={() => handleSortHeader("asc", "id")}
                  ></i>
                </div>
              </div>
            </th>
            <th>
              <div className="sort-header">
                <span>First Name</span>
                <div>
                  <i
                    className="fa-solid fa-arrow-down-long"
                    onClick={() => handleSortHeader("desc", "first_name")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up-long"
                    onClick={() => handleSortHeader("asc", "first_name")}
                  ></i>
                </div>
              </div>
            </th>
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
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteUser(user)}
                    >
                      Delete
                    </Button>
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

      <ModalConfirm
        show={isShowModalDeleteUser}
        handleClose={() => setIsShowModalDeleteUser(false)}
        dataEditUser={dataDeleteUser}
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
