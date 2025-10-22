import { Form, Popconfirm } from "antd";
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
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

function Step2() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [image, setImage] = useState<string | undefined>(undefined);
  const { state } = useLocation();
  const [students, setStudents] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [dataSave, setDataSave] = useState<any>(true);

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

  const handleDelete = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    // setDataSave(false);
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
      setDataSave(false);
      setImage(undefined);
      form.resetFields();
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (dataSave === true) {
      if (state?.students && state?.students?.length > 0) {
        // form.setFieldsValue({
        //   ...state.students[0],
        //   dob: state.students[0].dob ? dayjs(state.students[0].dob) : undefined,
        // });

        // setImage(state.students[0].profile_image);

        const uniqueStudents = state.students.filter(
          (student: any, index: number, self: any[]) =>
            index === self.findIndex((s) => s.id === student.id)
        );
        setStudents(uniqueStudents);
        // setEditIndex(
        //   state.students.findIndex(
        //     (s: { id: any }) => s.id === uniqueStudents[0].id
        //   )
        // );
      }
    }
  }, [state.students, dataSave]);

  useEffect(() => {
    if (state?.students && state?.students?.length > 0) {
      const stopRefresh = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = "Kya aap sure hain? Aapke changes lost ho sakte hain.";
      };
      window.addEventListener("beforeunload", stopRefresh);

      return () => {
        window.removeEventListener("beforeunload", stopRefresh);
      };
    }
  }, [state, state.students]);

  return (
    <div
      style={{
        backgroundImage: "url(/images/auth-bg2.png)",
        backgroundSize: "100% 100%",
      }}
      className="min-h-screen overflow-hidden grid lg:grid-cols-12 lg:p-10 p-5"
    >
      <div className="lg:col-span-4 h-full">
        <Link to="/login" className="cursor-pointer">
          <p className="text-white text-[30px] semibold">Sanskar Academy</p>
        </Link>
        <div className="space-y-2 lg:mt-[130px] my-[50px] h-[400px] lg:ml-[30px] ml-0">
          <p className="text-white text-[29px] medium">Sign up to</p>
          <p className="text-white text-[33px] bold">Gurukul Classes</p>
        </div>
        <div className="!h-[500px] flex items-center overflow-y-auto overflow-x-hidden mt-20">
          <div className="grid grid-cols-2 gap-4 h-full">
            {students?.map((child: any, index: number) => (
              <div
                key={index}
                className={`rounded-xl p-4 text-center flex flex-col justify-center bg-[#D57D25] custom-shadow2 !h-[230px]  ${
                  index === editIndex
                    ? "!border-2 !border-[#000]"
                    : "border-2 border-transparent"
                }`}
              >
                <img
                  className="!w-[80px] !h-[80px] object-cover mx-auto rounded-full"
                  src={child?.profile_image}
                  alt={child?.first_name}
                />
                <div className="space-y-1">
                  <h3 className="text-[20px] regular text-[#FFFFFF] capitalize truncate">
                    {child?.first_name + " " + child?.last_name}
                  </h3>
                  <p className="text-[#FFFFFF] text-[12px] text-center regular capitalize truncate">
                    {child?.student_email || "child@example.com"}
                  </p>
                  <p className="text-[#FFFFFF] text-[12px] text-center regular capitalize truncate">
                    {child?.student_mobile_number || "+123456789"}
                  </p>
                </div>
                <div className="flex gap-4 mt-4 justify-center">
                  <EditFilled
                    onClick={() => handleEdit(child.id)}
                    className="text-white cursor-pointer text-[20px]"
                  />
                  <Popconfirm
                    title="Are you sure you want to delete this student?"
                    onConfirm={() => handleDelete(child.id)}
                  >
                    <DeleteFilled className="text-white cursor-pointer text-[20px]" />
                  </Popconfirm>
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
                Per Student Fee : <span className="text-[#FF881A]">$300</span>
              </p>
            </div>
            {/* <div className="lg:w-[250px] w-full">
              <AuthButton text="Add More Student" onClick={handleAddStudent} />
            </div> */}
          </div>

          <Form form={form} layout="vertical">
            <div className="flex justify-between items-center">
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
              <div className="lg:w-[250px] w-full">
                <AuthButton
                  text="Add More Student"
                  onClick={handleAddStudent}
                />
              </div>
            </div>
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
                  <AuthButton
                    text="Done Adding Student"
                    onClick={handleAddStudent}
                  />
                </div>
                <div className="mb-5">
                  <FormButtons
                    onSubmit={
                      editIndex !== null ? handleAddStudent : handleNext
                    }
                    disabled={students?.length === 0}
                    onCancel={() =>
                      navigate("/signup", {
                        state: {
                          ...state,
                          students: students,
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
