import { useApolloClient } from "@apollo/client/react";
import { useCallback, useRef } from "react";
import type { TApiResult } from "../../services/types";
import type { IPatient } from "../../services/apis/patients/type-common";
import { DeletePatientApi } from "../../services/apis/patients/delete/delete-patient.svc";
import type { IDeletePatientInput } from "../../services/apis/patients/delete/delete-patient.type";
import { toast } from "react-toastify";

export function useDeletePatient() {
  const client = useApolloClient();
  const apiRef = useRef<DeletePatientApi>(null);

  if (!apiRef.current) {
    apiRef.current = new DeletePatientApi(client);
  }

  const execute = useCallback(
    (input: IDeletePatientInput, onResult: (result: TApiResult<IPatient>) => void) => {
      const observer = {
        update: (result: TApiResult<IPatient>) => {
          onResult(result);
        },
      };

      apiRef.current!.attach(observer);
      apiRef.current!.execute(input)
        .then(()=> toast.success("Patient deleted successfully"))
        .catch((error) => {
          onResult({ status: "error", message: error.message });
          toast.error("Delete patient failed");
        })
        .finally(() => {
          apiRef.current!.detach(observer);
        });
    },
    []
  );

  return { deletePatient: execute };
}
