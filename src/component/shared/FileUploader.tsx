import { useState } from "react";
import {
  LoadingOutlined,
  ReloadOutlined,
  MoreOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

type FileStatus = "uploading" | "success" | "error";

interface UploadedFile {
  id: number;
  name: string;
  size: string;
  status: FileStatus;
  errorMessage?: string;
}

const MAX_SIZE_MB = 2;
const ALLOWED_TYPES = ["image/png", "image/jpeg", "application/pdf"];

export default function FileUploader() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  // const [uploading, setUploading] = useState(false);

  const formatSize = (size: number) => `${(size / (1024 * 1024)).toFixed(2)}MB`;

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: UploadedFile[] = [];

    Array.from(selectedFiles).forEach((file, i) => {
      const isValidType = ALLOWED_TYPES.includes(file.type);
      const isValidSize = file.size / 1024 / 1024 <= MAX_SIZE_MB;

      const id = Date.now() + i;
      const base: UploadedFile = {
        id,
        name: file.name,
        size: formatSize(file.size),
        status: "uploading",
      };

      if (!isValidType) {
        newFiles.push({
          ...base,
          status: "error",
          errorMessage: "This file format is not supported",
        });
      } else if (!isValidSize) {
        newFiles.push({
          ...base,
          status: "error",
          errorMessage: "File exceeds 2MB limit",
        });
      } else {
        // Simulate upload delay
        newFiles.push({ ...base });
        setTimeout(() => {
          setFiles((prev) =>
            prev.map((f) => (f.id === id ? { ...f, status: "success" } : f))
          );
        }, 1000);
      }
    });

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const retryUpload = (file: UploadedFile) => {
    const id = file.id;
    setFiles((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, status: "uploading", errorMessage: "" } : f
      )
    );

    setTimeout(() => {
      setFiles((prev) =>
        prev.map((f) => (f.id === id ? { ...f, status: "success" } : f))
      );
    }, 1000);
  };

  return (
    <div className="max-w-[600px]">
      <label
        htmlFor="file-upload"
        className="border-2 border-dashed border-[#D0D5DD] rounded-md p-4 flex items-center gap-2 cursor-pointer"
      >
        <div className="bg-[#667085] text-white px-4 rounded-[5px] !text-sm !h-[29px] regular flex items-center gap-1">
          <div className="w-4 h-4 rounded-[1px] bg-[#858d9d]"></div> Upload
        </div>
        <span className="text-sm regular text-[#667085]">or Drop Files</span>
        <input
          id="file-upload"
          type="file"
          multiple
          className="!hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </label>

      {/* Drop Area */}
      {/* <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        className="mt-2 text-sm text-gray-400 text-center"
      >
        Drag & drop files here
      </div> */}

      {/* File List */}
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
                  <CheckCircleOutlined /> Successful
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
              {file.status === "error" && (
                <ReloadOutlined onClick={() => retryUpload(file)} />
              )}
              <MoreOutlined />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
