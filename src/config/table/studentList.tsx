import { Avatar } from "antd";
import dayjs from "dayjs";

export const studentListColumns = [
  {
    title: "Image",
    dataIndex: "student",
    render: (text: any) => <Avatar size={60} src={text?.profile_image} />,
  },
  {
    title: "Student Name",
    dataIndex: "student",
    render: (text: any) => (
      <p className="capitalize">{text?.first_name + " " + text?.last_name}</p>
    ),
  },
  {
    title: "House Name",
    dataIndex: "student",
    render: (text: any) => (
      <p className="capitalize">{text?.house?.name || "-"}</p>
    ),
  },
  {
    title: "Date of Birth (DOB)",
    dataIndex: "student",
    render: (text: any) => <p>{dayjs(text?.dob).format("MM-DD-YYYY")}</p>,
  },
  {
    title: "Book Club",
    dataIndex: "student",
    render: (text: any) => <p>{text?.join_the_club ? "Yes" : "No"}</p>,
  },
  {
    title: "Hobbies/Interests",
    dataIndex: "student",
    render: (text: any) => <p>{text?.hobbies_interest}</p>,
  },
  // {
  //   title: "House",
  //   dataIndex: "house",
  // },
  {
    title: "School Name",
    dataIndex: "student",
    render: (text: any) => <p>{text?.school_name}</p>,
  },
  {
    title: "Contact Phone & Email",
    dataIndex: "student",
    render: (text: any) => (
      <div>
        <p>{text?.student_mobile_number}</p>
        <p>{text?.student_email}</p>
      </div>
    ),
  },
];

export const studentListData = [
  {
    name: "John Doe",
    date_of_birth: "12 May 2024",
    hobbies: "Playing soccer, reading books",
    house: "Atharva Veda",
    school_name: "Springfield Elementary",
    contact_info: "123-456-7890",
  },
  {
    name: "Jane Smith",
    date_of_birth: "12 May 2024",
    hobbies: "Dancing, drawing",
    house: "Rig Veda",
    school_name: "Springfield Elementary",
    contact_info: "jane.smith@example.com",
  },
  {
    name: "Bob Johnson",
    date_of_birth: "12 May 2024",
    hobbies: "Playing basketball, playing video games",
    house: "Sama Veda",
    school_name: "Springfield Elementary",
    contact_info: "555-123-4567",
  },
  {
    name: "Alice Brown",
    date_of_birth: "12 May 2024",
    hobbies: "Playing tennis, listening to music",
    house: "Yajur Veda",
    school_name: "Springfield Elementary",
    contact_info: "901-234-5678",
  },
  // {
  //   name: "Mike Davis",
  //   date_of_birth: "12 May 2024",
  //   hobbies: "Playing football, watching movies",
  //   house: "Red House",
  //   school_name: "Springfield Elementary",
  //   contact_info: "mike.davis@example.com",
  // },
];
