import dayjs from "dayjs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import HomeLayout from "../component/shared/HomeLayout";
import { useRequest } from "../hooks";
import { useState } from "react";
import { Button, Popconfirm } from "antd";

function DetailItem({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="font-semibold">{title}</span>
      <span>{value || "-"}</span>
    </div>
  );
}

function EarlyPickupDetails() {
  const { state: data } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState<
    "approved" | "rejected" | null
  >(null);

  const { execute, loading } = useRequest("/teacher/early-pickup", "POST", {
    type: "delay",
    routeParams: `${id}/status`,
  });
  const onFinish = (status: "approved" | "rejected") => {
    setActiveButton(status);
    execute({
      body: { status },
      cbSuccess: () => {
        setActiveButton(null);
        navigate(-1);
      },
      cbFailure: () => setActiveButton(null),
    });
  };
  return (
    <HomeLayout>
      <div className="bg-white xl:px-40 lg:px-20  p-5 lg:py-20 rounded-[24.59px] flex flex-col justify-center">
        <p className="text-[30px] text-center semibold">
          Early Pick-up Request
        </p>
        <div className="space-y-4 text-[15px] my-5">
          <DetailItem
            title="Student Name"
            value={`${data?.student.first_name} ${data?.student.last_name}`}
          />

          <DetailItem
            title="Date of Birth"
            value={dayjs(data?.dob).format("MM-DD-YYYY")}
          />

          <DetailItem title="Pick-up Time" value={data?.pickup_time} />

          <DetailItem
            title="Name of Person Picking Up"
            value={data?.name_of_person}
          />

          <DetailItem title="Reason" value={data?.reason} />

          {/* <DetailItem
            title="Created At"
            value={dayjs(data?.created_at).format("YYYY-MM-DD HH:mm")}
          /> */}

          <div>
            <p className="font-semibold">Parent Signature</p>
            <img
              src={data?.signature_image}
              className="w-[180px] mt-2 border rounded"
            />
          </div>
        </div>
        {data?.status === "pending" && (
          <div className="flex lg:flex-row flex-col gap-8 mt-10 justify-center">
            <Popconfirm
              title="Are you sure you want to approve this request?"
              onConfirm={() => onFinish("approved")}
              okText="Yes"
            >
              <Button
                loading={loading && activeButton === "approved"}
                style={{ boxShadow: "0px 10px 20px 0px #24242440" }}
                className="h-[54px] px-20 !bg-[#006838] rounded-[10px] !border-none text-[20px] medium !text-white"
              >
                Accept
              </Button>
            </Popconfirm>
            <Popconfirm
              title="Are you sure you want to reject this request?"
              onConfirm={() => onFinish("rejected")}
              okText="Yes"
            >
              <Button
                loading={loading && activeButton === "rejected"}
                style={{ boxShadow: "0px 10px 20px 0px #24242440" }}
                className="h-[54px] px-20 !bg-[#FF0308] rounded-[10px] !border-none text-[20px] medium !text-white"
              >
                Reject
              </Button>
            </Popconfirm>
          </div>
        )}
      </div>
    </HomeLayout>
  );
}

export default withAuthGuard(EarlyPickupDetails);
