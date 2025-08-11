export const signUpFields = [
  {
    title: "Primary Email Address",
    name: "primary_email",
    placeholder: "Email address",
    rules: [
      { required: true, message: "Please input your email!" },
      {
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Invalid email address",
      },
    ],
    type: "text",
  },
  {
    title: "Mobile Number",
    name: "mobile_number",
    placeholder: "Mobile Number",
    rules: [{ required: true, message: "Please input your mobile number!" }],
    type: "phonePicker",
  },
  {
    title: "Father’s Name",
    name: "father_name",
    placeholder: "Name",
    rules: [{ required: true, message: "Please input your name!" }],
    type: "text",
  },
  {
    title: "Mother’s Name",
    name: "mother_name",
    placeholder: "Name",
    rules: [{ required: true, message: "Please input your name!" }],
    type: "text",
  },
  {
    title: "Secondary Email",
    name: "secondary_email",
    placeholder: "optional",
    rules: [
      { required: true, message: "Please input your secondary email!" },
      {
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Invalid email address",
      },
    ],
    type: "text",
  },
  {
    title: "Secondary Mobile Number",
    name: "secondary_mobile_number",
    placeholder: "optional",
    rules: [{ required: true, message: "Please input your secondary mobile!" }],
    type: "text",
  },
  // {
  //   title: "Member of HSNC",
  //   name: "menever_of_hsnc",
  //   placeholder: "",
  //   rules: [{ required: true, message: "Please input your HSNC!" }],
  //   type: "text",
  // },
];
