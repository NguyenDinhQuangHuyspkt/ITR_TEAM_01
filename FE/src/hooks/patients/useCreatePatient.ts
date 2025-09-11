import { useApolloClient } from "@apollo/client/react";
import { useCallback, useRef } from "react";
import { CreatePatientApi } from "../../services/apis/patients/create/create-patient.svc";
import type { TApiResult } from "../../services/types";
import type { IPatient } from "../../services/apis/patients/type-common";
import type { ICreatePatientInput } from "../../services/apis/patients/create/create-patient.type";

export function useCreatePatient() {
  const client = useApolloClient();
  const apiRef = useRef<CreatePatientApi>(null);

  if (!apiRef.current) {
    apiRef.current = new CreatePatientApi(client);
  }

  const execute = useCallback(
    (input: ICreatePatientInput, onResult: (result: TApiResult<IPatient>) => void) => {
      const observer = {
        update: (result: TApiResult<IPatient>) => {
          onResult(result);
        },
      };

      apiRef.current!.attach(observer);
      apiRef.current!.execute({ input })
        .catch((error) => {
          onResult({ status: "error", message: error.message });
        })
        .finally(() => {
          apiRef.current!.detach(observer);
        });
    },
    []
  );

  return { createPatient: execute };
}
