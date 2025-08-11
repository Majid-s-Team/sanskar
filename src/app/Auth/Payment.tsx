import { Link, useParams } from "react-router-dom";
import AuthButton from "../../component/partial/AuthButton";
import { useRequest } from "../../hooks/useRequest";
import { payment, user } from "../../repositories";
import { Student } from "../../types";
import { Spin } from "antd";

// const children = [
//   {
//     name: "Child Name",
//     email: "child@example.com",
//     number: "+123456789",
//     image: "/images/user.png",
//   },
//   // {
//   //   name: "Child Name",
//   //   email: "child@example.com",
//   //   number: "+123456789",
//   //   image: "/images/user.png",
//   // },
//   // {
//   //   name: "Child Name",
//   //   email: "child@example.com",
//   //   number: "+123456789",
//   //   image: "/images/user.png",
//   // },
// ];

function Payment() {
  const { id } = useParams();
  const { data, loading } = useRequest<Student[]>(user.url, user.method, {
    type: "mount",
    routeParams: id + "/students",
  });

  const { execute } = useRequest(payment.url, payment.method, {
    type: "delay",
  });

  const amount = 1000 * (data?.length ?? 0);

  const onFinish = () => {
    execute({
      body: {
        user_id: id,
        amount: amount,
        currency: "usd",
      },
      cbSuccess(res) {
        console.log(res?.url, "url");
        window.location.href = res?.url as any;
      },
    });
  };

  return (
    <div
      style={{
        backgroundImage: "url(/images/auth-bg2.png)",
        backgroundSize: "100% 100%",
      }}
      className="min-h-screen overflow-hidden grid lg:grid-cols-12 lg:p-10 p-5"
    >
      <div className="lg:col-span-3 col-span-6">
        <Link to="/login">
          <p className="text-white text-[26px] semibold">Sanskar</p>
        </Link>
        <div className="space-y-2 lg:mt-[130px] my-[50px] lg:ml-[30px] ml-0">
          <p className="text-white text-[29px] medium">Sign up to</p>
          <p className="text-white text-[33px] bold">SANSKAR!</p>
          <p className="text-white text-[13px] light">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
        </div>
      </div>
      <div className="lg:col-span-9 col-span-12 lg:p-10">
        <div className="flex items-center justify-center h-full bg-white lg:p-[40px] p-8 rounded-[40px] mx-auto shadow-lg">
          {loading ? (
            <Spin size="large" />
          ) : (
            <div>
              <div className="flex justify-center flex-wrap gap-4">
                {data?.map((child: any, index: number) => (
                  <div
                    key={index}
                    className="rounded-xl p-4 text-center h-full flex flex-col justify-center bg-[#D57D25] custom-shadow2 "
                  >
                    <img
                      className="w-[120px] h-[120px] mx-auto rounded-full"
                      src={child?.profile_image || "/images/user.png"}
                      alt={child?.first_name}
                    />
                    <h3 className="mt-2 text-[28px] regular text-[#FFFFFF] capitalize">
                      {child?.first_name + " " + child?.last_name}
                    </h3>
                    <p className="text-[#FFFFFF] text-[15.88px] text-center regular capitalize my-1">
                      {child?.student_email || "child@example.com"}
                    </p>
                    <p className="text-[#FFFFFF] text-[15.88px] text-center regular capitalize">
                      {child?.student_mobile_number || "+123456789"}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-black text-[20px] text-center semibold my-5">
                Total Registration Fee:{" "}
                {Array.isArray(data) ? data.length * 1000 : 0}
              </p>
              <AuthButton onClick={onFinish} text="Continue Payment" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Payment;
