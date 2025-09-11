import type { GENDER } from "../../../app/common-type";

export interface IPatient {
  email: string;
  phone: string;
  gender: GENDER;
  dob: string;
  physician: string;
  addressInfo: {
    address: string;
    city: string;
    state: string;
    country: string;
  }
}

export interface IListPatientsResponse {
  data: {
    patients_list: {
      patients: IPatient[];
    }
  }
}
