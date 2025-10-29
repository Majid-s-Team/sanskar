export const studentReportColumns = () => {
  return [
    {
      title: "Name",
      dataIndex: "student",
      render: (text: any) => (
        <p className="capitalize">{text?.first_name + " " + text?.last_name}</p>
      ),
    },
    {
      title: "Student ID",
      dataIndex: "student",
      render: (text: any) => <p className="capitalize">{text?.id}</p>,
    },
    {
      title: "# of Tardies",
      dataIndex: "tardies",
    },
    {
      title: "# of Absences",
      dataIndex: "absences",
    },
    {
      title: "# of Presence",
      dataIndex: "presences",
    },
    {
      title: "Participation Points",
      dataIndex: "participation_points",
      render: (text: any) => <p>{text}</p>,
    },
    {
      title: "Homework Points",
      dataIndex: "homework_points",
      render: (text: any) => <p>{text}</p>,
    },
    // {
    //   title: "Contact Info",
    //   dataIndex: "contact_info",
    //   render: (_: any, record: any) => (
    //     <p
    //       onClick={() => handleDetails(record.student)}
    //       className="text-[#48B3FF] underline text-[14px] semibold cursor-pointer"
    //     >
    //       View Details
    //     </p>
    //   ),
    // },
  ];
};
