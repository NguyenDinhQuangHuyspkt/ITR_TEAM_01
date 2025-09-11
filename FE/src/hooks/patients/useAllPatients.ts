import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client/react";
import type { IPatient } from "../../services/apis/patients/type-common";
import { ListPatientsApi } from "../../services/apis/patients/list/list-patients.svc";
import type { TApiResult } from "../../services/types";

export function useListPatients(pagination: { page: number; limit: number }) {
  const client = useApolloClient();
  const [data, setData] = useState<IPatient[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const api = new ListPatientsApi(client);

    const observer = {
      update: (result: TApiResult<IPatient[]>) => {
        setLoading(result.status === "loading");
        if (result.status === "success" && result.data) {
          setData((result.data || []).filter((item): item is IPatient => item !== undefined));
        }
      },
    };

    api.attach(observer);
    api.execute({ pagination }).catch(() => {});

    return () => {
      api.detach(observer);
    };
  }, [client, pagination.limit, pagination.page, pagination]);

  return { data, loading };
}
