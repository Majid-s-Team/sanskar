import { Link } from "react-router-dom";
import HomeLayout from "../component/shared/HomeLayout";
import { getStorageData } from "../helper";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import { useAuth } from "../hooks/useAuth";
import ImagePicker from "../component/partial/ImagePicker";
import { useRequest, useUser } from "../hooks";
import { UserActionTypes } from "../types/contexts";

const setting = [
  {
    title: "Parent's Profile",
    icon: "/icons/profile.png",
    path: "/parents-profile",
  },
  {
    title: "Students Information",
    icon: "/icons/student-card.png",
    path: "/home/all-student-info",
  },
];

function Setting() {
  const role = getStorageData("role");
  const { user } = useAuth();
  const [, dispatch] = useUser();

  const { execute } = useRequest("/teachers", "PUT", {
    routeParams: String(user?.teacher?.id) + "/profileImage",
  });

  const onFinish = (values: any) => {
    execute({
      body: values,
      cbSuccess: () => {
        dispatch({
          type: UserActionTypes.PUT,
          payload: {
            ...user,
            // @ts-ignore
            teacher: {
              ...user?.teacher,
              profile_picture: values.profile_picture,
            },
          },
        });
      },
    });
  };

  return (
    <HomeLayout>
      {role === "user" ? (
        <>
          <p className="text-[40px] semibold">Settings</p>
          {setting.map((item, index) => {
            return (
              <Link
                to={item.path}
                key={index}
                className="flex items-center gap-5 mt-5 bg-white p-5 rounded-[20px]"
              >
                <img className="w-[50px]" src={item.icon} alt="" />
                <div>
                  <p className="text-[24px] bold !text-[#333342]">
                    {item.title}
                  </p>
                </div>
              </Link>
            );
          })}
        </>
      ) : (
        <div className="bg-white p-5 rounded-[24.59px]">
          <div className={`flex flex-col items-center text-center my-10`}>
            {/* <Avatar size={143} src={user?.teacher?.profile_picture} /> */}
            <ImagePicker
              initialImgSrc={user?.teacher?.profile_picture}
              onChange={(value) => {
                onFinish({
                  profile_picture: value,
                });
              }}
            />
            <div>
              <p className="text-[28px] semibold capitalize">
                {user?.teacher?.full_name}
              </p>
              <p className="text-[20px] regular capitalize">
                {user?.teacher?.phone_number}
              </p>
              <p className="text-[20px] regular capitalize">
                {user?.user?.primary_email}
              </p>
            </div>
          </div>
        </div>
      )}
    </HomeLayout>
  );
}

export default withAuthGuard(Setting);
