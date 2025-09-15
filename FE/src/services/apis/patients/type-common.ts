import type { GENDER } from "../../../app/common-type";
import type { IPhysician } from "../physician/type-common";


export interface IPatient {
  id: string;
  email: string;
  phone: string;
  gender: GENDER;
  dob: string;
  physician: IPhysician
  addressInfo: {
    address: string;
    city: string;
    state: string;
    country: string;
  }
}
