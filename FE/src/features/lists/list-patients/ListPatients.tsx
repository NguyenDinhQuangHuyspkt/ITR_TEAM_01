import { Table } from "antd";
import { columns } from "./columns";
import "./style.scss";
import ModalCreatePatient from "../../modals/modal-create-patient";
import SearchDebounce from "../../../components/search-debounce";
import { PAGINATION } from "../../../app/common-type";
import { useMemo, useState } from "react";
import { useListPatients } from "../../../hooks/patients/useAllPatients";

const ListPatients = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const pagination = useMemo(
  () => ({
    page: PAGINATION.DEFAULT_PAGE,
    limit: PAGINATION.DEFAULT_LIMIT,
    ...(searchTerm ? { filter: { email: searchTerm } } : {}),
  }),
  [searchTerm]
);

  const { data, loading } = useListPatients(pagination);

  const onSearch = (values: { search: string }) => {
    setSearchTerm(values.search);
  };

  return (
    <section className="list-patients">
      <section className="list-patients-header">
        <h2>List of Patients</h2>
        
        <ModalCreatePatient />
      </section>

      <SearchDebounce placeholder="Input email" onSubmit={onSearch} />

      <Table
        className="ant-table-cell"
        dataSource={data ?? []}
        columns={columns}
        loading={loading}
        rowKey="id"
      />
    </section>
  );
};

export default ListPatients;
