export const projectForm = [
  {
    title: "Class Name",
    name: "class_name",
    rules: [{ required: true, message: "Please select your class!" }],
    type: "text",
  },
  {
    title: "Students Count (total)",
    name: "students_count",
    rules: [{ required: true, message: "Please input your students count!" }],
    type: "number",
  },
  {
    title: "Sevak",
    name: "sevak",
    rules: [{ required: true, message: "Please input your sevak!" }],
    type: "text",
  },
  {
    title: "Sevak 2",
    name: "sevak_2",
    optional: true,
    rules: [{ required: true, message: "Please input your sevak 2!" }],
    type: "text",
  },
  {
    title: "Target Date",
    name: "target_date",
    // placeholder: "Name",
    rules: [{ required: true, message: "Please input your target date!" }],
    type: "date",
  },
  {
    title: "Craft Goal and/or Description",
    name: "craft_goal_and_or_description",
    // placeholder: "Name",
    rules: [{ required: true, message: "Please input your craft goal!" }],
    type: "textarea",
  },
];

export const projectForm1 = [
  {
    title: "Craft Need",
    name: "craft_need",
    rules: [{ required: true, message: "Please input your craft need!" }],
    type: "text",
  },
  {
    title: "Grade",
    name: "grade",
    rules: [{ required: true, message: "Please select your grade!" }],
    type: "select",
    options: [
      {
        label: "A",
        value: "A",
      },
      {
        label: "B",
        value: "B",
      },
      {
        label: "C",
        value: "C",
      },
      {
        label: "D",
        value: "D",
      },
    ],
  },
];

export const projectForm2 = [
  {
    title: "Phone Number",
    name: "phone_number",
    rules: [{ required: true, message: "Please input your phone number!" }],
    type: "text",
  },
  {
    title: "Email",
    name: "email",
    rules: [{ required: true, message: "Please input your email!" }],
    type: "text",
  },
  {
    title: "Phone Number",
    optional: true,
    name: "phone_number2",
    rules: [{ required: true, message: "Please input your phone number!" }],
    type: "text",
  },
  {
    title: "Email",
    optional: true,
    name: "email2",
    rules: [{ required: true, message: "Please input your email!" }],
    type: "text",
  },
];

export const projectForm3 = [
  {
    title: "Flexibility",
    name: "flexibility",
    rules: [{ required: true, message: "Please select your flexibility!" }],
    type: "radio",
    options: [
      {
        label: "Yes",
        value: "yes",
      },
      {
        label: "No",
        value: "no",
      },
    ],
  },
  {
    title: "Reason",
    name: "reason",
    rules: [{ required: true, message: "Please input your reason!" }],
    type: "textarea",
  },
];
