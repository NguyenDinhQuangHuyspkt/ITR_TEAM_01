import { useEffect, useState } from "react";
import { Table } from "antd";
import { columns } from "./columns";
import "./style.scss";
import type { TApiResult } from "../../../services/types";
import { ListPatientsApi } from "../../../services/apis/patients/list-patients.svc";
import type { IPatient } from "../../../services/apis/patients/type";
import { useApolloClient } from "@apollo/client/react";

const ListPatients = () => {
  const client = useApolloClient();
  const [data, setData] = useState<IPatient[]>([]);
  const [loading, setLoading] = useState(false);


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
    ClsListPatients.execute(undefined).catch(() => {});

    // Cleanup
    return () => {
      ClsListPatients.detach(observer);
    };
  }, [client]);

  return (
    <section className="list-patients">
      <h2 className="">List of Patients</h2>

      <Table
        className="ant-table-cell"
        dataSource={data}
        columns={columns}
        loading={loading}
        rowKey="id"
      />
    </section>
  );
};

export default ListPatients;