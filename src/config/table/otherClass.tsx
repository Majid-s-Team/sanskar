import { Popconfirm } from "antd";
import dayjs from "dayjs";
import { FolderArchive } from "lucide-react";

type Props = {
  handleDownload: (url: string, name: string) => void;
  handleViewDetails: (data: any) => void;
  handleArchive: (id: string) => void;
};

export const otherClassColumns = ({
  handleDownload,
  handleViewDetails,
  handleArchive,
}: Props) => [
  {
    title: "Week #",
    dataIndex: "week_number",
  },
  {
    title: "Date",
    dataIndex: "date",
    render: (text: string) => (
      <p className="w-[100px]">{dayjs(text).format("MM-DD-YYYY")}</p>
    ),
  },
  {
    title: "Description",
    dataIndex: "description",
    align: "center",
    render: (text: any) => <p className="capitalize text-center">{text}</p>,
    // render: () => (
    //   <p className="text-[#48B3FF] underline medium">View Details</p>
    // ),
  },
  {
    title: "Class",
    dataIndex: "title",
  },
  {
    title: "Download",
    dataIndex: "media",
    render: (media: any) => (
      <div className="flex gap-5 justify-center items-center w-[250px]">
        <div className="space-y-2">
          {media.map((item: any) => {
            return (
              <div className="flex justify-between items-center gap-5">
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
  {
    title: "Actions",
    dataIndex: "action",
    render: (_: any, record: any) => (
      <div className="flex gap-5 justify-center items-center">
        <Popconfirm
          title="Are you sure you want to archive this class update?"
          onConfirm={() => handleArchive(record.id)}
        >
          <FolderArchive size={22} className="cursor-pointer" />
        </Popconfirm>
      </div>
    ),
  },
];

export const otherClassData = [
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
