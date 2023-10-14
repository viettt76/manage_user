import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { postCreateUser } from "../services/UserService";

function ModalAddNew(props) {
  const { show, handleClose, handleUpdateTable } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleCreateUser = async () => {
    const res = await postCreateUser(name, job);
    if (res && res.id) {
      const newUser = {
        first_name: res.name,
        id: res.id,
      };
      handleUpdateTable(newUser, "add");
      setName("");
      setJob("");
      toast.success("User is created successfully");
      // success
    } else {
      toast.error("Create user failed");
      // error
    }
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add new user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              autoFocus
              value={name}
              type="text"
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicJob">
            <Form.Label>Job</Form.Label>
            <Form.Control
              value={job}
              type="text"
              placeholder="Enter job"
              onChange={(e) => setJob(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreateUser}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAddNew;
