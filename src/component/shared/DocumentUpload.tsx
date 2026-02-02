import { useEffect, useState } from "react";
import { useRequest } from "../../hooks/useRequest";
import { uploadfile } from "../../repositories";
import { notification } from "antd";

type FileItem = {
  name: string;
  file: string;
};

type Props = {
  title: string;
  onChange?: (files: FileItem) => void; // callback me sirf files jayengi
  initialFileNames?: FileItem | undefined;
  disabled?: boolean;
};

const DocumentUpload = ({
  title,
  onChange,
  initialFileNames,
  disabled,
}: Props) => {
  const [files, setFiles] = useState<FileItem | undefined>(
    initialFileNames ?? undefined,
  );

  console.log(initialFileNames);

  useEffect(() => {
    if (initialFileNames?.file && initialFileNames?.name) {
      setFiles(initialFileNames);
    } else {
      setFiles(undefined);
    }
  }, [initialFileNames]);

  const { execute, loading } = useRequest(uploadfile.url, uploadfile.method, {
    type: "delay",
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const file = event.target.files[0];

    const validVideoTypes = [
      ".mp4",
      ".mov",
      ".mkv",
      ".avi",
      ".webm",
      ".ppt",
      ".pptx",
      ".doc",
      ".docx",
      ".pdf",
    ];

    if (
      !validVideoTypes.includes(
        file.name.toLowerCase().substring(file.name.lastIndexOf(".")),
      )
    ) {
      notification.error({
        message: "Invalid File",
        description: "File format is not supported",
      });
      event.target.value = ""; // clear the input
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      notification.error({
        message: "Invalid File",
        description: "File size must be less than 15 MB",
      });
      event.target.value = ""; // clear the input
      return;
    }

    execute({
      body: {
        media: file,
        mode: "single",
        key: "user_image",
      },
      body_type: "formData",
      cbSuccess(res) {
        // @ts-ignore
        if (!res?.data?.url) return;
        // const uploadedUrls = res.url;
        const fileItem: FileItem = {
          // @ts-ignore
          name: res?.data?.filename,
          // @ts-ignore
          file: res?.data?.url as any,
        };

        onChange?.(fileItem);
        setFiles(fileItem);
      },
    });
  };

  return (
    <div
      className={`w-full border-dashed border-2 border-gray-300 rounded-lg py-3 cursor-pointer ${
        disabled && "cursor-not-allowed opacity-50"
      }`}
    >
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <label
          className={`flex items-center justify-center w-full cursor-pointer ${disabled && "cursor-not-allowed opacity-50"}`}
        >
          <input
            type="file"
            className="!hidden"
            disabled={disabled}
            id="documentUpload"
            // accept={fileType === "audio" ? "audio/*" : ""}
            onChange={handleFileChange}
          />
          <span className="text-[#8FA0AA] text-[14px] regular">
            {files ? files.name : title}
          </span>
        </label>
      )}
    </div>
  );
};

export default DocumentUpload;
