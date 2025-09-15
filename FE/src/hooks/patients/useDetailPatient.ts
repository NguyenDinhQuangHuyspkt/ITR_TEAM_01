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

  const api = apiRef.current;

  useEffect(() => {
    return ()=> apiRef?.current?.detachAll();
  }, []);

  const execute = useCallback(
    (input: IPatientDetailInput, onResult: (result: TApiResult<IPatient>) => void) => {
      try {
        api.execute(input).then((patient) => {
          onResult({ status: "success", data: patient ?? undefined });
        });
      } catch (err) {
        onResult({ status: "error", message: 'Fetch detail patient failed' });
        toast.error("Fetch detail patient failed !");
        throw err;
      }
    },
    [api]
  );
 
   return { detailPatient: execute };
}
