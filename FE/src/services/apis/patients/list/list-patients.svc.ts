import { ApolloClient } from "@apollo/client";
import { GraphqlCaller } from "../../api-base-query.svc";
import { LIST_PATIENTS_QUERY } from "./list-patients.query";
import type { IPatient } from "../type-common";
import type { IListPatientsResponse } from "./list-patients.type";

interface IListPatientsVariables {
  pagination?: {
    page: number;
    limit: number;
  };
  filter?: {
    email: string;
  }
}

export interface IPatientsListParsedData {
  patients: IPatient[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }
}

export class ListPatientsApi extends GraphqlCaller<
  IPatientsListParsedData, // Parsed data type
  IListPatientsVariables, // Input variables type
  IListPatientsResponse // Raw response type 
> {
  constructor(client: ApolloClient) {
    super(
      client,
      LIST_PATIENTS_QUERY,
      (raw) => raw.patients_list
    );
  }
}
