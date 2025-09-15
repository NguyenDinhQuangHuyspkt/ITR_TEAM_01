import { Button, Modal } from "antd";
import { useState } from "react";
import FormEditPatient from "../../form/form-edit-patient";
import type { IPatient } from "../../../services/apis/patients/type-common";
import { EditOutlined } from "@ant-design/icons";
import "./style.scss";

interface IModalEditPatientProps extends React.ComponentProps<typeof Modal> {
  patient: IPatient;
  onCallback?: () => void;
}

const ModalEditPatient : React.FC<IModalEditPatientProps>= ({patient , onCallback, ...props }) => {
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
          <EditOutlined /> 
      </Button>

      <Modal
        open={open}
        title="Edit patient"
        onCancel={handleCancel}
        footer={null}
        centered
        className="custom-edit-patient-modal"
        {...props}
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
