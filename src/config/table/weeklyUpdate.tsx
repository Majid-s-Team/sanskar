import dayjs from "dayjs";

export const weeklyUpdateColumns = (
  handleDownload: any,
  handleViewDetails: any
) => [
  {
    title: "Week #",
    dataIndex: "created_at",
    render: (text: string) => <p>{dayjs(text)?.week()}</p>,
  },
  {
    title: "Date",
    dataIndex: "date",
    render: (text: string) => (
      <p className="w-[100px]">{dayjs(text).format("DD-MM-YYYY")}</p>
    ),
  },
  {
    title: "Description",
    dataIndex: "description",
    // render: () => (
    //   <p className="text-[#48B3FF] underline medium">View Details</p>
    // ),
  },
  // {
  //   title: "Download",
  //   dataIndex: "download",
  //   render: () => (
  //     <div className="flex gap-5 justify-center">
  //       <div className="flex items-center gap-3">
  //         <img className="w-[30px]" src="/icons/pdf.png" alt="" />
  //         <div>
  //           <p className="text-[12px] medium text-black">Class Update Form</p>
  //           <p className="text-[10px] regular">28 Oct 2023 | 122 MB</p>
  //         </div>
  //       </div>
  //       <img
  //         className="w-[20px] h-[20px] cursor-pointer"
  //         src="/icons/download-orange.png"
  //         alt=""
  //       />
  //       <img
  //         className="w-[24px] h-[24px] cursor-pointer"
  //         src="/icons/eye.png"
  //         alt=""
  //       />
  //     </div>
  //   ),
  // },
  {
    title: "Download",
    dataIndex: "media",
    render: (media: any) => (
      <div className="flex gap-5 justify-center w-[250px]">
        <div className="space-y-2">
          {media.map((item: any) => {
            return (
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                  <img className="w-[30px]" src="/icons/pdf.png" alt="" />
                  <div>
                    <p className="text-[12px] medium text-black truncate w-[100px] text-left">
                      {item.name || "Class Update Form"}
                    </p>
                    {/* <p className="text-[10px] regular">28 Oct 2023 | 122 MB</p> */}
                  </div>
                </div>
                <img
                  className="w-[20px] h-[20px] cursor-pointer"
                  src="/icons/download-orange.png"
                  onClick={() => handleDownload(item.url, item.name)}
                  alt=""
                />
                <img
                  className="w-[24px] h-[24px] cursor-pointer"
                  src="/icons/eye.png"
                  onClick={() => handleViewDetails(item.url)}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      </div>
    ),
  },
];

export const weeklyUpdateData = [
  {
    week_number: 1,
    date: "12 May 2024",
    description: "Introduction to the course",
    class: "English",
  },
  {
    week_number: 2,
    date: "12 May 2024",
    description: "Course overview and objectives",
    class: "Maths",
  },
  {
    week_number: 3,
    date: "12 May 2024",
    description: "Module 1: Introduction to topic A",
    class: "Physics",
  },
  {
    week_number: 4,
    date: "12 May 2024",
    description: "Module 2: Topic B and C",
    class: "Chemistry",
  },
  {
    week_number: 5,
    date: "12 May 2024",
    description: "Module 3: Topic D and E",
    class: "History",
  },
];
