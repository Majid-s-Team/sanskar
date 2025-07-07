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
    title: "Mother Interested in Volunteer",
    name: "mother_interested_in_volunteer",
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
        value: "yes",
      },
      {
        label: "No",
        value: "no",
      },
    ],
  },
  {
    title: "Activities",
    name: "mother_activities",
    rules: [{ required: true, message: "Please select your activities" }],
    type: "select",
    mode: "multiple",
    placeholder: "Please select",
    options: [
      {
        label: "Reading",
        value: "reading",
      },
      {
        label: "Writing",
        value: "writing",
      },
      {
        label: "Drawing",
        value: "drawing",
      },
      {
        label: "Singing",
        value: "singing",
      },
      {
        label: "Dancing",
        value: "dancing",
      },
    ],
  },
  {
    title: "Father Interested in Volunteer",
    name: "father_interested_in_volunteer",
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
        value: "yes",
      },
      {
        label: "No",
        value: "no",
      },
    ],
  },
  {
    title: "Activities",
    name: "father_activities",
    rules: [{ required: true, message: "Please select your activities" }],
    type: "select",
    placeholder: "Please select",
    mode: "multiple",
    options: [
      {
        label: "Reading",
        value: "reading",
      },
      {
        label: "Writing",
        value: "writing",
      },
      {
        label: "Drawing",
        value: "drawing",
      },
      {
        label: "Singing",
        value: "singing",
      },
      {
        label: "Dancing",
        value: "dancing",
      },
    ],
  },
];
