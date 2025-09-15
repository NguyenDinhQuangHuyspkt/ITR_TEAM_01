import type { GENDER } from "../../../../app/common-type";
import type { IPatient } from "../type-common";

export interface IPatientDetailInput {
  patientId: string | number;
}

export interface IPatientDetailResponse {
  patient: IPatient & {
    createdAt?: string;
    updatedAt?: string;
    physician: IPatient["physician"] & {
      email?: string;
      title?: string;
      phone?: string;
      gender?: GENDER;
      dob?: string;
    };
  } | null;
}


