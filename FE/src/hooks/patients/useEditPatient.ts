import { useApolloClient } from "@apollo/client/react";
import { useCallback, useRef } from "react";
import type { TApiResult } from "../../services/types";
import type { IPatient } from "../../services/apis/patients/type-common";
import { EditPatientApi } from "../../services/apis/patients/edit/edit-patient.svc";
import type { IEditPatientInput } from "../../services/apis/patients/edit/edit-patient.type";
import { toast } from "react-toastify";

export function useEditPatient() {
  const client = useApolloClient();
  const apiRef = useRef<EditPatientApi>(null);

  if (!apiRef.current) {
    apiRef.current = new EditPatientApi(client);
  }
  const api = apiRef.current;

  const execute = useCallback(
    (input: IEditPatientInput, onResult: (result: TApiResult<IPatient>) => void) => {
      try {
        api.execute(input).then((edited) => {
          toast.success("Edit patient successfully");
          onResult({ status: "success", data: edited });
        });
      } catch (err) {
        onResult({ status: "error", message: 'Edit failed' });
        toast.error("Edit patient failed !");
        throw err;
      }
    },
    [api]
  );

  return { editPatient: execute };
}
