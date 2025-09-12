import type { IPatient } from "../type-common"

export interface IEditPatientInput 
{
  input: Omit<IPatient, 'physician' | 'id'> & {
    physicianId: string
  },
  updatePatientId: string
}

export interface IEditPatientResponse {
  editPatient: IPatient
}
