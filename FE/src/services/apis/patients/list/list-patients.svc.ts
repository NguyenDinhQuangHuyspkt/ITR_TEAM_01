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

export class ListPatientsApi extends GraphqlCaller<
  IPatient[], // Parsed data type
  IListPatientsVariables, // Input variables type
  IListPatientsResponse // Raw response type 
> {
  constructor(client: ApolloClient) {
    super(
      client,
      LIST_PATIENTS_QUERY,
      (raw) => raw.patients_list.patients
    );
  }
}
