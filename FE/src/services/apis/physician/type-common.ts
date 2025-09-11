import type { GENDER } from "../../../app/common-type";

export interface IPhysician {
  id: string
  title: string
  email: string;
  phone: string;
  gender: GENDER;
  dob: string;
}
