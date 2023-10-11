import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import Button from "react-bootstrap/Button";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import ModalAddNew from "./components/ModalAddNew";
import "./App.scss";


function App() {
  const modalAddNewRef = useRef()

  console.log(modalAddNewRef.current);

  const [newUser, setNewUser] = useState({})

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

  useEffect(() => {
    setNewUser(modalAddNewRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalAddNewRef.current])

  return (
    <div className="App">
      <Header />
      <Container>
        <div className="my-3 add-new">
          <span className="heading">List Users:</span>
          <Button variant="success" onClick={() => setIsShowModalAddNew(true)}>
            Add new user
          </Button>
        </div>
        <TableUsers newUser={newUser} />
      </Container>

      <ModalAddNew
        ref={modalAddNewRef}
        show={isShowModalAddNew}
        handleClose={() => setIsShowModalAddNew(false)}
      />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
