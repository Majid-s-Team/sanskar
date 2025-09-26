export const addWeeklyUpdates = [
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
