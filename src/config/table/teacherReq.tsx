import { Avatar } from "antd";
import { TeachersType } from "../../types";

type Props = {
  handleRecord: (record: any) => void;
};

export const teacherRequestColumns = ({ handleRecord }: Props) => [
  {
    title: "Image",
    dataIndex: "teacher",
    render: (text: TeachersType) => (
      <Avatar size={50} src={text?.profile_picture} />
    ),
  },
  {
    title: "Teacher Name",
    dataIndex: "teacher",
    render: (record: TeachersType) => (
      <p className="capitalize text-left">{record?.full_name}</p>
    ),
  },
  {
    title: "Gurukul Class Name",
    dataIndex: "teacher",
    render: (record: TeachersType) => (
      <p className="capitalize">{record?.gurukal?.name}</p>
    ),
  },
  {
    title: "Email",
    dataIndex: "teacher",
    render: (record: TeachersType) => (
      <p className="capitalize">{record?.user?.primary_email}</p>
    ),
  },
  {
    title: "Phone Number",
    dataIndex: "teacher",
    render: (record: TeachersType) => (
      <p className="capitalize">{record?.phone_number}</p>
    ),
  },
  {
    title: "House Name",
    dataIndex: "teacher",
    render: (record: TeachersType) => (
      <p className="capitalize">{record?.house?.name}</p>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (_: any, record: any) => (
      <div className="flex gap-5 items-center justify-center">
        <img
          className="w-[24px] cursor-pointer"
          onClick={() => handleRecord(record)}
          src="/icons/eye.png"
          alt=""
        />
        {/* <Popconfirm
          title="Are you sure you want to delete this request?"
          onConfirm={() => handleDelete(record?.id as string)}
        >
          <DeleteFilled className="text-[18px] cursor-pointer" />
        </Popconfirm> */}
      </div>
    ),
  },
];
