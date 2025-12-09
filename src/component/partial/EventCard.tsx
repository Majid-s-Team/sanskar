import dayjs from "dayjs";
import { Link } from "react-router-dom";

// const eventDetails = {
//   title: "Visit to Tech Museum",
//   date: "28 May, 2025",
//   time: "4:30 PM - 7:00 PM",
//   address: "XYZ Hall, QZR Street",
//   rsvp: "RSVP Due Date - 22 May, 2025",
// };

const IconText = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex gap-2 items-center">
    <img className="w-[30px]" src={icon} alt="" />
    <p className="text-[#f7e5d4] text-[20px] medium">{text}</p>
  </div>
);

export const EventCard = ({
  isPast,
  isMy,
  item,
  status,
}: {
  isPast: boolean;
  isMy: boolean;
  item: any;
  status: number;
}) => (
  <Link
    to={`/event/details/${item?.id}`}
    key={item?.id}
    state={{
      status,
    }}
    style={{ boxShadow: "0px 14.26px 21.39px 0px #00000029" }}
    className="bg-[#D57D25] lg:h-[255px] p-5 rounded-[20px] flex items-center lg:flex-row flex-col gap-8"
  >
    <img
      className="w-[426px] object-cover rounded-[20px] h-[300px]"
      src={item?.banner_image_url || "/images/img.png"}
      alt=""
      style={{ border: "2px solid white" }}
    />
    <div>
      <p className="text-white text-[30px] semibold">{item?.name || ""}</p>
      <div className="space-y-2 mt-2">
        {isPast ? (
          <IconText icon="/icons/check.png" text="Attended" />
        ) : (
          <>
            <IconText
              icon="/icons/date.png"
              text={dayjs(item?.start_at).format("MM-DD-YYYY")}
            />
            <IconText
              icon="/icons/time.png"
              text={`${dayjs(item?.start_at).format("h:mm A")} -
                ${dayjs(item?.end_at).format("h:mm A")}`}
            />
            <IconText icon="/icons/address.png" text={item?.location || ""} />
            <IconText
              icon="/icons/date.png"
              text={dayjs(item?.rsvp_due_date).format("MM-DD-YYYY")}
            />
            {isMy && <IconText icon="/icons/check.png" text="Attending" />}
          </>
        )}
      </div>
    </div>
  </Link>
);
