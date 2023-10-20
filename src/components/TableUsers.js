import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { Button } from "react-bootstrap";
import _ from "lodash";
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { toast } from "react-toastify";

import { fetchAllUsers } from "../services/UserService";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import "./TableUser.scss";
import useDebounce from "../hooks/useDebounce";

function TableUsers() {
  const [listUsers, setListUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

  const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
  const [dataEditUser, setDataEditUser] = useState({});

  const [isShowModalDeleteUser, setIsShowModalDeleteUser] = useState(false);
  const [dataDeleteUser, setDataDeleteUser] = useState({});

  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    getUsers(currentPage);
  }, [currentPage]);

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
    if (action === "add") {
      cloneListUsers = [user, ...cloneListUsers];
    } else if (action === "edit") {
      cloneListUsers[index].first_name = user.first_name;
    } else if (action === "delete") {
      cloneListUsers.splice(index, 1);
    }
    setListUsers(cloneListUsers);
  };

  const handleAddNewUser = () => {
    setIsShowModalAddNew(true);
  };

  const handleEditUser = (user) => {
    setIsShowModalEditUser(true);
    setDataEditUser(user);
  };

  const handleDeleteUser = (user) => {
    setIsShowModalDeleteUser(true);
    setDataDeleteUser(user);
  };

  const handleSortHeader = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);

    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
    setListUsers(cloneListUsers);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setKeyword(term);
  };

  const debounceValue = useDebounce(keyword, 500);

  useEffect(() => {
    if (debounceValue) {
      let cloneListUsers = _.cloneDeep(listUsers);
      cloneListUsers = _.filter(cloneListUsers, (item) =>
        item.email.includes(debounceValue)
      );
      setListUsers(cloneListUsers);
    } else {
      getUsers(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);

  const headers = [
    { label: "ID", key: "id" },
    { label: "First name", key: "first_name" },
    { label: "Last name", key: "last_name" },
    { label: "Email", key: "email" },
    { label: "Avatar", key: "avatar" },
  ];

  const handleImportCSVFile = (e) => {
    const file = e.target.files[0];

    if (file.type === "text/csv") {
      Papa.parse(file, {
        header: false,
        complete: function (responses) {
          if (responses && responses.data && responses.data.length > 0) {
            const data = responses.data;
            if (data[0].length > 0) {
              if (
                data[0][0] === "first_name" &&
                data[0][1] === "last_name" &&
                data[0][2] === "email"
              ) {
                let result = [];
                data.map((item, index) => {
                  let obj = {};
                  if (index > 0 && item.length === 3) {
                    obj.first_name = item[0];
                    obj.last_name = item[1];
                    obj.email = item[2];
                    result.push(obj);
                  }
                });
                setListUsers(result);
              } else {
                toast.error("Wrong format header for CSV file");
              }
            } else {
              toast.error("Wrong format for CSV file");
            }
          }
        },
      });
    } else {
      toast.error("Only CSV files are supported");
    }
  };

  return (
    <div>
      <div className="my-3 add-new d-sm-flex">
        <span className="heading">List Users:</span>
        <div className="mt-sm-0 mt-3">
          <label htmlFor="import">
            <span className="btn btn-primary">
              <i className="fa-solid fa-file-import"></i> Import
            </span>
          </label>
          <input
            type="file"
            id="import"
            hidden
            onChange={handleImportCSVFile}
          />

          <CSVLink
            data={listUsers}
            headers={headers}
            className="btn btn-warning"
            filename="users.csv"
          >
            <i className="fa-solid fa-file-arrow-down"></i> Export
          </CSVLink>
          <Button variant="success" onClick={handleAddNewUser}>
            Add new user
          </Button>
        </div>
      </div>
      <div className="my-3 col-sm-5 col-12">
        <input
          value={keyword}
          className="form-control"
          placeholder="Search user by email..."
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <div className="customize-table">
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
                        className="mt-md-0 mt-sm-2 mt-2"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>

      <ModalAddNew
        show={isShowModalAddNew}
        handleUpdateTable={handleUpdateTable}
        handleClose={() => setIsShowModalAddNew(false)}
      />

      <ModalEditUser
        show={isShowModalEditUser}
        dataEditUser={dataEditUser}
        handleUpdateTable={handleUpdateTable}
        handleClose={() => setIsShowModalEditUser(false)}
      />

      <ModalConfirm
        show={isShowModalDeleteUser}
        dataEditUser={dataDeleteUser}
        handleUpdateTable={handleUpdateTable}
        handleClose={() => setIsShowModalDeleteUser(false)}
      />

      <ReactPaginate
        nextLabel="next >"
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
        onPageChange={handlePageClick}
      />
    </div>
  );
}

export default TableUsers;
