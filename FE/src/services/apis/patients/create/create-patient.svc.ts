import { ApolloClient } from "@apollo/client";
import { GraphqlCaller } from "../../api-base.svc";

import { CREATE_PATIENT_MUTATION } from "./create-patient.query";
import type { IPatient } from "../type-common";
import type { ICreatePatientResponse } from "./create-patient.type";

export class CreatePatientApi extends GraphqlCaller<
  IPatient, // Parsed data type
  undefined, // Input variables type
  ICreatePatientResponse // Raw response type
> {
  constructor(client: ApolloClient) {
    super(
      client,
      CREATE_PATIENT_MUTATION,
      (raw) => raw.createPatient
    );
  }
}
