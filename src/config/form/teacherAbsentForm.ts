export const teacherAbsentForm = [
  {
    title: "From Date",
    name: "from_date",
    rules: [{ required: true, message: "Please input your from date!" }],
    type: "date",
  },
  {
    title: "To Date",
    name: "to_date",
    rules: [{ required: true, message: "Please input your to date!" }],
    type: "date",
  },
  {
    title: "Absence Reason",
    name: "absence_reason",
    rules: [{ required: true, message: "Please input your absence reason!" }],
    type: "textarea",
  },
];
