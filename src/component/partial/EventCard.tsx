import { Link } from "react-router-dom";

const eventDetails = {
  title: "Visit to Tech Museum",
  date: "28 May, 2025",
  time: "4:30 PM - 7:00 PM",
  address: "XYZ Hall, QZR Street",
  rsvp: "RSVP Due Date - 22 May, 2025",
};

const IconText = ({ icon, text }: { icon: string; text: string }) => (
  <div className="flex gap-2 items-center">
    <img className="w-[30px]" src={icon} alt="" />
    <p className="text-[#f7e5d4] text-[20px] medium">{text}</p>
  </div>
);

export const EventCard = ({
  isPast,
  isMy,
}: {
  isPast: boolean;
  isMy: boolean;
}) => (
  <Link
    to="/event/details"
    style={{ boxShadow: "0px 14.26px 21.39px 0px #00000029" }}
    className="bg-[#D57D25] lg:h-[255px] p-5 rounded-[20px] flex items-center lg:flex-row flex-col gap-8"
  >
    <img className="w-[426px]" src="/images/img.png" alt="" />
    <div>
      <p className="text-white text-[30px] semibold">{eventDetails.title}</p>
      <div className="space-y-2 mt-2">
        {isPast ? (
          <IconText icon="/icons/check.png" text="Attended" />
        ) : (
          <>
            <IconText icon="/icons/date.png" text={eventDetails.date} />
            <IconText icon="/icons/time.png" text={eventDetails.time} />
            <IconText icon="/icons/address.png" text={eventDetails.address} />
            <IconText icon="/icons/date.png" text={eventDetails.rsvp} />
            {isMy && <IconText icon="/icons/check.png" text="Attending" />}
          </>
        )}
      </div>
    </div>
  </Link>
);
