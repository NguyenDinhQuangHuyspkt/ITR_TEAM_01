import type { ApolloClient, DocumentNode } from "@apollo/client";
import type { TApiResult } from "../types";
import type { OperationVariables } from "@apollo/client";

interface IObserver<T> {
  update(state: T): void;
}

interface ISubject<T> {
  attach(observer: IObserver<T>): void;
  detach(observer: IObserver<T>): void;
  notify(): void;
}

export abstract class GraphqlMutationCaller<
  TData,
  TVariables extends NoInfer<OperationVariables> | undefined,
  TRawResponse
> implements ISubject<TApiResult<TData>> {
  protected observers: IObserver<TApiResult<TData>>[] = [];
  protected result: TApiResult<TData> = { status: "idle" };

  constructor(
    protected client: ApolloClient,
    protected mutation: DocumentNode,
    protected dataParser: (raw: TRawResponse) => TData
  ) {}

  attach(observer: IObserver<TApiResult<TData>>): void {
    this.observers.push(observer);
  }

  detach(observer: IObserver<TApiResult<TData>>): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(): void {
    for (const obs of this.observers) {
      obs.update(this.result);
    }
  }

  public async execute(variables: TVariables) {
    this.result = { status: "loading" };
    this.notify();

    try {
      const resp = await this.client.mutate<TRawResponse>({ mutation: this.mutation, variables });

      if (!resp.data) {
        this.result = { status: "error" };
        this.notify();
        throw new Error("No data returned from GraphQL mutation");
      }
      const parsed = this.dataParser(resp.data);

      this.result = { status: "success", data: parsed };
      this.notify();

      return parsed;
    } catch (error) {
      this.result = { status: "error" };
      this.notify();
      throw error;
    }
  }
}
