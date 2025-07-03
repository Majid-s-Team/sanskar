import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

const SignatureInput = () => {
  const sigCanvasRef = useRef<SignatureCanvas>(null);

  const clear = () => sigCanvasRef.current?.clear();
  // const save = () => {
  //   const dataURL = sigCanvasRef.current?.toDataURL("image/png");
  //   console.log("Signature Data URL:", dataURL); // you can send this to API
  // };

  return (
    <div className="rounded">
      <SignatureCanvas
        ref={sigCanvasRef}
        penColor="black"
        canvasProps={{ className: "w-full h-[80px] border-b" }}
      />
      <div className="flex justify-between mt-2">
        <button onClick={clear} className="px-3 py-1 border rounded">
          Clear
        </button>
        {/* <button onClick={save} className="px-3 py-1 border rounded">
          Save
        </button> */}
      </div>
    </div>
  );
};

export default SignatureInput;
