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

  const execute = useCallback(
    (input: IEditPatientInput, onResult: (result: TApiResult<IPatient>) => void) => {
      const observer = {
        update: (result: TApiResult<IPatient>) => {
          onResult(result);
        },
      };

      apiRef.current!.attach(observer);
      apiRef.current!.execute(input)
        .then(() => toast.success("Patient updated successfully"))
        .catch((error) => {
          onResult({ status: "error", message: error.message });
          
          if (error.message.includes('duplicate')) {
            toast.error(`Email Patient has existed !`)
          } else {
            toast.error(`Update patient failed !`);
          }
        })
        .finally(() => {
          apiRef.current!.detach(observer);
        });
    },
    []
  );

  return { editPatient: execute };
}
