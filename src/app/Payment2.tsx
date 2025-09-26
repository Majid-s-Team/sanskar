import HomeLayout from "../component/shared/HomeLayout";
import { useAuth, useRequest } from "../hooks";
import { Student } from "../types";
import { Spin } from "antd";
import AuthButton from "../component/partial/AuthButton";
import { payment, user } from "../repositories";
import { useEffect, useState } from "react";

function Payment2() {
  const { user: userData } = useAuth();
  const [data, setData] = useState<Student[]>();

  const { loading, execute: execute2 } = useRequest<Student[]>(
    user.url,
    user.method,
    {}
  );

  const baseFee = 300;
  const amount = (data ?? []).reduce((total, student) => {
    const extraFee = student.join_the_club ? 10 : 0;
    return total + baseFee + extraFee;
  }, 0);

  const { execute, loading: loading2 } = useRequest(
    payment.url,
    payment.method,
    {
      type: "delay",
    }
  );

  const onFinish = () => {
    execute({
      body: {
        user_id: userData?.user?.id,
        amount: amount,
        currency: "usd",
      },
      cbSuccess(res) {
        console.log(res?.url, "url");
        window.location.href = res?.url as any;
      },
    });
  };

  useEffect(() => {
    if (userData && userData.user?.id && userData?.roles?.[0] === "user") {
      execute2({
        type: "mount",
        routeParams: userData?.user?.id + "/students",
        cbSuccess(res) {
          const student = res?.data.filter(
            (item: any) => item?.is_payment_done === false
          );
          setData(student);
        },
      });
    }
  }, [userData]);

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-full">
        {loading ? (
          <Spin size="large" />
        ) : (
          <div>
            <div className="flex justify-center flex-wrap gap-4">
              {data?.map((child: any, index: number) => (
                <div
                  key={index}
                  className="rounded-xl p-4 text-center h-full flex flex-col justify-center bg-[#D57D25] custom-shadow2 w-[230px]"
                >
                  <img
                    className="w-[120px] h-[120px] mx-auto rounded-full"
                    src={child?.profile_image || "/images/user.png"}
                    alt={child?.first_name}
                  />
                  <h3 className="mt-2 text-[24px] regular text-[#FFFFFF] capitalize truncate">
                    {child?.first_name + " " + child?.last_name}
                  </h3>
                  <p className="text-[#FFFFFF] text-[15px] text-center regular capitalize my-1 truncate">
                    {child?.student_email || "child@example.com"}
                  </p>
                  <p className="text-[#FFFFFF] text-[15px] text-center regular capitalize truncate">
                    {child?.student_mobile_number || "+123456789"}
                  </p>
                  {/* <div className="flex gap-4 mt-4 justify-center">
                    <Popconfirm
                      title="Are you sure you want to delete this student?"
                      onConfirm={() => handleDelete(child.id)}
                    >
                      <DeleteFilled className="text-white cursor-pointer text-[20px]" />
                    </Popconfirm>
                  </div> */}
                </div>
              ))}
            </div>
            <p className="text-black text-[20px] text-center semibold my-5">
              Total Registration Fee: ${amount}
            </p>
            <div className="w-[400px] mx-auto">
              <AuthButton
                loading={loading2}
                onClick={onFinish}
                text="Make Payment"
              />
            </div>
            <p className="text-black text-[15px] text-center regular w-[80%] mx-auto">
              Please make a payment to complete the registration. Registration
              is not considered complete until payment is received. Unpaid
              registrations will be cancelled.
            </p>
          </div>
        )}
      </div>
    </HomeLayout>
  );
}

export default Payment2;
