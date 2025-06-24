export const siblingEnrollmentForm = [
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
    title: "Student’s First Name *",
    name: "first_name",
    placeholder: "Name",
    rules: [{ required: true, message: "Please input your name!" }],
    type: "text",
  },
  {
    title: "Student’s Last Name *",
    name: "last_name",
    placeholder: "Name",
    rules: [{ required: true, message: "Please input your name!" }],
    type: "text",
  },
  {
    title: "Student's Date of Birth *",
    name: "date_of_birth",
    placeholder: "",
    rules: [{ required: true, message: "Please input your date of birth!" }],
    type: "date",
  },
  {
    title: "Student's School Grade as of Fall 2024*",
    name: "grade_as_of_fall_2024",
    placeholder: "Name",
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
  {
    title: "2nd Student’s First Name *",
    name: "first_name",
    placeholder: "Name",
    rules: [{ required: true, message: "Please input your name!" }],
    type: "text",
  },
  {
    title: "2nd Student’s Last Name *",
    name: "last_name",
    placeholder: "Name",
    rules: [{ required: true, message: "Please input your name!" }],
    type: "text",
  },
  {
    title: "2nd Student's Date of Birth *",
    name: "date_of_birth",
    placeholder: "",
    rules: [{ required: true, message: "Please input your date of birth!" }],
    type: "date",
  },
  {
    title: "2nd Student's School Grade as of Fall 2024*",
    name: "grade_as_of_fall_2024",
    placeholder: "Name",
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
  {
    title: "Primary Email Address*",
    name: "student_email_address",
    placeholder: "Name",
    rules: [{ required: true, message: "Please input your primary email!" }],
    type: "text",
  },
  {
    title: "Secondary Email Address",
    name: "student_email_address",
    placeholder: "Name",
    rules: [{ required: true, message: "Please input your secondary email!" }],
    type: "text",
  },
  {
    title: "Phone Number",
    name: "student_phone_number",
    placeholder: "Name",
    rules: [{ required: true, message: "Please input your phone number!" }],
    type: "text",
  },
  {
    title: "Preferred Class Time",
    name: "preferred_class_time",
    rules: [{ required: true, message: "Please select your preferred time!" }],
    type: "select",
    options: [
      {
        label: "Morning",
        value: "morning",
      },
      {
        label: "Afternoon",
        value: "afternoon",
      },
      {
        label: "Evening",
        value: "evening",
      },
    ],
  },
  {
    title: "Sibling of current student?",
    name: "sibling_of_current_student",
    rules: [{ required: true, message: "Please select your sibling!" }],
    type: "select",
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
    title: "Comments",
    name: "comments",
    rules: [{ required: true, message: "Please input your comments!" }],
    type: "textarea",
  },
];
