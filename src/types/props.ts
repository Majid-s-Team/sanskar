import { Dispatch, SetStateAction } from "react";
import { RouteTypes } from "./general";
import { ApiRoute } from "./request";

export type TextComponentProps = {
  text: string;
  className?: string;
};

export interface LinkProps {
  path: string;
  title?: string;
  text?: string;
  subHeading: string;
}

export type ButtonComponentProps = {
  text: string;
  onClick?: () => void;
  htmlType?: "submit" | "reset" | "button";
  loading?: boolean;
  disabled?: boolean;
};

export type AuthRouteProps = {
  type?: RouteTypes;
  children?: React.ReactNode;
};

export type AddBankModalProps = {
  isOpen: boolean;
  setIsOpen: any;
  cbSuccess: () => void;
};

export type PageProps<T> = {
  columns: any;
  data: any;
  title: string;
  onNewClick: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  onRefreshClick?: () => void;
  input: any;
  scroll: number;
  loading: boolean;
  deleteApi: ApiRoute;
  setData?: Dispatch<SetStateAction<T | []>>;
};

export type FeildType = {
  disabled?: boolean;
  optional?: boolean;
  placeholder?: string;
  title?: string;
  name: string;
  rules?: (
    | {
        required: boolean;
        message: string;
        pattern?: undefined;
      }
    | {
        pattern: RegExp;
        message: string;
        required?: undefined;
      }
  )[];
  options?: { label: string; value: string }[];
  type: string;
  initialValue?: string;
};
