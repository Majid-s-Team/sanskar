import { TablePaginationConfig } from "antd";
import { AxiosRequestHeaders } from "axios";
import { Dispatch, ReactNode, SetStateAction } from "react";

export type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiRoute = {
  url: string;
  method: RequestMethod;
  auth: boolean;
};

export type UseRequestOptions<T> = {
  endpoint?: string;
  type?: "mount" | "unmount" | "delay";
  body?: Record<string, string | number | object | null | undefined | boolean>;
  params?: Record<string, string | number | null | undefined | boolean>;
  headers?: Record<string, string | number | null | undefined>;
  auth?: boolean;
  routeParams?: string;
  body_type?: "formData" | "json";
  cbSuccess?: (data: ResponseData<T>, headers: AxiosRequestHeaders) => void;
  cbFailure?: (error: ResponseError) => void;
  pagination?: boolean;
};

export type UseRequestReturn<T> = {
  data: T | null;
  loading: boolean;
  error: { message: string; status?: number } | null;
  execute: (requestOptions?: Partial<UseRequestOptions<T>>) => Promise<void>;
  setData: Dispatch<SetStateAction<T>>;
  pagination: TablePaginationConfig | null;
  onPaginationChange: (e: TablePaginationConfig) => void;
};

export type ResponseError = {
  code: string;
  statusCode: number;
  error: ReactNode;
  data: ResponseErrorData;
  message: string[];
  status: number;
};

export type ResponseErrorData = {
  message: string[];
  error: string;
  statusCode: number;
};

export type ResponseData<T> = {
  url(url: any): unknown;
  data: T;
  message: string;
  statusCode: number;
  pagination?: {
    count: number;
    currentPage: number;
    pageCount: number;
    perPage: number;
  };
};
