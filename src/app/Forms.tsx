import { Link } from "react-router-dom";
import HomeLayout from "../component/shared/HomeLayout";
import { getStorageData } from "../helper";

const forms = [
  {
    title: "Absent Request Form",
    date: "28 Oct 2023 | 122 MB",
    icon: "/icons/pdf.png",
    path: "/forms/absent-request-form",
  },
  {
    title: "Early Pick-up Request Form",
    date: "28 Oct 2023 | 122 MB",
    icon: "/icons/card.png",
    path: "/forms/early-pickup-form",
  },
  {
    title: "Sibling Enrollment Request Form",
    date: "28 Oct 2023 | 122 MB",
    icon: "/icons/wallet.png",
    path: "/forms/sibling-enrollment-form",
  },
];

const forms2 = [
  {
    title: "Absent Request Form",
    date: "28 Oct 2023 | 122 MB",
    icon: "/icons/pdf.png",
    path: "/forms/absent-request-form",
  },
  {
    title: "Arts and Craft Project Request Form",
    date: "28 Oct 2023 | 122 MB",
    icon: "/icons/card.png",
    path: "/forms/arts-and-craft-project-form",
  },
  {
    title: "Expense Reimbursement Form",
    date: "28 Oct 2023 | 122 MB",
    icon: "/icons/wallet.png",
    path: "/forms/expense-reimbursement-form",
  },
];

function Forms() {
  const role = getStorageData("role");
  return (
    <HomeLayout>
      <div className="bg-white p-5 rounded-[24.59px]">
        <p className="text-[40px] semibold">Forms</p>
        {(role === "parent" ? forms : forms2).map((form, index) => {
          return (
            <Link
              to={form.path}
              key={index}
              className="flex items-center gap-5 mt-5 border border-[#ECECEC] p-5 rounded-[20px]"
            >
              <img className="w-[50px]" src={form.icon} alt="" />
              <div>
                <p className="text-[16px] semibold !text-black">{form.title}</p>
                <p className="text-[14px] text-[#A6A6A6] regular">
                  {form.date}
                </p>
              </div>
              <div className="flex-1"></div>
              <img className="w-[20px]" src="/icons/dot.png" alt="" />
            </Link>
          );
        })}
      </div>
    </HomeLayout>
  );
}

export default Forms;
