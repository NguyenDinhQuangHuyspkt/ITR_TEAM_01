import type { ColumnsType } from "antd/es/table";
import type { IPatient } from "../../../services/apis/patients/type-common";
import "./style.scss"
import ModalDeletePatient from "../../modals/modal-delete-patient";
import ModalPatientDetail from "../../modals/modal-patient-detail";
import ModalEditPatient from "../../modals/modal-edit-patient";
import { formatDate } from "../../../utils/format-date.utils";

// eslint-disable-next-line react-refresh/only-export-components
const CellAction = ({ patient, onCallback }: { patient: IPatient , onCallback?: ()=> void}) => {
  return (
    <div className="cell-action">
      <ModalEditPatient patient ={patient} onCallback = {onCallback}/>

      <ModalDeletePatient id={patient.id} onCallback={onCallback}/>

      <ModalPatientDetail patientId={patient.id}/>
    </div>
  )
}

export const renderColumns = (onCallback?: () => void) : ColumnsType<IPatient | undefined> => {
  return [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },  
    {
      title:'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dob',
      key: 'dob',
      render: (dob) => dob ? formatDate(dob) : ''
    },
    {
      title: 'Physician',
      dataIndex: 'physician',
      key: 'physician',
      render: (physician) => physician?.id
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: IPatient) => {
        return <CellAction patient={record} onCallback={onCallback}/>
      },
    }
  ];
}
