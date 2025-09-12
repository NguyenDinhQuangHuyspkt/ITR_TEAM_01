import { useApolloClient } from "@apollo/client/react";
import type { IPatient } from "../../services/apis/patients/type-common";
import type { TApiResult } from "../../services/types";
import { DetailPatientApi } from "../../services/apis/patients/detail/detail-patient.svc";
import { useCallback, useEffect, useRef } from "react";
import type { IPatientDetailInput } from "../../services/apis/patients/detail/detail-patient.type";
import { toast } from "react-toastify";

export function useDetailPatient() {
  const client = useApolloClient();
  const apiRef = useRef<DetailPatientApi>(null);
 
  if (!apiRef.current) {
    apiRef.current = new DetailPatientApi(client);
  }

  useEffect(() => {
    return ()=> apiRef?.current?.detachAll();
  }, []);

  const execute = useCallback(
    (input: IPatientDetailInput, onResult: (result: TApiResult<IPatient>) => void) => {
      const observer = {
        update: (result: TApiResult<IPatient>) => {
          onResult(result);
        },
      };

      apiRef.current!.attach(observer);
      apiRef.current!.execute(input)
        .catch((error) => {
          onResult({ status: "error", message: error.message });
          toast.error("Fetch patient detail failed");
        })
        .finally(() => {
          apiRef.current!.detach(observer);
        });
    },
    []
  );
 
   return { detailPatient: execute };
}
