
import { ApolloClient } from "@apollo/client";
import { GraphqlCaller } from "../../api-base.svc";

import { LIST_PHYSICIAN_QUERY, type IListPatientsVariables } from "./list-physician.query";
import type { IListPhysiciansResponse } from "./list-physician.type";
import type { IPhysician } from "../type-common";

export class ListPhysiciansApi extends GraphqlCaller<
  IPhysician[], // Parsed data type
  IListPatientsVariables, // Input variables type
  IListPhysiciansResponse // Raw response type
> {
  constructor(client: ApolloClient) {
    super(
      client,
      LIST_PHYSICIAN_QUERY,
      (raw) => raw.physicians
    );
  }
}
