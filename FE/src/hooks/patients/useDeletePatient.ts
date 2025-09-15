import { useApolloClient } from "@apollo/client/react";
import { useCallback, useRef } from "react";
import type { TApiResult } from "../../services/types";
import type { IPatient } from "../../services/apis/patients/type-common";
import { DeletePatientApi } from "../../services/apis/patients/delete/delete-patient.svc";
import type { IDeletePatientInput, IDeletePatientResponse } from "../../services/apis/patients/delete/delete-patient.type";
import { toast } from "react-toastify";
import { useApiResult } from "../useApiResult";

export function useDeletePatient() {
  const client = useApolloClient();
  const apiRef = useRef<DeletePatientApi>(null);

  if (!apiRef.current) {
    apiRef.current = new DeletePatientApi(client);
  }
  const api = apiRef.current;

  const result = useApiResult<
    IPatient,
    IDeletePatientInput,
    IDeletePatientResponse
  >(api);

  const execute = useCallback(
    (input: IDeletePatientInput, onResult: (result: TApiResult<IPatient>) => void) => {
      try {
        api.execute(input).then((deleted) => {
          toast.success("Delete patient successfully");
          onResult({ status: "success", data: deleted });
        });
      } catch (err) {
        onResult({ status: "error", message: 'Delete failed' });
        toast.error("Delete patient failed !");
        throw err;
      }
    },
    [api]
  );

  return { deletePatient: execute, result};
}
