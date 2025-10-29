export const addWeeklyUpdates = [
  {
    title: "Week #",
    name: "week_number",
    rules: [
      { required: true, message: "Please input your week number!" },
      {
        pattern: /^[0-9]{1,2}$/,
        message: "Week number should be up to 2 digits",
      },
    ],
    type: "number",
  },
  {
    title: "Date",
    name: "date",
    rules: [{ required: true, message: "Please input your date!" }],
    type: "date",
  },
  {
    title: "Class Name",
    name: "title",
    // rules: [{ required: true, message: "Please input your class!" }],
    type: "text",
  },
  {
    title: "Write a Description",
    name: "description",
    rules: [{ required: true, message: "Please input your description!" }],
    type: "textarea",
  },
];
