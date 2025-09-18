import dayjs from "dayjs";

export const myClassColumns = (handleViewDetails: any) => [
  {
    title: "Week #",
    dataIndex: "id",
  },
  {
    title: "Date",
    dataIndex: "date",
    render: (text: string) => <p>{dayjs(text).format("DD-MM-YYYY")}</p>,
  },
  {
    title: "Description",
    dataIndex: "description",
    // render: () => (
    //   <p className="text-[#48B3FF] underline medium">View Details</p>
    // ),
  },
  {
    title: "Download",
    dataIndex: "media",
    render: (media: any) => (
      <div className="flex gap-5 justify-center items-center">
        <div className="space-y-2">
          {media.map((item: any) => {
            return (
              <div className="flex justify-between items-center gap-5">
                <div className="flex items-center gap-1">
                  <img className="w-[30px]" src="/icons/pdf.png" alt="" />
                  <div>
                    <p className="text-[12px] medium text-black truncate w-[100px]">
                      {item.name || "Class Update Form"}
                    </p>
                    {/* <p className="text-[10px] regular">28 Oct 2023 | 122 MB</p> */}
                  </div>
                </div>
                <img
                  className="w-[20px] h-[20px] cursor-pointer"
                  src="/icons/download-orange.png"
                  // onClick={() => handleDownload(item.url, item.name)}
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
        {/* <div className="flex items-center gap-3">
          <img className="w-[30px]" src="/icons/pdf.png" alt="" />
          <div>
            <p className="text-[12px] medium text-black">Class Update Form</p>
            <p className="text-[10px] regular">28 Oct 2023 | 122 MB</p>
          </div>
        </div> */}
      </div>
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (_: any) => (
      <div className="flex gap-5 justify-center">
        {/* <Dropdown
          menu={{
            items: [
              // {
              //   key: "1",
              //   label: <p className="text-[#000]">View</p>,
              // },
              {
                key: "2",
                label: (
                  <Link to={`/add-weekly-updates/edit/${record.id}`}>Edit</Link>
                ),
              },
              {
                key: "3",
                label: <p className="text-[#000]">Delete</p>,
              },
            ],
          }}
        >
          <img
            className="w-[24px] h-[24px] cursor-pointer"
            src="/icons/dots.png"
            alt=""
          />
        </Dropdown> */}
        <img
          className="w-[24px] h-[24px] cursor-pointer"
          src="/icons/dots.png"
          alt=""
        />
      </div>
    ),
  },
];

export const myClassData = [
  {
    week_number: 1,
    date: "12 May 2024",
    description: "Introduction to the course",
    download: "", // this field is not actually used in the render function
  },
  {
    week_number: 2,
    date: "12 May 2024",
    description: "Course overview and objectives",
    download: "", // this field is not actually used in the render function
  },
  {
    week_number: 3,
    date: "12 May 2024",
    description: "Module 1: Introduction to topic A",
    download: "", // this field is not actually used in the render function
  },
  {
    week_number: 4,
    date: "12 May 2024",
    description: "Module 2: Topic B and C",
    download: "", // this field is not actually used in the render function
  },
  {
    week_number: 5,
    date: "12 May 2024",
    description: "Module 3: Topic D and E",
    download: "", // this field is not actually used in the render function
  },
];
