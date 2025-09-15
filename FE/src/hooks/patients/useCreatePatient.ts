import { useCallback, useRef } from "react";
import { useApolloClient } from "@apollo/client/react";
import { CreatePatientApi } from "../../services/apis/patients/create/create-patient.svc";
import type { ICreatePatientInput, ICreatePatientResponse } from "../../services/apis/patients/create/create-patient.type";
import type { IPatient } from "../../services/apis/patients/type-common";
import type { TApiResult } from "../../services/types";
import { toast } from "react-toastify";
import { useApiResult } from "../useApiResult";

export function useCreatePatient() {
  const client = useApolloClient();
  const apiRef = useRef<CreatePatientApi>(null);

  if (!apiRef.current) {
    apiRef.current = new CreatePatientApi(client);
  }
  const api = apiRef.current;

  const result = useApiResult<
    IPatient, 
    { input: ICreatePatientInput }, 
    ICreatePatientResponse
  >(api);

  const createPatient = useCallback(
    async (
      input: ICreatePatientInput,
      onResult?: (result: TApiResult<IPatient>) => void
    ) => {
      try {
        const parsed = await api.execute({ input });
        toast.success("Create patient successfully");
        onResult?.({ status: "success", data: parsed });
        return parsed;
      } catch (err) {
        onResult?.({ status: "error", message: '' });
        throw err;
      }
    },
    [api]
  );

  return { createPatient, result };
}
