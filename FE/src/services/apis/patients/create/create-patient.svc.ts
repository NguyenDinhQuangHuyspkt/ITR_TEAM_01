import { ApolloClient } from "@apollo/client";

import { CREATE_PATIENT_MUTATION } from "./create-patient.query";
import type { IPatient } from "../type-common";
import type { ICreatePatientInput, ICreatePatientResponse } from "./create-patient.type";
import { GraphqlMutationCaller } from "../../api-base-mutation.svc";

export class CreatePatientApi extends GraphqlMutationCaller<
  IPatient,
  { input: ICreatePatientInput },
  ICreatePatientResponse
> {
  constructor(client: ApolloClient) {
    super(
      client,
      CREATE_PATIENT_MUTATION,
      (raw) => raw.createPatient
    );
  }
}
