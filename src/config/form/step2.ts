export const step1 = [
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
    title: "Class Name",
    name: "class_name",
    rules: [{ required: true, message: "Please input your class name!" }],
    type: "text",
  },
  {
    title: "School Grade",
    name: "school_grade",
    rules: [{ required: true, message: "Please input your school grade!" }],
    type: "text",
  },
];

export const step2 = [
  {
    title: "Gurukul Class Name",
    name: "gurukul_class_name",
    rules: [{ required: true, message: "Please select your gurukul class!" }],
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
