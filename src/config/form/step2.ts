export const step1 = [
  {
    title: "First Name",
    name: "first_name",
    placeholder: "Name",
    rules: [{ required: true, message: "Please input your first name!" }],
    type: "text",
  },
  {
    title: "Last Name",
    name: "last_name",
    placeholder: "Name",
    rules: [{ required: true, message: "Please input your last name!" }],
    type: "text",
  },
  {
    title: "Date Of Birth",
    name: "date_of_birth",
    rules: [{ required: true, message: "Please input your date of birth!" }],
    type: "date",
  },
  {
    title: "School Name",
    name: "school_name",
    rules: [{ required: true, message: "Please input your school name!" }],
    type: "text",
  },
  {
    title: "Is the School year-round?",
    name: "is_school_year_round",
    rules: [
      { required: true, message: "Please input your school year round!" },
    ],
    placeholder: "Please select",
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
    title: "School Grade",
    name: "school_grade",
    placeholder: "Please select",
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
    title: "Student Email Address",
    name: "student_email_address",
    rules: [{ required: true, message: "Please input your email!" }],
    type: "text",
  },
  {
    title: "Student Mobile Number",
    name: "student_mobile_number",
    rules: [{ required: true, message: "Please input your mobile number!" }],
    type: "text",
  },
];

export const step2 = [
  {
    title: "Gurukul Class Name",
    name: "gurukul_class_name",
    placeholder: "Please select",
    rules: [{ required: true, message: "Please select your gurukul class!" }],
    type: "select",
    options: [
      {
        label: "Agastya",
        value: "agastya",
      },
      {
        label: "Angirasa",
        value: "angirasa",
      },
      {
        label: "Anasuya",
        value: "anasuya",
      },
      {
        label: "Bhargava",
        value: "bhargava",
      },
      {
        label: "Dhruva",
        value: "dhruva",
      },
      {
        label: "Janaki",
        value: "janaki",
      },
      {
        label: "Kashyapa",
        value: "kashyapa",
      },
      {
        label: "Meera",
        value: "meera",
      },
      {
        label: "Nachiketa",
        value: "nachiketa",
      },
      {
        label: "Sabari",
        value: "sabari",
      },
      {
        label: "Sandipani",
        value: "sandipani",
      },
      {
        label: "Valmiki",
        value: "valmiki",
      },
      {
        label: "Vyaasa",
        value: "vyaasa",
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
    title: "Join the Book Club?",
    name: "join_book_club",
    rules: [
      { required: true, message: "Please select your join the book club!" },
    ],
    placeholder: "Please select",
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
    rules: [{ required: true, message: "Please input your hobbies!" }],
    type: "text",
  },
  {
    title: "Any Allergies",
    name: "any_allergies",
    rules: [{ required: true, message: "Please input your allergies!" }],
    type: "text",
  },
];
