import { Button } from "antd";

type Props = {
  onSubmit?: () => void;
  onCancel?: () => void;
  title?: string;
  loading?: boolean;
  title2?: string;
  icon?: string;
  icon2?: string;
  htmlType?: "submit" | "reset" | "button";
};

export default function FormButtons({
  onSubmit,
  title,
  loading,
  title2,
  onCancel,
  icon,
  icon2,
  htmlType,
}: Props) {
  return (
    <div className="flex lg:flex-row flex-col gap-4 mt-5">
      <Button
        icon={icon2 && <img className="w-[20px]" src={icon2} alt="" />}
        onClick={onCancel}
        className="w-full h-[54px] !bg-transparent rounded-[10px] !border-[#D57D25] text-[16px] inter-medium  !text-[#D57D25]"
      >
        {title2 || "Cancel"}
      </Button>
      <Button
        icon={icon && <img className="w-[20px]" src={icon} alt="" />}
        onClick={onSubmit}
        htmlType={htmlType}
        loading={loading}
        className="w-full h-[54px] !bg-[#D57D25] rounded-[10px] !border-white text-[16px] medium !text-white shadow-[0px_4px_4px_0px_rgba(245,223,201)]"
      >
        {title}
      </Button>
    </div>
  );
}
