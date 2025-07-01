export const registrationForm = [
  {
    title: "School Grade",
    name: "student_name",
    // placeholder: "select student",
    rules: [{ required: true, message: "Please select your grade!" }],
    type: "select",
    options: [
      {
        label: "Grade 1",
        value: "grade1",
      },
      {
        label: "Grade 2",
        value: "grade2",
      },
      {
        label: "Grade 3",
        value: "grade3",
      },
    ],
  },
  {
    title: "School Name",
    name: "school_name",
    rules: [{ required: true, message: "Please input your school name!" }],
    type: "text",
  },
  {
    title: "Is the school year around?",
    name: "is_school_year_round",
    rules: [{ required: true, message: "Please select your year!" }],
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
    title: "Tee-shirt Size",
    name: "tee_shirt_size",
    rules: [{ required: true, message: "Please select your tee-shirt size!" }],
    type: "select",
    options: [
      {
        label: "S",
        value: "S",
      },
      {
        label: "M",
        value: "M",
      },
      {
        label: "L",
        value: "L",
      },
      {
        label: "XL",
        value: "XL",
      },
      {
        label: "XXL",
        value: "XXL",
      },
    ],
  },

  {
    title: "Book club",
    name: "book_club",
    rules: [{ required: true, message: "Please select your book club!" }],
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
    title: "Member of HSNC",
    name: "hsnc_member",
    rules: [{ required: true, message: "Please select your HSNC membership!" }],
    type: "text",
  },
];
