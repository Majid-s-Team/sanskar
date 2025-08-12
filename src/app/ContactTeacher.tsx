import { Avatar } from "antd";
import HomeLayout from "../component/shared/HomeLayout";
import CustomButton from "../component/shared/CustomButton";
import { withAuthGuard } from "../component/higherOrder/withAuth";

function ContactTeacher() {
  return (
    <HomeLayout>
      <div className="flex lg:flex-row flex-col gap-5 lg:items-center justify-between">
        <p className="text-[30px] semibold">Contact Teacher</p>
        <CustomButton
          className="text-[16px]"
          title="Gurukul Admin Email address"
        />
      </div>
      {[1, 2, 3, 4].map((index) => {
        return (
          <div
            key={index}
            className="flex gap-5 items-center justify-between mt-5 bg-white p-5 rounded-[20px]"
          >
            <div className="flex items-center gap-5">
              <Avatar size={80} src="/images/teacher.png" />
              <div>
                <p className="text-[16px] semibold">Jane Cooper</p>
                <p className="text-[12px]  regular">+011 384 792302</p>
                <p className="text-[12px]  regular">janecooper@gmail.com</p>
              </div>
            </div>
            <div className="flex lg:flex-row flex-col gap-5 items-center">
              <img className="w-[40px]" src="/icons/chat.png" alt="" />
              <img className="w-[40px]" src="/icons/call.png" alt="" />
            </div>
          </div>
        );
      })}
    </HomeLayout>
  );
}

export default withAuthGuard(ContactTeacher);
