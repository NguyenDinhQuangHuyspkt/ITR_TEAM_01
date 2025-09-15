import type { ApolloClient, DocumentNode, OperationVariables } from "@apollo/client";
import { GraphqlCaller } from "./api-base-query.svc";

export abstract class GraphqlMutationCaller<
  TData,
  TVariables extends NoInfer<OperationVariables> | undefined,
  TRawResponse
> extends GraphqlCaller<TData, TVariables, TRawResponse> {
  constructor(
    client: ApolloClient,
    mutation: DocumentNode,
    dataParser: (raw: TRawResponse) => TData
  ) {
    super(client, mutation, dataParser);
  }

  public async execute(variables: TVariables) {
    this.setResult({ status: "loading" });

    try {
      const resp = await this.client.mutate<TRawResponse>({
        mutation: this.query, // dùng lại query từ base
        variables,
      });

      if (!resp.data) {
        this.setResult({ status: "error", message: "No data returned from GraphQL mutation" });
        throw new Error("No data returned from GraphQL mutation");
      }

      const parsed = this.dataParser(resp.data);
      this.setResult({ status: "success", data: parsed });

      return parsed;
    } catch (error) {
      this.setResult({ status: "error", message: (error as Error).message });
      throw error;
    }
  }
}
