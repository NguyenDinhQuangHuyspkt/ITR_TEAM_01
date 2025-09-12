import { Button, Modal } from "antd";
import { useState } from "react";
import FormCreatePatient from "../../form/form-create-patient";

interface IModalCreatePatientProps {
  onCallback?: () => void;
}

const ModalCreatePatient : React.FC<IModalCreatePatientProps> = ({
  onCallback
}) => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create Patient
      </Button>

      <Modal
        open={open}
        title="Create a new patient"
        onCancel={handleCancel}
        footer={null}
      >
        <FormCreatePatient 
          onSuccess={()=>{
            setOpen(false);
            if(onCallback) {
              onCallback();
            }
          }}
        />
      </Modal>
    </>
  );
}

export default ModalCreatePatient
