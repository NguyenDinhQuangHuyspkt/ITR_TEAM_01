import type { GENDER } from "../../../app/common-type"

export type TColumnsListPatients = {
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
