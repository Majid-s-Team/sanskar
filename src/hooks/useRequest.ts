import { useState, useEffect, useCallback } from "react";
import { request } from "../repositories/index";
import {
  GenericType,
  ResponseData,
  ResponseError,
  UseRequestOptions,
  UseRequestReturn,
} from "../types";
import { AxiosResponseHeaders } from "axios";
import { TablePaginationConfig } from "antd";
import { notification } from "antd";

/**
 * Custom React Hook for making HTTP requests using HttpService.
 * @param endpoint - The API endpoint.
 * @param method - HTTP method ('get', 'post', 'put', etc.).
 * @param options - Options for the request (optional).
 * @returns Object containing data, loading, error, and a function to trigger the request manually.
 */
export function useRequest<T>(
  endpoint: string,
  method: string,
  options: UseRequestOptions<T>
): UseRequestReturn<T> {
  const [data, setData] = useState<T>([] as T);
  const [loading, setLoading] = useState<boolean>(false);
  const [service, setService] = useState(request<T>(endpoint, method));
  // const service = useMemo(
  //   () => request<T>(endpoint, method),
  //   [endpoint, method]
  // );
  const [error, setError] = useState<{
    message: string;
    status?: number;
  } | null>(null);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    pageSize: 10,
    current: 1,
  });

  const execute = useCallback(
    async (requestOptions: Partial<UseRequestOptions<T>> = {}) => {
      setLoading(true);
      setError(null);
      const apiOptions = {
        ...options,
        ...requestOptions,
      };
      try {
        const {
          body,
          params,
          headers,
          auth,
          routeParams,
          body_type = "json",
        } = apiOptions;
        if (auth !== undefined) service.setAuth(auth);
        if (params) service.setParams(params);
        if (body) service.setBody(body, body_type);
        if (headers) service.setHeaders(headers);
        if (routeParams) service.setRouteParams(routeParams);
        await service
          .onSuccess(
            (
              response_body: ResponseData<T>,
              response_headers: AxiosResponseHeaders
            ) => {
              if (apiOptions.cbSuccess)
                apiOptions.cbSuccess(response_body, response_headers);
              setData(response_body.data as T);
              // if (response_body.pagination)
              //   setPagination({
              //     total: response_body.pagination.count,
              //     pageSize: response_body.pagination.perPage,
              //     current: response_body.pagination.currentPage,
              //   });

              if (response_body?.pagination) {
                setPagination({
                  total: response_body.pagination.count,
                  pageSize: response_body.pagination.perPage,
                  current: response_body.pagination.currentPage,
                });
              } else {
                setPagination({
                  // @ts-ignore
                  total: response_body?.data?.pagination.count,
                  // @ts-ignore
                  pageSize: response_body?.data?.pagination.perPage,
                  // @ts-ignore
                  current: response_body?.data?.pagination.currentPage,
                });
              }

              // @ts-ignore
              // if (response_body.data?.pagination)
              //   setPagination({
              //     // @ts-ignore
              //     total: response_body?.data?.pagination.count,
              //     // @ts-ignore
              //     pageSize: response_body?.data?.pagination.perPage,
              //     // @ts-ignore
              //     current: response_body?.data?.pagination.currentPage,
              //   });
            }
          )
          .onFailure((err: ResponseError) => {
            console.log(err);
            if (apiOptions.cbFailure) apiOptions.cbFailure(err);
            if (err.statusCode === 401) {
              notification.error({
                message: "Unauthorized",
                description:
                  "You're session has been expired. Please login again to continue.",
              });
              localStorage.clear();
              location.href = "/login";
            }
            if (err.statusCode === 400) {
              err.message.forEach((message: string) => {
                notification.error({
                  message: "Bad Request",
                  description: message,
                });
              });
            }
            if (err.code === "ERR_NETWORK") {
              notification.error({
                message: "Network Error",
                description: "Please check your internet connection.",
              });
            }

            // setError(err);
          })
          .call();
      } catch (err) {
        console.error("Unhandled error:", err);
        setError({ message: "Something went wrong", ...(err as GenericType) });
      } finally {
        setLoading(false);
        setService(request(endpoint, method));
      }
    },
    [endpoint, method, options, pagination, loading]
  );

  // const onPaginationChange = useCallback(
  //   (e: TablePaginationConfig) => {
  //     const params = service.config.params || options.params || {};

  //     console.log("params", params);

  //     const newParams = { ...params, page: e.current, limit: e.pageSize };

  //     console.log("newParams", newParams);

  //     // params.page = e.current;
  //     // params.limit = e.pageSize;
  //     setPagination(e);
  //     execute({ ...options, params: newParams });
  //   },
  //   [pagination, execute]
  // );

  const onPaginationChange = useCallback(
    (e: TablePaginationConfig) => {
      const params = service.config.params || options.params || {};
      params.page = e.current;
      params.limit = e.pageSize;
      setPagination(e);
      execute({ ...options, params });
    },
    [pagination, execute]
  );

  useEffect(() => {
    if (options.type === "mount" && endpoint && method) {
      if (options.pagination) {
        if (!options.params) options.params = {};
        options.params.page = 1;
        options.params.limit = pagination.pageSize;
      }
      execute(options);
    }

    if (options.type === "unmount") {
      return options.type === "unmount"
        ? () => {
            execute();
          }
        : undefined;
    }
  }, []);

  useEffect(() => {
    console.log("loading....", loading);
  }, [loading]);

  return {
    data,
    loading,
    error,
    execute,
    setData,
    pagination,
    onPaginationChange,
  };
}
