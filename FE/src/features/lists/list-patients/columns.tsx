import type { ColumnsType } from "antd/es/table";
import type { TColumnsListPatients } from "./type";
import { Button } from "antd";
import "./style.scss"

// eslint-disable-next-line react-refresh/only-export-components
const CellAction = () => {
  return (
    <div className="cell-action">
      <Button variant='solid'>Edit</Button>
      <Button danger>Delete</Button>
    </div>
  )
}

export const columns : ColumnsType<TColumnsListPatients> = [
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
    render: (physician) => physician.id
  },
  {
    title: 'Action',
    key: 'action',
    render: CellAction,
  }
];
