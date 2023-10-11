import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { fetchAllUsers } from "../services/UserService";

function TableUsers({ newUser = {} }) {
  const [listUsers, setListUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1)

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
      setTotalPages(res.total_pages)
    }
  };

  const handlePageClick = (e) => {
    setCurrentPage(e.selected+1)
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
