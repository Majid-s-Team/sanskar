import { Popconfirm } from "antd";
import dayjs from "dayjs";

type Props = {
  handleDownload: (url: string, name: string) => void;
  handleViewDetails: (data: any) => void;
  handleUnArchive: (id: string) => void;
};

export const archivedColumns = ({
  handleDownload,
  handleViewDetails,
  handleUnArchive,
}: Props) => [
  {
    title: "Week #",
    dataIndex: "week_number",
    // render: (text: string) => <p>{dayjs(text)?.week()}</p>,
  },
  {
    title: "Date",
    dataIndex: "date",
    render: (text: string) => <p>{dayjs(text).format("MM-DD-YYYY")}</p>,
  },
  {
    title: "Class",
    dataIndex: "title",
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
    title: "Download",
    dataIndex: "media",
    render: (media: any[]) => (
      <div className="flex gap-5 justify-center w-[250px]">
        {media.length === 0 ? (
          <p>No files found</p>
        ) : (
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
        )}
      </div>
    ),
  },
  {
    title: "Actions",
    dataIndex: "action",
    render: (_: any, record: any) => (
      <div className="flex gap-5 justify-center items-center">
        <Popconfirm
          title="Are you sure you want to unarchive this class update?"
          onConfirm={() => handleUnArchive(record.id)}
        >
          {/* <ArchiveRestore size={22} className="cursor-pointer" /> */}
          <img
            className="w-[22px] cursor-pointer"
            src="/icons/unarchive.png"
            alt=""
          />
        </Popconfirm>
      </div>
    ),
  },
];

export const archivedData = [
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
    class: "English",
  },
  {
    week_number: 3,
    date: "12 May 2024",
    description: "Module 1: Introduction to topic A",
    class: "English",
  },
  {
    week_number: 4,
    date: "12 May 2024",
    description: "Module 2: Topic B and C",
    class: "English",
  },
  {
    week_number: 5,
    date: "12 May 2024",
    description: "Module 3: Topic D and E",
    class: "English",
  },
];
