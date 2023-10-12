import { useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteUser } from "../services/UserService";

const ModalEditUser = (props) => {
  const modalAddNewRef = useRef();

  const { show, handleClose, dataEditUser, handleUpdateTable } = props;

  const handleConfirm = async () => {
    const res = await deleteUser(dataEditUser.id);
    if (res && +res.statusCode === 204) {
      handleUpdateTable(dataEditUser, "delete");
      toast.success('Delete user successfully')
    } else {
        toast.error('Delete user failed')
    }
    handleClose();
  };

  return (
    <div ref={modalAddNewRef}>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user?
          <br />
          <b>
            name: {dataEditUser.first_name} {dataEditUser.last_name}
          </b>
          <br />
          <b>email: {dataEditUser.email}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalEditUser;
