import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import {
  FilterOptionsType,
  // useFilterReturnType,
  UseRequestOptions,
} from "../types";
// import { useDropDownOptions } from "./useDropDownOptions";

export const useFilter = (
  execute: (params: Partial<UseRequestOptions<any>>) => void
): any => {
  const [filterOptions, setFilterOptions] = useState<FilterOptionsType>({
    filter_key: "",
    filter_value: "",
  });
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce<string>(search, 500);
  // const { data: options, loading: optionsLoading } = useDropDownOptions();

  useEffect(() => {
    if (
      !!filterOptions.filter_key.length &&
      !!filterOptions.filter_value.length
    ) {
      execute({ params: filterOptions });
    }
  }, [filterOptions]);

  useEffect(() => {
    execute({
      params: {
        ...filterOptions,
        search: debouncedSearch,
      },
    });
  }, [debouncedSearch]);

  return {
    setFilterOptions,
    filterOptions,
    search: debouncedSearch,
    setSearch,
    // options,
    // optionsLoading,
  };
};
