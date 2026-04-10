import { Button } from "antd";
import HomeLayout from "../component/shared/HomeLayout";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import { useRequest } from "../hooks";
import { useState } from "react";
import ViewDetails from "../component/shared/ViewDetails";

type CalendarItem = {
  id: number;
  title: string;
  description: string;
  media_url?: string;
};

function Calendar() {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState<any>();
  const { data: calendar, loading } = useRequest<CalendarItem[]>(
    "/gurukal-calendar",
    "GET",
    {
      type: "mount",
    },
  );

  const handleDownload = (url: string, name: string) => {
    const link = Object.assign(document.createElement("a"), {
      href: url,
      target: "_blank",
      download: name,
    });
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleViewDetails = (item: any) => {
    setOpen(true);
    setDetails(item);
  };

  return (
    <HomeLayout loading={loading}>
      <div className="bg-white lg:p-10 p-5 rounded-[24.59px] h-full">
        <p className="text-[40px] semibold">Calendar</p>
        <p className="text-[32px] semibold my-5">Gurukal Calendar</p>
        {calendar?.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            No calendar available
          </div>
        ) : (
          calendar?.map((form, index) => (
            <div
              key={form.id || index}
              className="flex items-center justify-between gap-5 mt-5 border border-[#ECECEC] p-5 rounded-[24px]"
            >
              {/* Left */}
              <div className="flex items-center gap-5">
                <img className="w-[50px]" src={"/icons/card.png"} alt="" />
                <div>
                  <p className="text-[16px] semibold !text-black">
                    {form.title}
                  </p>
                  <p className="text-[14px] text-[#A6A6A6] regular">
                    {form.description}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <img
                  className="w-[28px] cursor-pointer"
                  src="/icons/eye.png"
                  alt=""
                  onClick={() => handleViewDetails(form.media_url)}
                />
                <Button
                  onClick={() =>
                    handleDownload(form.media_url!, "gurukal calendar")
                  }
                  className={`rounded-[12px] !bg-[#D57D25] h-[40px] red-medium !text-white border-0 text-[12px] semibold`}
                  icon={
                    <img
                      className="w-[20px]"
                      src="/icons/download.png"
                      alt=""
                    />
                  }
                >
                  Download Now
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
      {open && (
        <ViewDetails
          open={open}
          onClose={() => setOpen(false)}
          data={details}
        />
      )}
    </HomeLayout>
  );
}

export default withAuthGuard(Calendar);
