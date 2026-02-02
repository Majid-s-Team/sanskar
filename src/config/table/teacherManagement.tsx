import { Avatar } from "antd";
import { TeachersType } from "../../types";

// type Props = {
//   setOpen: Dispatch<SetStateAction<boolean>>;
//   setRecord: Dispatch<SetStateAction<any | null>>;
//   handleDelete: (id: string) => void;
//   handleChangeStatus?: (id: number, status: boolean) => void;
// };

export const teacherManagementColumns = [
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
      <p className="capitalize">{record?.full_name}</p>
    ),
  },
  {
    title: "Gurukul Class Name",
    // dataIndex: "gurukal",
    // render: (text: any) => <p>{text?.name}</p>,
    dataIndex: "teacher",
    render: (record: TeachersType) => (
      <p className="capitalize">{record?.gurukal?.name}</p>
    ),
  },
  {
    title: "Email",
    // dataIndex: "user",
    // render: (text: any) => <p>{text?.primary_email}</p>,
    dataIndex: "teacher",
    render: (record: TeachersType) => (
      <p className="capitalize">{record?.user?.primary_email}</p>
    ),
  },
  {
    title: "Phone Number",
    // dataIndex: "phone_number",
    dataIndex: "teacher",
    render: (record: TeachersType) => (
      <p className="capitalize">{record?.phone_number}</p>
    ),
  },
  {
    title: "House Name",
    dataIndex: "teacher",
    render: (record: TeachersType) => {
      return <p className="capitalize">{record?.house?.name || "-"}</p>;
    },
  },
  // {
  //   title: "Image",
  //   dataIndex: "profile_picture",
  //   render: (text: string) => <Avatar size={50} src={text} />,
  // },
  // {
  //   title: "Teacher Name",
  //   dataIndex: "full_name",
  // },
  // {
  //   title: "Gurukul Class Name",
  //   dataIndex: "gurukal",
  //   render: (text: any) => <p>{text?.name}</p>,
  // },
  // {
  //   title: "Email",
  //   dataIndex: "user",
  //   render: (text: any) => <p>{text?.primary_email}</p>,
  // },
  // {
  //   title: "Phone Number",
  //   dataIndex: "phone_number",
  // },
  // {
  //   title: "House Name",
  //   dataIndex: "house",
  //   render: (text: any) => <p>{text?.name || "-"}</p>,
  // },
];
