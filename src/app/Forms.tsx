import HomeLayout from "../component/shared/HomeLayout";

const forms = [
  {
    title: "Absent Request Form",
    date: "28 Oct 2023 | 122 MB",
    icon: "/icons/pdf.png",
    path: "/absent-request-form",
  },
  {
    title: "Early Pick-up Request Form",
    date: "28 Oct 2023 | 122 MB",
    icon: "/icons/card.png",
    path: "/early-pickup-form",
  },
  {
    title: "Sibling Enrollment Request Form",
    date: "28 Oct 2023 | 122 MB",
    icon: "/icons/wallet.png",
    path: "/sibling-enrollment-form",
  },
];

function Forms() {
  return (
    <HomeLayout>
      <div className="bg-white p-5 rounded-[24.59px]">
        <p className="text-[30px] semibold">Forms</p>
        {forms.map((form, index) => {
          return (
            <div
              key={index}
              className="flex items-center gap-5 mt-5 border border-[#ECECEC] p-5 rounded-[20px]"
            >
              <img className="w-[50px]" src={form.icon} alt="" />
              <div>
                <p className="text-[16px] semibold">{form.title}</p>
                <p className="text-[14px] text-[#A6A6A6] regular">
                  {form.date}
                </p>
              </div>
              <div className="flex-1"></div>
              <img className="w-[20px]" src="/icons/dot.png" alt="" />
            </div>
          );
        })}
      </div>
    </HomeLayout>
  );
}

export default Forms;
