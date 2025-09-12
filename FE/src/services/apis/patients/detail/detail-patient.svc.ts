import { ApolloClient } from "@apollo/client";
import { GraphqlCaller } from "../../api-base-query.svc";
import { PATIENT_DETAIL_QUERY } from "./detail-patient.query";
import type { IPatientDetailInput, IPatientDetailResponse } from "./detail-patient.type";

export class DetailPatientApi extends GraphqlCaller<
  IPatientDetailResponse["patient"],
  IPatientDetailInput,
  IPatientDetailResponse
> {
  constructor(client: ApolloClient) {
    super(
      client,
      PATIENT_DETAIL_QUERY,
      (raw) => raw.patient
    );
  }
}


