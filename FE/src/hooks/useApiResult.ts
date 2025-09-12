import { useSyncExternalStore } from "react";
import type { GraphqlCaller } from "../services/apis/api-base-query.svc";
import type { TApiResult } from "../services/types";
import type { OperationVariables } from "@apollo/client";

/**
 * Hook to read GraphqlCaller result without manually wiring attach/detach
 * Usage: const result = useApiResult(apiInstance)
 */
export function useApiResult<TData, TVariables extends NoInfer<OperationVariables | undefined> | undefined , TRawResponse = unknown>(
  api: GraphqlCaller<TData, TVariables, TRawResponse> | null | undefined
): TApiResult<TData> {
  const subscribe = (onStoreChange: () => void) =>
    api ? api.subscribe(onStoreChange) : () => {};
  const getSnapshot = () =>
    api ? api.getResult() : ({ status: "idle" } as TApiResult<TData>);

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
