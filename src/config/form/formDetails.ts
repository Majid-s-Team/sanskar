export const formDetailsForm = [
  // {
  //   title: "Form Type",
  //   name: "form_type",
  //   rules: [{ required: true, message: "Please input form type!" }],
  //   type: "text",
  // },
  {
    title: "Absence Request for *",
    name: "name",
    rules: [{ required: true, message: "Please input absence request for!" }],
    type: "text",
  },
  {
    title: "From Date *",
    name: "from_date",
    rules: [{ required: true, message: "Please input your from date!" }],
    type: "date",
  },
  {
    title: "To Date *",
    name: "to_date",
    rules: [{ required: true, message: "Please input your to date!" }],
    type: "date",
  },
  {
    title: "Absence Reason *",
    name: "absent_reason",
    rules: [{ required: true, message: "Please input your absence reason!" }],
    type: "textarea",
  },
];
