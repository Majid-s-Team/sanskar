import React, { useEffect, useState } from "react";
import { uploadfile } from "../../repositories";
import { useRequest } from "../../hooks/useRequest";
import { Spin } from "antd";
// import { useRequest } from "../../hooks/useRequest";

type Props = {
  onChange: (value: string) => void;
  initialImgSrc: string;
  text: string;
  coverImage?: string;
};

const BannerPicker = ({ onChange, initialImgSrc, text, coverImage }: Props) => {
  const [imgSrc, setImgSrc] = useState<string>("");
  const { execute, loading } = useRequest(uploadfile.url, uploadfile.method, {
    type: "delay",
  });

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const img = new Image();
      const objectURL = URL.createObjectURL(file);
      setImgSrc(objectURL);
      img.src = objectURL;
    }

    execute({
      body: {
        file: event?.target?.files?.[0],
        mode: "single",
      },
      body_type: "formData",
      cbSuccess(res) {
        // @ts-ignore
        onChange(res?.data?.url);
      },
    });
  };

  useEffect(() => {
    if (initialImgSrc) {
      setImgSrc(initialImgSrc);
    }
  }, [initialImgSrc]);

  return (
    <div className="mb-4 cursor-pointer">
      <p className="text-[#2A2F31] text-[16px] py-2 red-medium py-6">{text}</p>
      {loading ? (
        <div className="w-full h-[170px] flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
        <div>
          {imgSrc ? (
            <img
              className="lg:w-[442px] h-[170px] !rounded-[10px] !object-cover "
              src={imgSrc}
              onClick={() => setImgSrc("")}
              alt=""
            />
          ) : (
            <div className="max-w-[979px] !h-[240px] border border-[#D3D3D3] rounded-[10px] border-dashed flex justify-center items-center">
              <label>
                <img
                  className="mb-4 object-contain w-[240px] h-[140px]"
                  src={coverImage || "/images/pdf.png"}
                  alt=""
                />
                <input
                  className="!hidden"
                  type="file"
                  id="input"
                  onChange={onFileChange}
                />
              </label>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(BannerPicker);
