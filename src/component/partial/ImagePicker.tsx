import { Avatar, Spin } from "antd";
import { useState, useEffect } from "react";
import { uploadfile } from "../../repositories";
import { useRequest } from "../../hooks/useRequest";

interface ProfileimgProps {
  onChange: (data: string) => void | undefined;
  initialImgSrc: string | undefined;
}

const ImagePicker = ({ onChange, initialImgSrc }: ProfileimgProps) => {
  const [imgSrc, setImgSrc] = useState<string>("");

  const { execute, loading } = useRequest(uploadfile.url, uploadfile.method, {
    type: "delay",
  });

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // onChange(event.target.files[0]);
    if (file) {
      const img = new Image();
      const objectURL = URL.createObjectURL(file);
      // setImgSrc(objectURL);
      img.src = objectURL;

      // const formData = new FormData();
      // formData.append("file", file);
      // formData.append("mode", "single");
      // onChange(formData);
    }

    execute({
      body: {
        media: event?.target?.files?.[0],
        key: "user_image",
      },
      body_type: "formData",
      cbSuccess(res) {
        // @ts-ignore
        onChange(res.data?.url);
        // @ts-ignore
        setImgSrc(res.data?.url);
      },
    });
  };

  useEffect(() => {
    if (initialImgSrc) {
      setImgSrc(initialImgSrc);
    }
  }, [initialImgSrc]);

  return (
    <div>
      {/* <p className="text-[#2A2F31] text-[16px] red-regular py-6">Upload Logo</p> */}
      {loading ? (
        <div
          style={{ width: "110px" }}
          className=" h-[120px] flex justify-center items-center"
        >
          <Spin size="default" />
        </div>
      ) : (
        <>
          {imgSrc ? (
            <Avatar size={120} src={imgSrc} onClick={() => setImgSrc("")} />
          ) : (
            <div className="pointer mx-auto lg:mx-0 w-[120px]">
              <label>
                <img
                  className="mx-auto pb-4 "
                  src="/images/upload.png"
                  alt="Upload icon"
                />
                <input
                  className="!hidden"
                  type="file"
                  onChange={onFileChange}
                />
              </label>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ImagePicker;
