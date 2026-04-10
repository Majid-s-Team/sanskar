import { useRequest } from "../../hooks/useRequest";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../component/shared/CustomButton";
import { Spin } from "antd";

type CalendarItem = {
  id: number;
  title: string;
  description: string;
  media_url?: string;
};

export default function GurukalCalendar() {
  const navigate = useNavigate();

  const { data: calendar, loading } = useRequest<CalendarItem[]>(
    "/gurukal-calendar",
    "GET",
    {
      type: "mount",
    },
  );

  return (
    <div className="w-full">
      {/* Calendar List */}
      <div className="max-h-[450px] overflow-y-auto pr-2">
        {loading ? (
          <div className="flex justify-center items-center h-[200px]">
            <Spin size="large" />
          </div>
        ) : calendar?.length === 0 ? (
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
                <img
                  className="w-[50px]"
                  src="/icons/card.png"
                  alt="calendar"
                />

                <div>
                  <p className="text-[16px] semibold text-black">
                    {form.title}
                  </p>

                  <p className="text-[14px] text-[#A6A6A6] regular">
                    {form.description}
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="flex gap-3 items-center">
                {/* Download */}
                {form.media_url && (
                  <a
                    href={form.media_url}
                    download
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="w-[20px] cursor-pointer"
                      src="/icons/download-orange.png"
                      alt="download"
                    />
                  </a>
                )}

                {/* View */}
                {form.media_url && (
                  <a href={form.media_url} target="_blank" rel="noreferrer">
                    <img
                      className="w-[24px] mb-[-5px] cursor-pointer"
                      src="/icons/eye.png"
                      alt="view"
                    />
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Button */}
      <div className="flex justify-center mt-10">
        <CustomButton
          onClick={() => navigate("/home/gurukul-announcements")}
          title="Gurukul Announcements"
        />
      </div>
    </div>
  );
}
