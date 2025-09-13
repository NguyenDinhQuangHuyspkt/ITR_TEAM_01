import { useCallback, useRef } from "react";
import { useApolloClient } from "@apollo/client/react";
import { CreatePatientApi } from "../../services/apis/patients/create/create-patient.svc";
import type { ICreatePatientInput } from "../../services/apis/patients/create/create-patient.type";
import type { IPatient } from "../../services/apis/patients/type-common";
import type { TApiResult } from "../../services/types";
import { toast } from "react-toastify";

export function useCreatePatient() {
  const client = useApolloClient();
  const apiRef = useRef<CreatePatientApi | null>(null);

  const createPatient = useCallback(
    async (
      input: ICreatePatientInput,
      onResult?: (result: TApiResult<IPatient>) => void
    ) => {
      if (!apiRef.current) {
        apiRef.current = new CreatePatientApi(client);
      }
      const api = apiRef.current;

      const observer = {
        update(result: TApiResult<IPatient>) {
          onResult?.(result);
        },
      };

      api.attach(observer);
      try {
        const res = await api.execute({ input });
        toast.success("Create patient successfully");
        return res;
      } catch (err) {
        onResult?.({ status: "error", message: (err as Error).message });

        if ((err as Error).message.includes('duplicate')) {
          toast.error(`Email Patient has existed !`)
        } else {
          toast.error(`Create patient failed !`);
        }
        throw err;
      } finally {
        api.detach(observer);
      }
    },
    [client]
  );

  return { createPatient };
}
