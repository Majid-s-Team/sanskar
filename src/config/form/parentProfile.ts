export const parentProfile = [
  {
    title: "Father’s Name *",
    name: "father_name",
    placeholder: "Name",
    rules: [{ required: true, message: "Please input your name!" }],
    type: "text",
  },
  {
    title: "Mother’s Name *",
    name: "mother_name",
    placeholder: "Name",
    rules: [{ required: true, message: "Please input your name!" }],
    type: "text",
  },
  {
    title: "Primary Email Address *",
    name: "primary_email",
    disabled: true,
    placeholder: "Email address",
    rules: [{ required: true, message: "Please input your email!" }],
    type: "text",
  },
  {
    title: "Mobile Number *",
    name: "mobile_number",
    placeholder: "Mobile Number",
    rules: [{ required: true, message: "Please input your mobile number!" }],
    type: "phonePicker",
  },
  {
    title: "Secondary Email",
    name: "secondary_email",
    optional: true,
    // rules: [{ required: true, message: "Please input your secondary email!" }],
    type: "text",
  },
  {
    title: "Secondary Mobile Number",
    name: "secondary_mobile_number",
    optional: true,
    // rules: [{ required: true, message: "Please input your secondary mobile!" }],
    type: "text",
  },
  {
    title: "Member of HSNC",
    name: "is_hsnc_member",
    placeholder: "",
    rules: [{ required: true, message: "Please select your HSNC!" }],
    type: "select",
    options: [
      {
        label: "Yes",
        value: true,
      },
      {
        label: "No",
        value: false,
      },
    ],
  },
];
