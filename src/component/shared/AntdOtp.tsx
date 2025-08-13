import { Input } from "antd";
import { useState, useRef } from "react";

function AntdOtp({
  length = 6,
  onChange,
}: {
  length?: number;
  onChange?: (val: string) => void;
}) {
  const [values, setValues] = useState(Array(length).fill(""));
  const inputsRef = useRef<(any | null)[]>([]);

  const handleChange = (val: string, index: number) => {
    const newValues = [...values];
    newValues[index] = val.slice(-1); // only last character
    setValues(newValues);
    onChange?.(newValues.join(""));

    if (val && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
      {Array.from({ length }).map((_, i) => (
        <Input
          key={i}
          value={values[i]}
          onChange={(e) => handleChange(e.target.value, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          maxLength={1}
          style={{
            width: "61.6px",
            height: "61.6px",
            textAlign: "center",
            background: "#E7F1FF",
            borderRadius: "10.76px",
            fontSize: "20px",
          }}
          ref={(el: any) => (inputsRef.current[i] = el)}
        />
      ))}
    </div>
  );
}

export default AntdOtp;
