import { useEffect, useRef } from "react";
import { useApolloClient } from "@apollo/client/react";
import { useApiResult } from "../useApiResult";
import { ListPhysiciansApi } from "../../services/apis/physician/list/list-physician.svc";
import type { IPhysician } from "../../services/apis/physician/type-common";
import type { IListPhysiciansResponse } from "../../services/apis/physician/list/list-physician.type";

export function useListPhysicians(pagination: { page: number; limit: number }) {
  const client = useApolloClient();

  const apiRef = useRef<ListPhysiciansApi>(null);
  if (!apiRef.current) {
    apiRef.current = new ListPhysiciansApi(client);
  }
  const api = apiRef.current;

  const result = useApiResult<
    IPhysician[],
    { pagination: { page: number; limit: number } },
    IListPhysiciansResponse
  >(api);

  useEffect(() => {
    api.execute({ pagination }).catch((error) => {
      console.error("Fetch list patients error:", error);
    });
  }, [api, pagination]);

  const loading = result.status === "loading";
  const data = result.status === "success" ? result.data : [];
  const error = result.status === "error" ? result.message : null;

  return { data, loading, error };
}
