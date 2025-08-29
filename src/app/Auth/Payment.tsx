import { Link, useNavigate, useParams } from "react-router-dom";
import AuthButton from "../../component/partial/AuthButton";
import { useRequest } from "../../hooks/useRequest";
import { payment, students, user } from "../../repositories";
import { Student } from "../../types";
import { notification, Popconfirm, Spin } from "antd";
import { useEffect } from "react";
import { DeleteFilled } from "@ant-design/icons";

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
  const navigate = useNavigate();

  const { data, loading, setData } = useRequest<Student[]>(
    user.url,
    user.method,
    {
      type: "mount",
      routeParams: id + "/students",
    }
  );

  const { execute: executeDelete, loading: loadingDelete } = useRequest(
    students.url,
    "DELETE",
    {}
  );

  const { execute, loading: loading2 } = useRequest(
    payment.url,
    payment.method,
    {
      type: "delay",
    }
  );

  const baseFee = 300;
  const amount = (data ?? []).reduce((total, student) => {
    const extraFee = student.join_the_club ? 10 : 0;
    return total + baseFee + extraFee;
  }, 0);

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

  useEffect(() => {
    window.onpopstate = () => {
      navigate("/payment/" + id);
    };
  }, [navigate]);

  const handleDelete = (id: number) => {
    if (data?.length === 1) {
      return notification.error({
        message: "Error",
        description: "At least one student is required",
      });
    }
    executeDelete({
      type: "mount",
      routeParams: String(id),
      cbSuccess() {
        setData((prev) => prev?.filter((s) => s.id !== id));
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
          <p className="text-white text-[26px] semibold">Sanskar Academy</p>
        </Link>
        <div className="space-y-2 lg:mt-[130px] my-[50px] lg:ml-[30px] ml-0">
          <p className="text-white text-[29px] medium">Sign up to</p>
          <p className="text-white text-[33px] bold">Gurukul Classes</p>
        </div>
      </div>
      <div className="lg:col-span-9 col-span-12 lg:p-10">
        <div className="bg-white lg:p-[40px] p-8 rounded-[40px] mx-auto shadow-lg  h-full">
          <p className="text-[30px] semibold text-center">
            Registration Confirmation
          </p>
          <div className="flex items-center justify-center h-full">
            {loading || loadingDelete ? (
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
                      <div className="flex gap-4 mt-4 justify-center">
                        <Popconfirm
                          title="Are you sure you want to delete this student?"
                          onConfirm={() => handleDelete(child.id)}
                        >
                          <DeleteFilled className="text-white cursor-pointer text-[20px]" />
                        </Popconfirm>
                      </div>
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
                  Please make a payment to complete the registration.
                  Registration is not considered complete until payment is
                  received. Unpaid registrations will be cancelled.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
