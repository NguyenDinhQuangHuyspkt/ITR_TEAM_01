import type { IPatient } from "../type-common";

export interface ICreatePatientInput {
  email: string,
  phone: string,
  gender: string,
  physicianId: string,
  dob: string,
  addressInfo:{
    address: string,
    city: string,
    state: string,
    country: string,
  }
}
export interface ICreatePatientResponse {
  createPatient: IPatient
}
