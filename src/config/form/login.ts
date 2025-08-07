export const loginFields = [
  {
    title: "Enter your username or email address",
    name: "login",
    placeholder: "Username or email address",
    rules: [{ required: true, message: "Please input your email!" }],
    type: "text",
  },
  {
    title: "Enter your Password",
    name: "password",
    placeholder: "Password",
    rules: [
      { required: true, message: "Please enter your password!" },
      {
        pattern:
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message:
          "Password must include uppercase, lowercase, number, and special character!",
      },
    ],
    type: "password",
  },
];
