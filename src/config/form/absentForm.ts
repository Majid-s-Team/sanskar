export const absentForm = [
  {
    title: "Absence Request for *",
    name: "absence_request_for",
    placeholder: "chose child",
    rules: [{ required: true, message: "Please chose your child!" }],
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
    title: "Class Name",
    name: "class_name",
    rules: [{ required: true, message: "Please select your class!" }],
    type: "select",
    options: [
      {
        label: "Class 1",
        value: "class1",
      },
      {
        label: "Class 2",
        value: "class2",
      },
    ],
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
    name: "absence_reason",
    rules: [{ required: true, message: "Please input your absence reason!" }],
    type: "textarea",
  },
];
