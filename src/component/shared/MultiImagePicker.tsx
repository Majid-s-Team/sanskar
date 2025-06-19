import { useState, useEffect } from "react";
import { uploadfile } from "../../repositories";
import { useRequest } from "../../hooks/useRequest";
import { Skeleton } from "antd";

interface ProfileimgProps {
  onChange?: (data: string[]) => void | undefined;
  initialImgsSrc?: string[] | undefined;
}

const MultiImagePicker = ({ onChange, initialImgsSrc }: ProfileimgProps) => {
  const [imgsSrc, setImgsSrc] = useState<string[]>([]);

  const { execute, loading } = useRequest(uploadfile.url, uploadfile.method, {
    type: "delay",
    body_type: "formData",
  });

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // const files = Array.from(event.target.files);
      execute({
        body: {
          file: Object.values(event.target.files),
          mode: "multiple",
        },
        body_type: "formData",
        cbSuccess(res) {
          // @ts-ignore
          if (res?.data?.url) {
            setImgsSrc((prevImgsSrc) => {
              // @ts-ignore
              const updatedUrls = [...prevImgsSrc, ...res?.data?.url];
              onChange?.(updatedUrls);
              return updatedUrls;
            });
          }
        },
      });
    }
  };

  useEffect(() => {
    if (initialImgsSrc && initialImgsSrc.length > 0) {
      setImgsSrc(initialImgsSrc);
    }
  }, [initialImgsSrc]);

  const handleRemoveImage = (index: number) => {
    setImgsSrc((prevImgsSrc) => {
      const updatedImgsSrc = prevImgsSrc.filter((_, i) => i !== index);
      onChange?.(updatedImgsSrc);
      return updatedImgsSrc;
    });
  };

  return (
    <div>
      {/* <p className="text-[#2A2F31] text-[16px] red-medium py-6">
        Add Attachments
      </p> */}
      <div className="flex flex-wrap gap-4 py-6">
        <div className="pointer mx-auto lg:mx-0 w-[130px]">
          <label>
            <img
              className="mx-auto pb-4"
              src="/images/add-prod.png"
              alt="Upload icon"
            />
            <input
              className="!hidden"
              type="file"
              multiple
              onChange={onFileChange}
            />
          </label>
        </div>
        {loading ? (
          <Skeleton.Image
            active={true}
            style={{ width: 130, height: 130, borderRadius: "10px" }}
          />
        ) : (
          <div className="flex flex-wrap gap-4">
            {imgsSrc.map((imgSrc, index) => (
              <div key={index} className="relative">
                <img
                  src={imgSrc}
                  alt="Uploaded image"
                  style={{ width: 130, height: 130, objectFit: "cover" }}
                />
                <img
                  className="absolute top-0 right-0 cursor-pointer w-[24px] h-[24px]"
                  src="/icons/cancle.png"
                  alt=""
                  onClick={() => handleRemoveImage(index)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiImagePicker;
