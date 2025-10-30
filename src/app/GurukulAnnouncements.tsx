import HomeLayout from "../component/shared/HomeLayout";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import { useRequest } from "../hooks";
import dayjs from "dayjs";

// const announcement = [
//   {
//     icon: "/icons/ball1.png",
//     title: "Sports Day Announcement",
//     description:
//       "The school's Annual Sports Day will be held on May 12, 2024. Mark your calendars!",
//   },
//   {
//     icon: "/icons/ball2.png",
//     title: "Summer Break Start Date",
//     description:
//       "Summer break begins on May 25, 2024. Have a wonderful holiday!",
//   },
//   {
//     icon: "/icons/ball1.png",
//     title: "Sports Day Announcement",
//     description:
//       "The school's Annual Sports Day will be held on May 12, 2024. Mark your calendars!",
//   },
//   {
//     icon: "/icons/ball2.png",
//     title: "Summer Break Start Date",
//     description:
//       "Summer break begins on May 25, 2024. Have a wonderful holiday!",
//   },
// ];

function GurukulAnnouncements() {
  const { data, loading } = useRequest<any>("/admins-annoucement", "GET", {
    type: "mount",
  });

  const announcement = data.filter((item: any) => item.teacher_id === null);

  return (
    <HomeLayout loading={loading}>
      <div className="bg-white p-5 rounded-[24.59px]">
        <div className="flex lg:flex-row flex-col justify-between lg:items-center">
          <p className="text-[30px] semibold">Gurukul Announcements</p>
        </div>
        {announcement?.length > 0 ? (
          announcement?.map((form: any, index: number) => {
            return (
              <div
                key={index}
                className="flex items-center justify-between gap-5 mt-5 border border-[#ECECEC] p-2 rounded-[20px]"
              >
                <div className="flex items-center gap-5">
                  <img className="w-[50px]" src={"/icons/ball2.png"} alt="" />
                  <div>
                    <p className="text-[14px] medium capitalize">
                      {form.title}
                    </p>
                    <p className="text-[12px] text-[#969696] regular capitalize">
                      {form.description}
                    </p>
                  </div>
                </div>
                <div className="text-right mr-4">
                  <p className="text-[14px] regular">
                    {dayjs(form.created_at).format("MM-DD-YYYY")}
                  </p>
                  <p className="text-[13px] text-[#969696] regular">
                    {dayjs(form.created_at).format("hh:mm A")}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-[18px] text-[#969696] regular text-center h-[70vh] flex items-center justify-center">
            No announcement available.
          </p>
        )}
        {/* <Pagination
          onChange={(page: number, pageSize: number) =>
            onPaginationChange({ current: page, pageSize })
          }
          {...pagination}
          className="mt-5 flex justify-end"
        /> */}
      </div>
    </HomeLayout>
  );
}

export default withAuthGuard(GurukulAnnouncements);
