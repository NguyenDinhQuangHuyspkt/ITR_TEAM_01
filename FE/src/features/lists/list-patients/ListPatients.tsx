import { Table } from "antd";
import { renderColumns } from "./columns";
import "./style.scss";
import ModalCreatePatient from "../../modals/modal-create-patient";
import SearchDebounce from "../../../components/search-debounce";
import { PAGINATION } from "../../../app/common-type";
import { useMemo, useState } from "react";
import { useListPatients } from "../../../hooks/patients/useAllPatients";

const ListPatients = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(PAGINATION.DEFAULT_PAGE);
  const [pageSize, setPageSize] = useState(PAGINATION.DEFAULT_LIMIT);

  const pagination = useMemo(
    () => ({
      pagination:{
        page: currentPage,
        limit: pageSize,
      },
      filter: searchTerm
        ? {
            email: searchTerm,
          }
        : undefined,
    }),
    [searchTerm, currentPage, pageSize]
  );

  const { data, loading, onFetchListPatients } = useListPatients(pagination);

  const columns = useMemo(() => {
    return renderColumns(onFetchListPatients);
  }, [onFetchListPatients]);

  const onSearch = (values: { search: string }) => {
    setSearchTerm(values.search);
  };

  const handleTableChange = (page: number, nextPageSize?: number) => {
    setCurrentPage(page);
    if (nextPageSize && nextPageSize !== pageSize) {
      setPageSize(nextPageSize);
    }
  };

  const handlePageSizeChange = (_page: number, nextPageSize: number) => {
    setPageSize(nextPageSize);
    setCurrentPage(1);
  };

  return (
    <section className="list-patients">
      <section className="list-patients-header">
        <h2>List of Patients</h2>
        
        <ModalCreatePatient onCallback={onFetchListPatients}/>
      </section>

      <SearchDebounce placeholder="Input email" onSubmit={onSearch} />

      <Table
        className="ant-table-cell"
        dataSource={data?.patients ?? []}
        columns={columns}
        loading={loading}
        rowKey="id"

        pagination={{
          className: 'custom-table-pagination',
          current: currentPage,
          total: data?.pagination?.totalItems,
          pageSize: pageSize,
          onChange: handleTableChange,
          showSizeChanger: true, 
          showTotal: (total, range) => 
            `${range[0]}-${range[1]} of ${total} rows`,
          onShowSizeChange: handlePageSizeChange,
          pageSizeOptions: ['3' ,'10', '20', '50', '100'], 
          }
        }
      />
    </section>
  );
};

export default ListPatients;
