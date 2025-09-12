import { useEffect, useRef } from "react";
import { useApolloClient } from "@apollo/client/react";
import { ListPatientsApi, type IPatientsListParsedData } from "../../services/apis/patients/list/list-patients.svc";
import { useApiResult } from "../useApiResult";
// import type { IPatient } from "../../services/apis/patients/type-common";
import type { IListPatientsResponse } from "../../services/apis/patients/list/list-patients.type";

export function useListPatients(pagination: { page: number; limit: number }) {
  const client = useApolloClient();

  const apiRef = useRef<ListPatientsApi>(null);
  if (!apiRef.current) {
    apiRef.current = new ListPatientsApi(client);
  }
  const api = apiRef.current;

  const result = useApiResult<
    IPatientsListParsedData,
    { pagination: { page: number; limit: number } },
    IListPatientsResponse
  >(api);

  useEffect(() => {
    api.execute({ pagination }).catch(() => {});
  }, [api, pagination]);

  const loading = result.status === "loading";
  const data = result.status === "success" ? result.data : null;
  const error = result.status === "error" ? result.message : null;

  return { data, loading, error };
}
