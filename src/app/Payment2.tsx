import HomeLayout from "../component/shared/HomeLayout";
import { useAuth, useRequest } from "../hooks";
import AuthButton from "../component/partial/AuthButton";
import { payment } from "../repositories";
import { useLocation, useParams } from "react-router-dom";
import { withAuthGuard } from "../component/higherOrder/withAuth";

function Payment2() {
  const { id } = useParams();
  const { state } = useLocation();
  const { user: userData } = useAuth();

  console.log(state, "state");

  const amount = state?.join_the_club ? 310 : 300;

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
        student_id: [id],
        amount: amount,
        currency: "usd",
      },
      cbSuccess(res) {
        console.log(res?.url, "url");
        window.open(res?.url as any, "_blank");
      },
    });
  };

  // useEffect(() => {
  //   if (userData && userData.user?.id && userData?.roles?.[0] === "user") {
  //     execute2({
  //       type: "mount",
  //       routeParams: userData?.user?.id + "/students",
  //       cbSuccess(res) {
  //         const student = res?.data.filter(
  //           (item: any) => item?.is_payment_done === false
  //         );
  //         setData(student);
  //       },
  //     });
  //   }
  // }, [userData]);

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-full bg-white rounded-[24px]">
        <div>
          <div className="flex justify-center flex-wrap gap-4">
            {/* {data?.map((child: any, index: number) => ( */}
            <div
              // key={index}
              className="rounded-xl p-4 text-center h-full flex flex-col justify-center bg-[#D57D25] custom-shadow2 w-[230px]"
            >
              <img
                className="w-[120px] h-[120px] mx-auto rounded-full"
                src={state?.profile_image || "/images/user.png"}
                alt={state?.first_name}
              />
              <h3 className="mt-2 text-[24px] regular text-[#FFFFFF] capitalize truncate">
                {state?.first_name + " " + state?.last_name}
              </h3>
              <p className="text-[#FFFFFF] text-[15px] text-center regular capitalize my-1 truncate">
                {state?.student_email || "state@example.com"}
              </p>
              <p className="text-[#FFFFFF] text-[15px] text-center regular capitalize truncate">
                {state?.student_mobile_number || "+123456789"}
              </p>
            </div>
            {/* ))} */}
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
          {/* <p className="text-black text-[15px] text-center regular w-[80%] mx-auto">
            Please make a payment to complete the registration. Registration is
            not considered complete until payment is received. Unpaid
            registrations will be cancelled.
          </p> */}
        </div>
      </div>
    </HomeLayout>
  );
}

export default withAuthGuard(Payment2);
