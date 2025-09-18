import { useState } from "react";
import {
  LoadingOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import { useRequest } from "../../hooks/useRequest";
import { uploadfile } from "../../repositories";
import { notification } from "antd";

type FileStatus = "uploading" | "success" | "error";

interface UploadedFile {
  id: number;
  name: string;
  size: string;
  status: FileStatus;
  type: "image" | "video" | "pdf" | "link";
  url?: string;
  errorMessage?: string;
}

const MAX_SIZE_MB = 10;
const ALLOWED_TYPES: Record<string, UploadedFile["type"]> = {
  "image/png": "image",
  "image/jpeg": "image",
  "application/pdf": "pdf",
  "video/mp4": "video",
};

export default function FileUploader({
  onChange,
  initialFiles,
}: {
  onChange?: (media: { name: string; type: string; url: string }[]) => void;
  initialFiles?: { name: string; type: string; url: string }[];
}) {
  const [files, setFiles] = useState<UploadedFile[]>(
    initialFiles?.map((f) => ({
      ...f,
      status: "success",
    })) as UploadedFile[] | (() => UploadedFile[])
  );
  const { execute } = useRequest(uploadfile.url, uploadfile.method, {
    type: "delay",
  });

  const formatSize = (size: number) => `${(size / (1024 * 1024)).toFixed(2)}MB`;

  const updateOnChange = (updated: UploadedFile[]) => {
    const media = updated
      .filter((f) => f.status === "success" && f.url)
      .map((f) => ({
        name: f.name,
        type: f.type,
        url: f.url!,
      }));

    onChange?.(media);
  };

  // sequential upload handler
  const uploadSequentially = (fileList: File[]) => {
    if (!fileList.length) return;

    const processFile = (index: number) => {
      const file = fileList[index];
      if (!file) return;

      const mappedType = ALLOWED_TYPES[file.type];
      const isValidSize = file.size / 1024 / 1024 <= MAX_SIZE_MB;

      const id = Date.now() + index;
      const base: UploadedFile = {
        id,
        name: file.name,
        size: formatSize(file.size),
        status: "uploading",
        type: mappedType || "link",
      };

      if (!mappedType) {
        const errorFile = {
          ...base,
          status: "error" as FileStatus,
          errorMessage: "This file format is not supported",
        };
        setFiles((prev) => [...prev, errorFile]);
        updateOnChange([...files, errorFile]);
        processFile(index + 1);
      } else if (!isValidSize) {
        const errorFile = {
          ...base,
          status: "error" as FileStatus,
          errorMessage: `File exceeds ${MAX_SIZE_MB}MB limit`,
        };
        setFiles((prev) => [...prev, errorFile]);
        updateOnChange([...files, errorFile]);
        processFile(index + 1);
      } else {
        setFiles((prev) => [...prev, base]);

        execute({
          body: { media: file, key: "user_image" },
          body_type: "formData",
          cbSuccess: (res) => {
            setFiles((prev) =>
              prev.map((f) =>
                f.id === id
                  ? // @ts-ignore
                    { ...f, status: "success", url: res.data?.url }
                  : f
              )
            );
            updateOnChange(
              res.data
                ? // @ts-ignore
                  [...files, { ...base, status: "success", url: res.data?.url }]
                : files
            );
            processFile(index + 1); // move to next file
          },
          cbFailure: (res) => {
            // setFiles((prev) =>
            //   prev.map((f) =>
            //     f.id === id
            //       ? { ...f, status: "error", errorMessage: res.message }
            //       : f
            //   )
            // );
            notification.error({ message: "Error", description: res.message });
            processFile(index + 1);
          },
        });
      }
    };

    processFile(0);
  };

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    uploadSequentially(Array.from(selectedFiles));
  };

  const handleRemove = (id?: number, name?: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id || f.name !== name));
    updateOnChange(files.filter((f) => f.id !== id || f.name !== name));
  };

  return (
    <div className="max-w-[600px]">
      <label
        htmlFor="file-upload"
        className="border-2 border-dashed border-[#D0D5DD] rounded-md p-4 flex items-center gap-2 cursor-pointer"
      >
        <div className="bg-[#667085] text-white px-4 rounded-[5px] text-sm h-[29px] flex items-center gap-1">
          <div className="w-4 h-4 rounded-[1px] bg-[#858d9d]"></div> Upload
        </div>
        <span className="text-sm text-[#667085]">Choose Files</span>
        <input
          id="file-upload"
          type="file"
          multiple
          className="!hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </label>

      <div className="mt-5 space-y-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="border border-gray-200 rounded-md px-4 py-2 flex justify-between items-start"
          >
            <div>
              <p className="font-medium text-gray-700">{file.name}</p>
              <p className="text-sm text-gray-400">Size - {file.size}</p>

              {file.status === "success" && (
                <p className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <CheckCircleOutlined /> Uploaded ({file.type})
                </p>
              )}

              {file.status === "error" && (
                <p className="flex items-center gap-1 text-red-500 text-sm font-medium">
                  <CloseCircleOutlined /> {file.errorMessage}
                </p>
              )}

              {file.status === "uploading" && (
                <p className="text-sm text-orange-500 flex items-center gap-1">
                  <LoadingOutlined /> Uploading...
                </p>
              )}
            </div>

            <div className="flex gap-2 pt-1 text-gray-500 text-lg cursor-pointer">
              {file.status === "error" && <ReloadOutlined />}
              {/* <MoreOutlined /> */}
              <DeleteFilled onClick={() => handleRemove(file.id, file.name)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
