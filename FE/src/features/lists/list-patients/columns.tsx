import type { ColumnsType } from "antd/es/table";
import type { IPatient } from "../../../services/apis/patients/type-common";
import { Button } from "antd";
import "./style.scss"
import ModalDeletePatient from "../../modals/modal-delete-patient";

// eslint-disable-next-line react-refresh/only-export-components
const CellAction = ({ id }: { id: string }) => {
  return (
    <div className="cell-action">
      <Button variant='solid'>Edit</Button>

      <ModalDeletePatient id={id}/>
    </div>
  )
}

export const columns : ColumnsType<IPatient> = [
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
    render: (record) => {
      console.log("Record in Action column:", record);
      return <CellAction id={record.id} />
    },
  }
];
