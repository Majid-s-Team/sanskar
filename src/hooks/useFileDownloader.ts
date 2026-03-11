import { useState } from "react";
import { request } from "../repositories";
import { notification } from "antd";

type DownloadProps = {
  url: string;
  filter: string;
  params: any;
};

export const useFileDownloader = () => {
  const [downloadLoading, setDownloadLoading] = useState<boolean>(false);

  const download = ({ url, filter, params }: DownloadProps) => {
    setDownloadLoading(true);
    request(url, "POST")
      .setParams({
        ...params,
      })
      .setConfig({ responseType: "blob" })
      .onSuccess((res: any) => {
        const url = window.URL.createObjectURL(res);
        const a = document.createElement("a");
        a.href = url;
        a.download = `report.${filter}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        setDownloadLoading(false);
      })
      .onFailure(() => {
        setDownloadLoading(false);
        notification.error({
          message: "Error",
          description: "No data found",
        });
      })
      .call();
  };

  return { downloadLoading, download };
};
