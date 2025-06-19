import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosResponseHeaders,
} from "axios";
import Server from "../config/constants/server";
// import { getStorageData } from "../utils";
// import { TOKEN_STORAGE_KEY } from "../config/constants";
import { ResponseData, ResponseError } from "../types";
import { getStorageData } from "../helper";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  withAuth?: boolean;
  isFormData?: boolean;
}

export class RequestSingleton<T = unknown> {
  private static instance = axios.create({
    baseURL: Server.baseUrl, // Replace with your API base URL
    timeout: 10000,
  });

  public config: CustomAxiosRequestConfig = {
    headers: {},
  };

  private cbSuccess?: (
    data: ResponseData<T>,
    headers: AxiosResponseHeaders
  ) => void;
  private cbFailure?: (error: ResponseError) => void;

  constructor(
    endpoint: string,
    method: string,
    defaults?: Partial<CustomAxiosRequestConfig>
  ) {
    this.config = {
      url: "api" + endpoint,
      method,
      withAuth: true,
      ...defaults,
    };
    this.addAuthHeader();
  }

  // === SETTERS ===

  public setAuth(auth: boolean): this {
    this.config.withAuth = auth;
    return this;
  }

  public setRouteParams(params: string): this {
    this.config.url = `${this.config.url?.replace(/\/+$/, "")}/${params.replace(
      /^\/+/,
      ""
    )}`;
    return this;
  }

  public setParams(
    params: Record<string, string | number | undefined | null | boolean> = {}
  ): this {
    this.config.params = { ...this.config.params, ...params };
    return this;
  }

  public setHeaders(
    headers: Record<string, string | number | undefined | null>
  ): this {
    this.config.headers = { ...this.config.headers, ...headers };
    return this;
  }

  public setBody(
    body: Record<string, string | number | undefined | null | object | boolean>,
    type: "json" | "formData" = "json",
    removeKeys: string[] = []
  ): this {
    this.config.data =
      type === "json"
        ? body
        : RequestSingleton.jsonToFormData(
            body as Record<string, string | Blob>,
            removeKeys
          );
    this.config.isFormData = type === "formData";
    return this;
  }

  public onSuccess(
    cb: (data: ResponseData<T>, headers: AxiosResponseHeaders) => void
  ): this {
    this.cbSuccess = cb;
    return this;
  }

  public onFailure(cb: (error: ResponseError) => void): this {
    this.cbFailure = cb;
    return this;
  }

  // === CORE METHOD ===

  public async call(): Promise<void> {
    try {
      // console.group("========= API Call Begins =========");
      // console.log("Request Config: ", this.config);

      const response: AxiosResponse<ResponseData<T>> =
        await RequestSingleton.instance.request(this.config);

      // console.log("Response: ", response);
      this.cbSuccess?.(response.data, response.headers as AxiosResponseHeaders);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response)
          this.cbFailure?.(error.response.data as ResponseError);
      }
    } finally {
      console.groupEnd();
    }
  }

  // === STATIC UTILITIES ===

  private static jsonToFormData(
    jsonObject: Record<string, string | Blob>,
    removeKeys: string[] = []
  ): FormData {
    const formData = new FormData();
    Object.entries(jsonObject).forEach(([key, value]) => {
      if (value !== undefined && !removeKeys.includes(key)) {
        if (Array.isArray(value)) {
          value.forEach((val) => formData.append(`${key}`, val));
        } else {
          formData.append(key, value);
        }
      }
    });
    return formData;
  }

  private addAuthHeader(): void {
    const token = getStorageData("access_token");
    if (token) {
      this.config.headers = {
        ...this.config.headers,
        Authorization: `Bearer ${getStorageData("access_token")}`,
        // reset_password_token: getStorageData("reset_password_token"),
      };
    }
  }

  // === QUICK CALL UTILITY ===

  public static call(
    endpoint: string,
    method: string,
    body?: Record<string, string | number | undefined | null | object>,
    headers?: Record<string, string | number | undefined | null>
  ) {
    return new RequestSingleton(endpoint, method)
      .setBody(body || {})
      .setHeaders(headers || {})
      .call();
  }
}

export const request = <T>(
  endpoint: string,
  method: string
): RequestSingleton<T> => new RequestSingleton<T>(endpoint, method);
export default RequestSingleton;
