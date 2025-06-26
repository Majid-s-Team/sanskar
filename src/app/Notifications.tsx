import HomeLayout from "../component/shared/HomeLayout";

function Notifications() {
  return (
    <HomeLayout>
      <p className="text-[40px] semibold">Notifications</p>
      <div className="bg-white rounded-[8px] mt-5">
        <div className="p-8 border-b border-[#F5F4F9]">
          <p className="text-[13px] regular text-[#666C7E]">
            <span className="bold text-[#333342]">New Gurukul</span> prayer
            audio uploaded
          </p>
          <p className="text-[13px] regular text-[#666C7E]">5 days ago</p>
        </div>
        <div className="p-8 border-b border-[#F5F4F9]">
          <p className="text-[13px] regular text-[#666C7E]">
            New event added
            <span className="bold text-[#333342]"> School trip</span>
          </p>
          <p className="text-[13px] regular text-[#666C7E]">1 month ago</p>
        </div>
        <div className="p-8 border-b border-[#F5F4F9]">
          <p className="text-[13px] regular text-[#666C7E]">
            Congratulations! Successful
            <span className="bold text-[#333342]"> re-registration</span>
          </p>
          <p className="text-[13px] regular text-[#666C7E]">1 month ago</p>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Notifications;
