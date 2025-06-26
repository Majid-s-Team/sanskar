export const addAttendanceForm = [
  {
    title: "Student Name",
    name: "student_name",
    placeholder: "select student",
    rules: [{ required: true, message: "Please select your student!" }],
    type: "select",
    options: [
      {
        label: "Child 1",
        value: "child1",
      },
      {
        label: "Child 2",
        value: "child2",
      },
      {
        label: "Child 3",
        value: "child3",
      },
    ],
  },
  {
    title: "Student ID",
    name: "student_id",
    rules: [{ required: true, message: "Please input student id!" }],
    type: "text",
  },
  {
    title: "Participation Points",
    name: "participation_points",
    rules: [{ required: true, message: "Please input participation points!" }],
    type: "text",
  },
  {
    title: "Homework Points",
    name: "homework_points",
    rules: [{ required: true, message: "Please input homework points!" }],
    type: "text",
  },
  {
    title: "Date",
    name: "date",
    rules: [{ required: true, message: "Please input date!" }],
    type: "date",
  },
  {
    title: "Status",
    name: "status",
    rules: [{ required: true, message: "Please select status!" }],
    type: "select",
    options: [
      {
        label: "Present",
        value: "present",
      },
      {
        label: "Absent",
        value: "absent",
      },
    ],
  },
];
