import { Button, Modal } from "antd";
import { useState } from "react";
import FormEditPatient from "../../form/form-edit-patient";
import type { IPatient } from "../../../services/apis/patients/type-common";

interface IModalEditPatientProps {
  patient: IPatient;
  onCallback?: () => void;
}

const ModalEditPatient : React.FC<IModalEditPatientProps>= ({patient , onCallback }) => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>
        Edit 
      </Button>

      <Modal
        open={open}
        title="Edit patient"
        onCancel={handleCancel}
        footer={null}
      >
        <FormEditPatient 
          patient ={patient} 
          onSuccess = {
            ()=>{
              setOpen(false);
              if(onCallback) {
                onCallback();
              }
            }
        }/>
      </Modal>
    </>
  );
}

export default ModalEditPatient
