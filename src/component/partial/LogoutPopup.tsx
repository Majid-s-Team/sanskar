import { Modal } from "antd";
import React from "react";
import { useAuth } from "../../hooks/useAuth";
import FormButtons from "../shared/FormButtons";

function LogoutPopup({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { logout } = useAuth();
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width={400}
      centered
    >
      <div className="flex flex-col gap-4">
        <img
          className="w-[98.76px] h-[98.76px] mx-auto"
          src="/images/logout-icon.png"
          alt=""
        />
        <p className="text-[18px] text-[#0F0F0] medium text-center">
          Are you sure you want to logout ?
        </p>
        <FormButtons
          title="Yes"
          title2="No"
          onSubmit={logout}
          onCancel={() => setOpen(false)}
        />
      </div>
    </Modal>
  );
}

export default LogoutPopup;
