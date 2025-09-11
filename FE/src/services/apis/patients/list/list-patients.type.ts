import type { IPatient } from "../type-common"

export interface IListPatientsResponse {
  patients_list: {
    patients: IPatient[]
  }
}
