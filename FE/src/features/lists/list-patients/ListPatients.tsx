import { useEffect, useState } from "react";
import { Table } from "antd";
import { columns } from "./columns";
import "./style.scss";
import type { TApiResult } from "../../../services/types";
import { ListPatientsApi } from "../../../services/apis/patients/list/list-patients.svc";
import type { IPatient } from "../../../services/apis/patients/type-common";
import { useApolloClient } from "@apollo/client/react";
import ModalCreatePatient from "../../modals/modal-create-patient";
import ModalPatientDetail from "../../modals/modal-patient-detail";
import SearchDebounce from "../../../components/search-debounce";
import { PAGINATION } from "../../../app/common-type";

const ListPatients = () => {
  const client = useApolloClient();
  const [data, setData] = useState<IPatient[]>([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const onSearch = (values: { search: string }) => {
    setSearchTerm(values.search);
  }

  useEffect(() => {
    const ClsListPatients = new ListPatientsApi(client);

    const observer = {
      update: (result: TApiResult<IPatient[]>) => {
        setLoading(result.status === "loading");
        if (result.status === "success" && result.data) {
          setData((result?.data || []).filter((item): item is IPatient => item !== undefined));
        }
      },
    };

    ClsListPatients.attach(observer);
    ClsListPatients.execute({ pagination: { page: PAGINATION.DEFAULT_PAGE, limit: PAGINATION.DEFAULT_LIMIT }, filter: { email: searchTerm } }).catch(() => {});

    return () => {
      ClsListPatients.detach(observer);
    };
  }, [client,searchTerm]);

  return (
    <section className="list-patients">
      <section className="list-patients-header">

        <h2>List of Patients</h2>
            
        <ModalCreatePatient />

      </section>

      <SearchDebounce placeholder="Input email" onSubmit={onSearch}/>

      <Table
        className="ant-table-cell"
        dataSource={data ? data : []}
        columns={columns}
        loading={loading}
        rowKey="id"

        onRow={(record) => ({
          onClick: () => {
            setSelectedId(record.id);
            setOpenDetail(true);
          },
        })}
      />
      <ModalPatientDetail
        open={openDetail}
        patientId={selectedId}
        onClose={() => setOpenDetail(false)}
      />
    </section>
  );
};

export default ListPatients;
