import { Button } from "antd";
import React from "react";
import { ButtonComponentProps } from "../../types";

function AuthButton({
  text,
  onClick,
  htmlType,
  loading,
  disabled,
}: ButtonComponentProps) {
  return (
    <Button
      htmlType={htmlType}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
      className="w-full h-[54px] !bg-[#D57D25] rounded-[10px] !border-white text-[16px] medium !text-white my-[25px] shadow-[0px_4px_4px_0px_rgba(245,223,201)]"
    >
      <p>{text}</p>
    </Button>
  );
}

export default React.memo(AuthButton);
