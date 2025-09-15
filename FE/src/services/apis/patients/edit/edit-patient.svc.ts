import { ApolloClient } from "@apollo/client";

import type { IPatient } from "../type-common";
import { GraphqlMutationCaller } from "../../api-base-mutation.svc";
import type { IEditPatientInput, IEditPatientResponse } from "./edit-patient.type";
import { EDIT_PATIENT_MUTATION } from "./edit-patient.query";

export class EditPatientApi extends GraphqlMutationCaller<
  IPatient,
  IEditPatientInput,
  IEditPatientResponse
> {
  constructor(client: ApolloClient) {
    super(
      client,
      EDIT_PATIENT_MUTATION,
      (raw) => raw.editPatient
    );
  }
}
