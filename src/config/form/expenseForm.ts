export const expenseForm = [
  {
    title: "Name",
    name: "name",
    rules: [{ required: true, message: "Please input your name!" }],
    type: "text",
  },
  {
    title: "Cheque Payable To:",
    name: "cheque_payable_to",
    rules: [
      { required: true, message: "Please input your cheque payable to!" },
    ],
    type: "text",
  },
  {
    title: "Date",
    name: "date",
    rules: [{ required: true, message: "Please input your date!" }],
    type: "date",
  },
  {
    title: "Address",
    name: "address",
    rules: [{ required: true, message: "Please input your address!" }],
    type: "text",
  },
  {
    title: "Items Name",
    name: "items_name",
    rules: [{ required: true, message: "Please input your items name!" }],
    type: "text",
  },
  {
    title: "City/State/Zip",
    name: "city_state_zip",
    rules: [{ required: true, message: "Please input your city/state/zip!" }],
    type: "text",
  },
  {
    title: "Amount",
    name: "amount",
    rules: [{ required: true, message: "Please input your amount!" }],
    type: "text",
  },
  {
    title: "Phone Number",
    name: "phone_number",
    rules: [{ required: true, message: "Please input your phone number!" }],
    type: "text",
  },
];
