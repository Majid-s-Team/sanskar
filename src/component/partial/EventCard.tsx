export default function EventCard() {
  return (
    <div className="bg-[#D57D25] lg:h-[255px] p-5 rounded-[20px] flex items-center lg:flex-row flex-col gap-8">
      <img className="w-[426px]" src="/images/img.png" alt="" />
      <div>
        <p className="text-white text-[30px] semibold">Visit to Tech Musuem</p>
        <div className="space-y-2 mt-5">
          <div className="flex gap-2 items-center">
            <img className="w-[30px]" src="/icons/date.png" alt="" />
            <p className="text-[#f7e5d4] text-[20px]">28 May,2025</p>
          </div>
          <div className="flex gap-2 items-center">
            <img className="w-[30px]" src="/icons/time.png" alt="" />
            <p className="text-[#f7e5d4] text-[20px]">4:30 PM - 7:00 PM</p>
          </div>
          <div className="flex gap-2 items-center">
            <img className="w-[30px]" src="/icons/address.png" alt="" />
            <p className="text-[#f7e5d4] text-[20px]">XYZ Hall, QZR Street</p>
          </div>
          <div className="flex gap-2 items-center">
            <img className="w-[30px]" src="/icons/date.png" alt="" />
            <p className="text-[#f7e5d4] text-[20px]">
              RSVP Due Date - 22 May,2025{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
