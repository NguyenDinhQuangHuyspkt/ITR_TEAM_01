import type { IPatient } from "../type-common";

export interface IDeletePatientInput {
  deletePatientId: string;
}

export interface IDeletePatientResponse {
  deletePatient: IPatient;
}
