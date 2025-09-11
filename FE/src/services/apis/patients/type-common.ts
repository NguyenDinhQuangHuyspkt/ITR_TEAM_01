import type { GENDER } from "../../../app/common-type";

export interface IPatient {
  email: string;
  phone: string;
  gender: GENDER;
  dob: string;
  physician: {
    id: number
  };
  addressInfo: {
    address: string;
    city: string;
    state: string;
    country: string;
  }
}
