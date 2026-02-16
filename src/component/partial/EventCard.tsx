import dayjs from "dayjs";
import { Link } from "react-router-dom";

type EventItem = {
  event_status: string;
  id: string;
  name: string;
  banner_image_url?: string;
  start_at: string;
  end_at: string;
  location?: string;
  rsvp_due_date?: string;
};

const IconText = ({
  icon,
  text,
  onClick,
}: {
  icon: string;
  text: string;
  onClick?: (e: React.MouseEvent) => void;
}) => (
  <div
    className="flex gap-2 items-center cursor-pointer"
    onClick={
      onClick
        ? (e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick?.(e);
          }
        : undefined
    }
  >
    <img className="w-[30px]" src={icon} alt="" />
    <p className="text-[#f7e5d4] text-[20px] medium">{text}</p>
  </div>
);

export const EventCard = ({
  isPast,
  isMy,
  item,
  status,
  role,
  viewMember,
}: {
  isPast: boolean;
  isMy: boolean;
  item: EventItem;
  status: number;
  role: string;
  viewMember?: (record: any) => void;
}) => {
  return (
    <Link
      to={`/event/details/${item?.id}`}
      key={item?.id}
      state={{
        status,
      }}
      style={{ boxShadow: "0px 14.26px 21.39px 0px #00000029" }}
      className="bg-[#D57D25] lg:h-[255px] p-5 rounded-[20px] flex lg:items-center lg:flex-row flex-col gap-8"
    >
      <img
        className="w-[426px] object-cover rounded-[20px] h-[300px]"
        src={item?.banner_image_url || "/images/img.png"}
        alt=""
        style={{ border: "2px solid white" }}
      />
      <div>
        <p className="text-white text-[30px] semibold capitalize">
          {item?.name || ""}
        </p>
        {!isPast && (
          <div className="space-y-2 mt-2">
            {/* {isPast ? (
          <IconText icon="/icons/check.png" text="Attended" />
        ) : ( */}
            <>
              <IconText
                icon="/icons/date.png"
                text={dayjs(item?.start_at).format("MM-DD-YYYY")}
              />
              <IconText
                icon="/icons/time.png"
                text={`${dayjs(item?.start_at).format("hh:mm A")} -
                ${dayjs(item?.end_at).format("hh:mm A")}`}
              />
              <IconText icon="/icons/address.png" text={item?.location || ""} />
              <IconText
                icon="/icons/date.png"
                text={
                  item?.rsvp_due_date
                    ? dayjs(item?.rsvp_due_date).format("MM-DD-YYYY")
                    : "-"
                }
              />
              {isMy && (
                <>
                  {role === "user" && (
                    <IconText
                      icon="/icons/check.png"
                      text="View Members"
                      onClick={() => viewMember?.(item)}
                    />
                  )}
                  {role === "teacher" && (
                    <IconText
                      icon="/icons/check.png"
                      text={
                        item.event_status === "not_attending"
                          ? "Not Attending"
                          : "Attending"
                      }
                    />
                  )}
                </>
              )}
            </>
            {/* )} */}
          </div>
        )}
      </div>
    </Link>
  );
};
