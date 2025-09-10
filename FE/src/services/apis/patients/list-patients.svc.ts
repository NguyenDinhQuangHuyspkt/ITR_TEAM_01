import { ApolloClient } from "@apollo/client";
import { GraphqlCaller } from "../api-base.svc";
import type { IListPatientsResponse, IPatient } from "./type";
import { LIST_PATIENTS_QUERY } from "./query";

interface IListPatientsVariables {
  page?: number;
  limit?: number;
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
      (raw) => raw.data 
    );
  }
}
