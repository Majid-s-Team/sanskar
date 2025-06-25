export const archivedColumns = [
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Week #",
    dataIndex: "week_number",
  },
  {
    title: "Class",
    dataIndex: "class",
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Download",
    dataIndex: "download",
    render: () => (
      <div className="flex gap-5">
        <div className="flex items-center gap-3">
          <img className="w-[30px]" src="/icons/pdf.png" alt="" />
          <div>
            <p className="text-[12px] medium text-black">Class Update Form</p>
            <p className="text-[10px] regular">28 Oct 2023 | 122 MB</p>
          </div>
        </div>
        <img
          className="w-[20px] h-[20px] cursor-pointer"
          src="/icons/download-orange.png"
          alt=""
        />
        <img
          className="w-[24px] h-[24px] cursor-pointer"
          src="/icons/eye.png"
          alt=""
        />
      </div>
    ),
  },
];

export const archivedData = [
  {
    week_number: 1,
    date: "2023-10-01",
    description: "Introduction to the course",
    download: "", // this field is not actually used in the render function
  },
  {
    week_number: 2,
    date: "2023-10-08",
    description: "Course overview and objectives",
    download: "", // this field is not actually used in the render function
  },
  {
    week_number: 3,
    date: "2023-10-15",
    description: "Module 1: Introduction to topic A",
    download: "", // this field is not actually used in the render function
  },
  {
    week_number: 4,
    date: "2023-10-22",
    description: "Module 2: Topic B and C",
    download: "", // this field is not actually used in the render function
  },
  {
    week_number: 5,
    date: "2023-10-29",
    description: "Module 3: Topic D and E",
    download: "", // this field is not actually used in the render function
  },
];
