import type { IPatient } from "../type-common";

export interface IPatientDetailResponse {
  patient: IPatient & {
    createdAt?: string;
    updatedAt?: string;
    physician: IPatient["physician"] & {
      email?: string;
      title?: string;
      phone?: string;
      gender?: any;
      dob?: string;
    };
  } | null;
}


