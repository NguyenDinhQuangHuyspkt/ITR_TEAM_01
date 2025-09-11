import { ApolloClient } from "@apollo/client";

import type { IPatient } from "../type-common";
import { GraphqlMutationCaller } from "../../api-base-mutation.svc";
import { DELETE_PATIENT_MUTATION } from "./delete-patient.query";
import type { IDeletePatientInput, IDeletePatientResponse } from "./delete-patient.type";

export class DeletePatientApi extends GraphqlMutationCaller<
  IPatient,
  IDeletePatientInput,
  IDeletePatientResponse
> {
  constructor(client: ApolloClient) {
    super(
      client,
      DELETE_PATIENT_MUTATION,
      (raw) => raw.deletePatient
    );
  }
}
