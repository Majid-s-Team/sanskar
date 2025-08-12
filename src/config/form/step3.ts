export const step3 = [
  {
    title: "Address",
    name: "address",
    rules: [{ required: true, message: "Please input your address!" }],
    placeholder: "Home Address",
    type: "text",
  },
  {
    title: "City",
    name: "city",
    rules: [{ required: true, message: "Please input your city!" }],
    placeholder: "City",
    type: "text",
  },
  {
    title: "State",
    name: "state",
    rules: [{ required: true, message: "Please select your state" }],
    type: "select",
    placeholder: "Please select",
    options: [
      {
        label: "Andhra Pradesh",
        value: "Andhra Pradesh",
      },
      {
        label: "Arunachal Pradesh",
        value: "Arunachal Pradesh",
      },
      {
        label: "Assam",
        value: "Assam",
      },
      {
        label: "Bihar",
        value: "Bihar",
      },
    ],
  },
  {
    title: "Zip Code",
    name: "zip_code",
    rules: [{ required: true, message: "Please input your zip code!" }],
    type: "text",
  },
];

export const step4 = [
  {
    title: "Mother Volunteering?",
    name: "mother_volunteering",
    rules: [
      {
        required: true,
        message: "Please select your mother interested in volunteer!",
      },
    ],
    placeholder: "Please select",
    type: "select",
    options: [
      {
        label: "Yes",
        value: true,
      },
      {
        label: "No",
        value: false,
      },
    ],
  },
  {
    title: "Activities",
    name: "mother_activity_ids",
    // rules: [{ required: true, message: "Please select your activities" }],
    type: "select",
    mode: "multiple",
    placeholder: "Please select",
    options: [
      {
        label: "Arts and Crafts",
        value: "arts_crafts",
      },
      {
        label: "Book Club",
        value: "book_club",
      },
      {
        label: "Carpool",
        value: "carpool",
      },
      {
        label: "Events",
        value: "events",
      },
      {
        label: "Teaching",
        value: "teaching",
      },
      {
        label: "Weekly General Help",
        value: "weekly_general_help",
      },
    ],
  },
  {
    title: "Father Volunteering?",
    name: "father_volunteering",
    rules: [
      {
        required: true,
        message: "Please select your father interested in volunteer!",
      },
    ],
    placeholder: "Please select",
    type: "select",
    options: [
      {
        label: "Yes",
        value: true,
      },
      {
        label: "No",
        value: false,
      },
    ],
  },
  {
    title: "Activities",
    name: "father_activity_ids",
    // rules: [{ required: true, message: "Please select your activities" }],
    type: "select",
    placeholder: "Please select",
    mode: "multiple",
    options: [
      {
        label: "Arts and Crafts",
        value: "arts_crafts",
      },
      {
        label: "Book Club",
        value: "book_club",
      },
      {
        label: "Carpool",
        value: "carpool",
      },
      {
        label: "Events",
        value: "events",
      },
      {
        label: "Teaching",
        value: "teaching",
      },
      {
        label: "Weekly General Help",
        value: "weekly_general_help",
      },
    ],
  },
];
