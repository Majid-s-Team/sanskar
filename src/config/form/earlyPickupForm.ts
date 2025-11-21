export const earlyPickupForm = [
  {
    title: "Student Name",
    name: "student_id",
    placeholder: "select student",
    rules: [{ required: true, message: "Please chose your student!" }],
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
  // {
  //   title: "Class Name",
  //   name: "class_name",
  //   rules: [{ required: true, message: "Please select your class!" }],
  //   type: "select",
  //   options: [
  //     {
  //       label: "Class 1",
  //       value: "class1",
  //     },
  //     {
  //       label: "Class 2",
  //       value: "class2",
  //     },
  //   ],
  // },
  {
    title: "Date Of Birth",
    name: "dob",
    rules: [{ required: true, message: "Please input your date of birth!" }],
    type: "date",
  },
  {
    title: "Pick-up Time:",
    name: "pickup_time",
    rules: [{ required: true, message: "Please input your pick-up time!" }],
    type: "time",
  },
];

export const earlyPickupForm2 = [
  {
    title: "Name of Person Picking up Student",
    name: "name_of_person",
    rules: [
      {
        required: true,
        message: "Please input your name of person picking up student!",
      },
    ],
    type: "text",
  },
  {
    title: "Reason",
    name: "reason",
    placeholder: "Reason",
    rules: [{ required: true, message: "Please input your reason!" }],
    type: "textarea",
  },
  // {
  //   title: "Parent's Signature",
  //   name: "signature_image",
  //   // rules: [{ required: true, message: "Please input your signature!" }],
  //   type: "signature",
  // },
];
