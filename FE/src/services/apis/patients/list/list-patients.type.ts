import type { IPatient } from "../type-common"

export interface IListPatientsVariables {
  pagination?: {
    page: number;
    limit: number;
  };
  filter?: {
    email: string;
  }
}
export interface IListPatientsResponse {
  patients_list: {
    patients: IPatient[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    }
  }
}
