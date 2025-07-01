export const addStudentForm = [
  {
    title: "First Name",
    name: "first_name",
    placeholder: "Name",
    rules: [{ required: true, message: "Please input your name!" }],
    type: "text",
  },
  {
    title: "Last Name",
    name: "last_name",
    placeholder: "Name",
    rules: [{ required: true, message: "Please input your name!" }],
    type: "text",
  },
  {
    title: "Date Of Birth",
    name: "date_of_birth",
    placeholder: "please select",
    rules: [{ required: true, message: "Please input your date of birth!" }],
    type: "date",
  },
  {
    title: "School Name",
    name: "school_name",
    placeholder: "Name",
    rules: [{ required: true, message: "Please input your school name!" }],
    type: "text",
  },
  {
    title: "School Grade",
    name: "school_grade",
    placeholder: "Please select",
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
    title: "Student Email Address",
    name: "student_email_address",
    placeholder: "Email address",
    rules: [{ required: true, message: "Please input your email!" }],
    type: "text",
  },
  {
    title: "Is the School year-round?",
    name: "is_school_year_round",
    placeholder: "please select",
    rules: [{ required: true, message: "Please input your school year!" }],
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
    title: "Hobbies/Interests",
    name: "hobbies_interests",
    placeholder: "Name",
    rules: [{ required: true, message: "Please input your hobbies!" }],
    type: "text",
  },
  {
    title: "Student Mobile Number",
    name: "student_mobile_number",
    rules: [{ required: true, message: "Please input your mobile number!" }],
    type: "text",
  },
  {
    title: "Last Year Class",
    name: "last_year_class",
    placeholder: "Please select",
    rules: [{ required: true, message: "Please select your last year class!" }],
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
    title: "Tee-shirt Size",
    name: "tee_shirt_size",
    placeholder: "Please select",
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
    title: "Join the Book Club?",
    name: "join_book_club",
    placeholder: "Please select",
    rules: [
      { required: true, message: "Please select your join the book club!" },
    ],
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
    title: "Any Allergies",
    name: "any_allergies",
    rules: [{ required: true, message: "Please input your allergies!" }],
    type: "text",
  },
];
