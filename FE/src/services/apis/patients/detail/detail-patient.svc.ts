import { ApolloClient } from "@apollo/client";
import { GraphqlCaller } from "../../api-base.svc";
import { PATIENT_DETAIL_QUERY } from "./detail-patient.query";
// import type { IPatient } from "../type-common";
import type { IPatientDetailResponse } from "./detail-patient.type";

interface IPatientDetailVariables {
  patientId: string | number;
}

export class PatientDetailApi extends GraphqlCaller<
  IPatientDetailResponse["patient"],
  IPatientDetailVariables,
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


