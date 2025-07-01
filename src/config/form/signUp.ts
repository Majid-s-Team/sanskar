export const signUpFields = [
  {
    title: "Primary Email Address",
    name: "email",
    placeholder: "Email address",
    rules: [{ required: true, message: "Please input your email!" }],
    type: "text",
  },
  {
    title: "Mobile Number",
    name: "mobile",
    placeholder: "Mobile Number",
    rules: [{ required: true, message: "Please input your mobile number!" }],
    type: "phonePicker",
  },
  {
    title: "Father’s Name",
    name: "fathers_name",
    placeholder: "Name",
    rules: [{ required: true, message: "Please input your name!" }],
    type: "text",
  },
  {
    title: "Mother’s Name",
    name: "mothers_name",
    placeholder: "Name",
    rules: [{ required: true, message: "Please input your name!" }],
    type: "text",
  },
  {
    title: "Secondary Email",
    name: "secondary_email",
    placeholder: "optional",
    rules: [{ required: true, message: "Please input your secondary email!" }],
    type: "text",
  },
  {
    title: "Secondary Mobile Number",
    name: "secondary_mobile",
    placeholder: "optional",
    rules: [{ required: true, message: "Please input your secondary mobile!" }],
    type: "text",
  },
  {
    title: "Member of HSNC",
    name: "menever_of_hsnc",
    placeholder: "",
    rules: [{ required: true, message: "Please input your HSNC!" }],
    type: "text",
  },
  //   {
  //     title: "Enter your Password",
  //     name: "password",
  //     placeholder: "Password",
  //     rules: [
  //       { required: true, message: "Please enter your password!" },
  //       {
  //         pattern:
  //           /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  //         message:
  //           "Password must include uppercase, lowercase, number, and special character!",
  //       },
  //     ],
  //     type: "password",
  //   },
];
