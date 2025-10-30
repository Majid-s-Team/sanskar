import { Button } from "antd";
import React from "react";

type Props = {
  title: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
  htmlType?: "submit" | "button" | "reset" | undefined;
  loading?: boolean;
  disabled?: boolean;
};

function CustomButton({
  title,
  onClick,
  icon,
  backgroundColor = "#D57D25",
  textColor = "#fff",
  className,
  htmlType = "submit",
  loading,
  disabled,
}: Props) {
  return (
    <Button
      htmlType={htmlType}
      className={`rounded-[8.75px] h-[40px] red-medium px-10 border-0 text-[12px] medium ${className}`}
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
        boxShadow: "0px 10px 20px 0px #FD841640",
      }}
      onClick={onClick}
      icon={icon}
      loading={loading}
      disabled={disabled}
    >
      {title}
    </Button>
  );
}

export default React.memo(CustomButton);
