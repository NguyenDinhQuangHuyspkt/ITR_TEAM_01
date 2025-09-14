// ...existing code...
import { Button, Modal } from "antd";
import { useState } from "react";
import { useDeletePatient } from "../../../hooks/patients/useDeletePatient";
import { DeleteOutlined } from "@ant-design/icons";
import "./style.scss";

interface IModalDeletePatientProps extends React.ComponentProps<typeof Modal> {
  id: string;
  onCallback?: () => void;
}

const ModalDeletePatient : React.FC<IModalDeletePatientProps>= ({id ,onCallback , ...props}) => {
  const [open, setOpen] = useState(false);

  const {deletePatient} = useDeletePatient();

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onConfirmDelete = () => {
    deletePatient({ deletePatientId: id }, (result) => {
      if (result.status === "success") {
        console.log("Patient deleted successfully");
        if(onCallback) {
          onCallback();
        }
      } else if (result.status === "error") {
        console.error("Error deleting patient:", result.message);
      }
    });
    setOpen(false);
  }

  return (
    <>
      <Button danger onClick={showModal} className="delete-trigger">
        <DeleteOutlined />
      </Button>

      <Modal
        open={open}
        title="Delete Patient"
        onCancel={handleCancel}
        footer={null}
        className="modal-delete-patient"
        {...props}
      >
        <h3 className="delete-confirm-title">
          Are you sure to delete this patient?
        </h3>

        <section className="delete-actions">
          <Button onClick={handleCancel}>
            Cancel
          </Button>

          <Button danger onClick={onConfirmDelete}>
            Confirm Delete
          </Button>
        </section>
      </Modal>
    </>
  );
}

export default ModalDeletePatient
