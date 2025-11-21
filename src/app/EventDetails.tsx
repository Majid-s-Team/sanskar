import { Button } from "antd";
import HomeLayout from "../component/shared/HomeLayout";
import { useState } from "react";
import WriteReasonModal from "../component/partial/WriteReasonModal";
import { useNavigate, useParams } from "react-router-dom";
import SelectChildModal from "../component/partial/SelectChildModal";
import { getStorageData } from "../helper";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import { useRequest } from "../hooks";
import dayjs from "dayjs";

function EventDetails() {
  const { id } = useParams();
  const role = getStorageData("role");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const { data, loading } = useRequest<any>("/events", "GET", {
    type: "mount",
    routeParams: id,
  });

  const { execute: execute2, loading: loading2 } = useRequest<any>(
    "/events",
    "POST",
    {
      type: "delay",
    }
  );

  const onFinish = () => {
    execute2({
      body: { status: "attending" },
      routeParams: String(id) + "/rsvp",
      cbSuccess: () => {
        navigate(-1);
      },
    });
  };

  return (
    <HomeLayout loading={loading}>
      <div className="bg-white p-5 rounded-[24.59px]">
        <p className="text-[40px] semibold mb-5">Event Details</p>
        <img
          className="w-full lg:h-[300px] h-[200px] object-cover rounded-[23.31px]"
          src="/images/img.png"
          alt=""
        />
        <div className="space-y-5 my-5">
          <p className="text-[30px] semibold">
            {data?.name || "Event Details"}
          </p>
          <p className="text-[20px] regular text-[#333342]">
            {data?.details || "No Description"}
          </p>
          <div className="space-y-2 mt-5">
            <div className="flex gap-2 items-center">
              <img className="w-[30px]" src="/icons/date-orange.png" alt="" />
              <p className="text-[#242424] text-[20px]">
                {dayjs(data?.start_at).format("MM-DD-YYYY")}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <img className="w-[30px]" src="/icons/time-orange.png" alt="" />
              <p className="text-[#242424] text-[20px]">
                {dayjs(data?.start_at).format("h:mm A")}-
                {dayjs(data?.end_at).format("h:mm A")}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <img
                className="w-[30px]"
                src="/icons/address-orange.png"
                alt=""
              />
              <p className="text-[#242424] text-[20px]">
                {data?.location || "XYZ Hall, QZR Street"}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <img className="w-[30px]" src="/icons/date-orange.png" alt="" />
              <p className="text-[#242424] text-[20px]">
                RSVP Due Date /{" "}
                {dayjs(data?.rsvp_due_date).format("MM-DD-YYYY")}{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col gap-4 mt-10 justify-center">
          <Button
            style={{
              boxShadow: "0px 10px 20px 0px #24242440",
            }}
            loading={role === "teacher" && loading2}
            onClick={() => (role === "user" ? setOpen2(true) : onFinish())}
            className="h-[54px] px-20 !bg-[#006838] rounded-[10px] !border-none text-[20px] medium !text-white"
          >
            Attending
          </Button>
          <Button
            onClick={() => setOpen(true)}
            style={{
              boxShadow: "0px 10px 20px 0px #24242440",
            }}
            className="h-[54px] px-20 !bg-[#FF0308] rounded-[10px] !border-none text-[20px] medium !text-white"
          >
            Not Attending
          </Button>
        </div>
      </div>
      {open && (
        <WriteReasonModal
          isModalOpen={open}
          handleCancel={() => setOpen(false)}
        />
      )}
      {open2 && (
        <SelectChildModal
          isModalOpen={open2}
          handleCancel={() => setOpen2(false)}
        />
      )}
    </HomeLayout>
  );
}

export default withAuthGuard(EventDetails);
