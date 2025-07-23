export const registrationForm = [
  {
    title: "School Grade",
    name: "student_name",
    // placeholder: "select student",
    rules: [{ required: true, message: "Please select your grade!" }],
    type: "select",
    options: [
      { label: "Grade 1", value: "grade1" },
      { label: "Grade 2", value: "grade2" },
      { label: "Grade 3", value: "grade3" },
      { label: "Grade 4", value: "grade4" },
      { label: "Grade 5", value: "grade5" },
      { label: "Grade 6", value: "grade6" },
      { label: "Grade 7", value: "grade7" },
      { label: "Grade 8", value: "grade8" },
      { label: "Grade 9", value: "grade9" },
      { label: "Grade 10", value: "grade10" },
      { label: "Grade 11", value: "grade11" },
      { label: "Grade 12", value: "grade12" },
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
        label: "Youth Small",
        value: "Youth Small",
      },
      {
        label: "Youth Medium",
        value: "Youth Medium",
      },
      {
        label: "Youth Large",
        value: "Youth Large",
      },
      {
        label: "Youth X-Large",
        value: "Youth X-Large",
      },
      {
        label: "Small",
        value: "Small",
      },
      {
        label: "Medium",
        value: "Medium",
      },
      {
        label: "Large",
        value: "Large",
      },
      {
        label: "X-Large",
        value: "X-Large",
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
