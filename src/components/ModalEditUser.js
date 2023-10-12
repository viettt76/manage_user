import {
  useState,
  useRef,
  useEffect,
} from "react";
import { putUpdateUser } from "../services/UserService";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

const ModalEditUser = (props) => {
  const modalAddNewRef = useRef();

  const { show, handleClose, dataEditUser, handleUpdateTable } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleEditUser = async () => {
    let res = await putUpdateUser (name, job, dataEditUser.id)
    if(res && res.updatedAt) {
      handleUpdateTable({
        first_name: name,
        id: dataEditUser.id,
      }, 'edit')
      toast.success('Updated successfully')
    } else {
      toast.error('Couldn\'t update')
    }
    handleClose()
  };

  useEffect(() => {
    if (show) {
      setName(dataEditUser.first_name);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataEditUser]);

  return (
    <div ref={modalAddNewRef}>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicJob">
              <Form.Label>Job</Form.Label>
              <Form.Control
                value={job}
                type="text"
                onChange={(e) => setJob(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditUser}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalEditUser;
