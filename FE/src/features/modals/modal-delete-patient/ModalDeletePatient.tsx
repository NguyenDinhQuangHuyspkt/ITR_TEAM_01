import { Button, Modal } from "antd";
import { useState } from "react";
import { useDeletePatient } from "../../../hooks/patients/useDeletePatient";

interface IModalDeletePatientProps {
  id: string;
}

const ModalDeletePatient : React.FC<IModalDeletePatientProps>= ({id}) => {
  const [open, setOpen] = useState(false);

  const {deletePatient} = useDeletePatient();

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onConfirmDelete = () => {
    console.log("Deleting patient with id:", id);
    deletePatient({ deletePatientId: id }, (result) => {
      if (result.status === "success") {
        console.log("Patient deleted successfully");
      } else if (result.status === "error") {
        console.error("Error deleting patient:", result.message);
      }
    });
    setOpen(false);
  }

  return (
    <>
      <Button danger onClick={showModal} variant='outlined'>
        Delete
      </Button>

      <Modal
        open={open}
        title="Delete Patient"
        onCancel={handleCancel}
        footer={null}
      >
        <h3 style={{ textAlign: "center" , color: "red", textTransform: "uppercase"}}>
          Are you sure to delete this patient?
        </h3>

        <section style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
          <Button style={{ width: "100%" }} onClick={handleCancel}>
            Cancel
          </Button>

          <Button danger style={{ width: "100%" }} onClick={onConfirmDelete}>
            Confirm Delete
          </Button>
        </section>
      </Modal>
    </>
  );
}

export default ModalDeletePatient
