import { Button, Modal } from "antd";
import { useState, type ComponentProps } from "react";
import FormCreatePatient from "../../form/form-create-patient";
import "./style.scss";

interface IModalCreatePatientProps extends ComponentProps<typeof Modal> {
  onCallback?: () => void;
}

const ModalCreatePatient : React.FC<IModalCreatePatientProps> = ({
  onCallback,
  ...props
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
        centered
        className="custom-create-patient-modal"
        {...props}
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
