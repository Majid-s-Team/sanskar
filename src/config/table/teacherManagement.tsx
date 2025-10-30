import { Avatar } from "antd";

// type Props = {
//   setOpen: Dispatch<SetStateAction<boolean>>;
//   setRecord: Dispatch<SetStateAction<any | null>>;
//   handleDelete: (id: string) => void;
//   handleChangeStatus?: (id: number, status: boolean) => void;
// };

export const teacherManagementColumns = [
  {
    title: "Image",
    dataIndex: "profile_picture",
    render: (text: string) => <Avatar size={50} src={text} />,
  },
  {
    title: "Teacher Name",
    dataIndex: "full_name",
  },
  {
    title: "Gurukul Class Name",
    dataIndex: "gurukal",
    render: (text: any) => <p>{text?.name}</p>,
  },
  {
    title: "Email",
    dataIndex: "user",
    render: (text: any) => <p>{text?.primary_email}</p>,
  },
  {
    title: "Phone Number",
    dataIndex: "phone_number",
  },
  {
    title: "House Name",
    dataIndex: "house",
    render: (text: any) => <p>{text?.name || "-"}</p>,
  },
];
