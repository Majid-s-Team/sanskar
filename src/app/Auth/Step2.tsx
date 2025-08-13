import { Form } from "antd";
import { step1, step2 } from "../../config";
import BaseInput from "../../component/shared/BaseInput";
import FormButtons from "../../component/shared/FormButtons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRequest } from "../../hooks/useRequest";
import { grade, gurukal, teeshirtSize } from "../../repositories";
import { optionpPicker } from "../../helper";
import dayjs from "dayjs";
import AuthButton from "../../component/partial/AuthButton";
import ImagePicker from "../../component/partial/ImagePicker";
import { EditFilled } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

function Step2() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [image, setImage] = useState<string | undefined>(undefined);
  const { state } = useLocation();
  const [students, setStudents] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  console.log(state, "state");

  const { data: gurukalData } = useRequest(gurukal.url, gurukal.method, {
    type: "mount",
  });

  const { data: teeshirtSizeData } = useRequest(
    teeshirtSize.url,
    teeshirtSize.method,
    {
      type: "mount",
    }
  );

  const { data: gradeData } = useRequest(grade.url, grade.method, {
    type: "mount",
  });

  // const handleAddStudent = async () => {
  //   try {
  //     const values = await form.validateFields();
  //     setStudents((prev) => [...prev, values]);
  //     form.resetFields(); // 👈 clear form for next student
  //   } catch (err) {
  //     console.log("Validation failed:", err);
  //   }
  // };

  // const handleNext = async () => {
  //   try {
  //     const values = await form.validateFields();

  //     const data = {
  //       ...values,
  //       dob: dayjs(values.dob).format("YYYY-MM-DD"),
  //     };
  //     const allStudents = [...students, data];
  //     navigate("/signup/address", {
  //       state: { ...state, students: allStudents },
  //     });
  //   } catch (err) {
  //     console.log("Validation failed:", err);
  //   }
  // };

  // const handleAddStudent = async () => {
  //   try {
  //     const values = await form.validateFields();

  //     const data = {
  //       ...values,
  //       dob: dayjs(values.dob).format("YYYY-MM-DD"),
  //     };

  //     const isFormFilled = Object.values(data).some(
  //       (val) => val !== undefined && val !== ""
  //     );
  //     if (!isFormFilled) return;

  //     // ✅ Add the new student first, then filter unique
  //     const updatedStudents = [...students, data];
  //     const uniqueStudents = updatedStudents.filter(
  //       (student, index, self) =>
  //         index ===
  //         self.findIndex(
  //           (t) =>
  //             t.name === student.name &&
  //             t.dob === student.dob &&
  //             t.email === student.email
  //         )
  //     );

  //     setStudents(uniqueStudents);
  //     setImage(null);
  //     form.resetFields();
  //   } catch (err) {
  //     // do nothing
  //   }
  // };

  const handleNext = async () => {
    try {
      const values = await form.validateFields().catch(() => null);

      const isFormFilled =
        values &&
        Object.values(values).some((val) => val !== undefined && val !== "");

      const data = values
        ? {
            ...values,
            dob: dayjs(values.dob).format("YYYY-MM-DD"),
            id: uuidv4(),
          }
        : {};

      let allStudents = [...students];

      if (isFormFilled) {
        allStudents.push(data);
      }

      // ✅ Condition: form khali hai lekin students list mein pehle se 1+ student ho to allow next
      if (allStudents.length === 0) {
        return; // bilkul koi student nahi, next block
      }

      navigate("/signup/address", {
        state: { ...state, students: allStudents },
      });
    } catch (err) {
      console.log("Error", err);
    }
  };

  // const handleRemove = (index: number) => {
  //   setStudents((prev) => prev.filter((_, i) => i !== index));
  // };

  // const handleEdit = (index: number) => {
  //   if (students && students?.length > 0) {
  //     const student = students[index];
  //     setImage(student.profile_image);
  //     form.setFieldsValue({
  //       ...student,
  //       dob: student.dob ? dayjs(student.dob) : undefined, // fix date
  //     });
  //     handleRemove(index);
  //   } else {
  //     console.error("Students array is empty or null");
  //   }
  // };

  const handleEdit = (id: string) => {
    if (!students || students.length === 0) return;

    const student = students.find((s) => s.id === id);
    if (!student) return;

    setImage(student.profile_image);
    form.setFieldsValue({
      ...student,
      dob: student.dob ? dayjs(student.dob) : undefined,
    });

    setEditIndex(students.findIndex((s) => s.id === id)); // ✅ still store index for update logic
  };

  const handleAddStudent = async () => {
    try {
      const values = await form.validateFields();
      const data = {
        ...values,
        dob: dayjs(values.dob).format("YYYY-MM-DD"),
        id: uuidv4(), // ✅ ID set here
      };

      const isFormFilled = Object.values(data).some(
        (val) => val !== undefined && val !== ""
      );
      if (!isFormFilled) return;

      if (editIndex !== null) {
        setStudents((prev) =>
          prev.map((student, i) => (i === editIndex ? data : student))
        );
        setEditIndex(null);
      } else {
        const updated = [...students, data];
        const unique = updated.filter(
          (s, idx, arr) => idx === arr.findIndex((t) => t.id === s.id)
        );
        setStudents(unique);
      }

      setImage(undefined);
      form.resetFields();
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (state?.students && state?.students?.length > 0) {
      form.setFieldsValue({
        ...state.students[0],
        dob: state.students[0].dob ? dayjs(state.students[0].dob) : undefined,
      });

      setImage(state.students[0].profile_image);

      const uniqueStudents = state.students.filter(
        (student: any, index: number, self: any[]) =>
          index === self.findIndex((s) => s.id === student.id)
      );
      setStudents(uniqueStudents);
      setEditIndex(
        state.students.findIndex(
          (s: { id: any }) => s.id === uniqueStudents[0].id
        )
      );
    }
  }, [state.students]);

  return (
    <div
      style={{
        backgroundImage: "url(/images/auth-bg2.png)",
        backgroundSize: "100% 100%",
      }}
      className="min-h-screen overflow-hidden grid lg:grid-cols-12 lg:p-10 p-5"
    >
      <div className="lg:col-span-4 h-full">
        <Link to="/login">
          <p className="text-white text-[26px] semibold">Sanskar</p>
        </Link>
        <div className="space-y-2 lg:mt-[130px] my-[50px] h-[400px] lg:ml-[30px] ml-0">
          <p className="text-white text-[29px] medium">Sign up to</p>
          <p className="text-white text-[33px] bold">SANSKAR!</p>
          <p className="text-white text-[13px] light">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
        <div className="!h-[500px] flex items-center overflow-y-auto">
          <div className="grid grid-cols-2 gap-4 h-full">
            {students?.map((child: any, index: number) => (
              <div
                onClick={() => handleEdit(child.id)}
                key={index}
                className={`rounded-xl p-4 text-center h-full flex flex-col justify-center bg-[#D57D25] custom-shadow2 cursor-pointer ${
                  index === editIndex
                    ? "!border-2 !border-[#000]"
                    : "border-2 border-transparent"
                }`}
              >
                <img
                  className="w-[80px] h-[80px] mx-auto rounded-full"
                  src={child?.profile_image}
                  alt={child?.first_name}
                />
                <h3 className="mt-2 text-[20px] regular text-[#FFFFFF] capitalize">
                  {child?.first_name + " " + child?.last_name}
                </h3>
                <p className="text-[#FFFFFF] text-[12px] text-center regular capitalize my-1">
                  {child?.student_email || "child@example.com"}
                </p>
                <p className="text-[#FFFFFF] text-[12px] text-center regular capitalize">
                  {child?.student_mobile_number || "+123456789"}
                </p>
                <div className="mt-auto">
                  <EditFilled className="text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-8 lg:p-10 col-span-12">
        <div className="bg-white lg:p-[10px] p-8 lg:px-[40px] rounded-[40px] mx-auto shadow-lg h-full">
          <div className="flex lg:flex-row flex-col justify-between items-center mb-5">
            <div>
              <p className="text-[28px] semibold">Student Information</p>
              <p className="text-[18px] regular">
                Per Student Fee : <span className="text-[#FF881A]">$100</span>
              </p>
            </div>
            <div className="lg:w-[250px] w-full">
              <AuthButton text="Add More Student" onClick={handleAddStudent} />
            </div>
          </div>

          <Form form={form} layout="vertical">
            <Form.Item
              label="Profile Picture"
              name="profile_image"
              // className="flex justify-center"
              rules={[
                {
                  required: true,
                  message: "Please upload profile picture",
                },
              ]}
            >
              <ImagePicker onChange={() => {}} initialImgSrc={image} />
            </Form.Item>
            <div className="grid lg:grid-cols-2 xl:gap-20 lg:gap-10">
              <div>
                {step1.map((item) => (
                  <Form.Item
                    label={item.title}
                    key={item.name}
                    name={item.name}
                    rules={item.rules}
                  >
                    <BaseInput
                      {...item}
                      options={
                        item.name === "school_grade_id"
                          ? optionpPicker(gradeData as any[])
                          : item.options
                      }
                    />
                  </Form.Item>
                ))}
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  {step2.map((item) => (
                    <Form.Item
                      label={item.title}
                      key={item.name}
                      name={item.name}
                      rules={item.rules}
                      // initialValue={state?.students?.[0]?.[item.name]}
                    >
                      <BaseInput
                        {...item}
                        options={
                          item.name === "gurukal_id"
                            ? optionpPicker(gurukalData as any[])
                            : item.name === "teeshirt_size_id"
                            ? optionpPicker(teeshirtSizeData as any[])
                            : item.options
                        }
                      />
                    </Form.Item>
                  ))}
                </div>
                <div className="mb-5">
                  <FormButtons
                    onSubmit={
                      editIndex !== null ? handleAddStudent : handleNext
                    }
                    onCancel={() =>
                      navigate("/signup", {
                        state: {
                          ...state,
                          path: "/signup/add-student",
                        },
                      })
                    }
                    title={editIndex !== null ? "Update" : "Next"}
                    title2="Back"
                  />
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Step2;
