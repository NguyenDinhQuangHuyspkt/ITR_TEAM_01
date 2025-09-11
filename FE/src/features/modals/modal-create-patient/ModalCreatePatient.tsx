import { Button, Modal } from "antd";
import { useState } from "react";
import FormCreatePatient from "../../form/form-create-patient";

const ModalCreatePatient = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  return (
    <section>
      <Button type="primary" onClick={showModal}>
        Create Patient
      </Button>

      <Modal
        open={open}
        title="Create a new patient"
        footer={null}
      >
        <FormCreatePatient/>
      </Modal>
    </section>
  );
}

export default ModalCreatePatient
