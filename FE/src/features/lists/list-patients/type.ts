import type { GENDER } from "../../../app/common-type"

export type TColumnsListPatients = {
  id: number; // thêm để làm phần chi tiết patient
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
