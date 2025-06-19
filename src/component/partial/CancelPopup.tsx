import { Button, Modal } from "antd";
import React from "react";

type Props = {
  open?: boolean;
  onCancel?: () => void;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

function CancelPopup({ open, setOpen, onCancel }: Props) {
  return (
    <Modal
      open={open}
      onCancel={() => setOpen && setOpen(false)}
      footer={null}
      width={400}
      centered
    >
      <div className="flex flex-col gap-4">
        <img
          className="w-[98.76px] h-[98.76px] mx-auto"
          src="/images/cancel-circle.png"
          alt=""
        />
        <p className="text-[18px] text-[#0F0F0] red-medium text-center">
          Are you sure you want to Cancel
        </p>
        <div className="flex lg:flex-row flex-col gap-4 mt-5">
          <Button
            onClick={() => setOpen && setOpen(false)}
            className="lg:w-[275px] w-full h-[50px] border border-[#878A8D] bg-transparent rounded-[40px] text-[14px] text-[#878A8D] red-regular"
          >
            No
          </Button>
          <Button
            onClick={onCancel}
            className="lg:w-[275px] w-full h-[50px] bg-[#FE3A30] rounded-[40px] text-[14px] text-white red-regular"
          >
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default CancelPopup;
