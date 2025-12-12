import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { uploadfile } from "../../repositories";
import { useRequest } from "../../hooks";
import { notification, Spin } from "antd";

type Props = {
  onChange: (value: string) => void;
};

const SignatureInput = ({ onChange }: Props) => {
  const sigCanvasRef = useRef<SignatureCanvas>(null);
  const { execute, loading } = useRequest(uploadfile.url, uploadfile.method, {
    type: "delay",
  });

  const clear = () => {
    sigCanvasRef.current?.clear();
    onChange("");
  };

  // 🌟 Convert Base64 → FILE
  const base64ToFile = (base64: string, filename: string): File => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  // const handleEnd = () => {
  //   const base64 = sigCanvasRef.current?.toDataURL("image/png") || "";

  //   const file = base64ToFile(base64, "signature.png");

  //   execute({
  //     body: {
  //       media: file,
  //       key: "user_image",
  //     },
  //     body_type: "formData",
  //     cbSuccess(res) {
  //       // @ts-ignore
  //       onChange(res?.data?.url || "");
  //     },

  //     cbFailure(err) {
  //       notification.error({
  //         message: "Upload Error",
  //         description: err?.message || "Something went wrong",
  //       });
  //     },
  //   });
  // };

  const debounceRef = useRef<any | null>(null);

  const handleEnd = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      const base64 = sigCanvasRef.current?.toDataURL("image/png") || "";
      const file = base64ToFile(base64, "signature.png");

      execute({
        body: {
          media: file,
          key: "user_image",
        },
        body_type: "formData",
        cbSuccess(res) {
          // @ts-ignore
          onChange(res?.data?.url || "");
        },
        cbFailure(err) {
          notification.error({
            message: "Upload Error",
            description: err?.message || "Something went wrong",
          });
        },
      });
    }, 800); // API will run only if user stops drawing for 800ms
  };
  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded z-50">
          <Spin />
        </div>
      )}

      <SignatureCanvas
        ref={sigCanvasRef}
        penColor="black"
        onEnd={handleEnd}
        canvasProps={{ className: "w-full h-[80px] border-b bg-white" }}
      />

      <div className="mt-2 flex justify-end">
        <button
          type="button"
          onClick={clear}
          className="px-3 py-1 border rounded"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default SignatureInput;
