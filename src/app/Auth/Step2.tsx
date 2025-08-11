import { Form } from "antd";
import { step1, step2 } from "../../config";
import BaseInput from "../../component/shared/BaseInput";
import FormButtons from "../../component/shared/FormButtons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRequest } from "../../hooks/useRequest";
import { grade, gurukal, teeshirtSize } from "../../repositories";
import { optionpPicker } from "../../helper";
import dayjs from "dayjs";
import AuthButton from "../../component/partial/AuthButton";
import ImagePicker from "../../component/partial/ImagePicker";

function Step2() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [image, setImage] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const { state } = useLocation();

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

  const handleAddStudent = async () => {
    try {
      const values = await form.validateFields();

      const data = {
        ...values,
        dob: dayjs(values.dob).format("YYYY-MM-DD"),
      };
      const isFormFilled = Object.values(data).some(
        (val) => val !== undefined && val !== ""
      );

      if (!isFormFilled) return;

      setStudents((prev) => [...prev, data]);
      form.resetFields();
    } catch (err) {
      // do nothing
    }
  };

  const handleNext = async () => {
    try {
      const values = await form.validateFields().catch(() => null);

      // Check if form has any non-empty field
      const isFormFilled =
        values &&
        Object.values(values).some((val) => val !== undefined && val !== "");

      console.log(isFormFilled);

      const data = {
        ...values,
        dob: dayjs(values.dob).format("YYYY-MM-DD"),
      };

      const allStudents = [...students];
      if (isFormFilled) {
        allStudents.push(data);
      }

      if (allStudents.length === 0) {
        // No student added at all
        return;
      }

      navigate("/signup/address", {
        state: { ...state, students: allStudents },
      });
    } catch (err) {
      console.log("Error", err);
    }
  };

  const handleRemove = (index: number) => {
    setStudents((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number) => {
    const student = students[index];
    setImage(student.profile_image);
    form.setFieldsValue({
      ...student,
      dob: student.dob ? dayjs(student.dob) : undefined, // fix date
    });
    handleRemove(index);
  };

  console.log(handleEdit);

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
        <div className="space-y-2 lg:mt-[130px] my-[50px] lg:ml-[30px] ml-0">
          <p className="text-white text-[29px] medium">Sign up to</p>
          <p className="text-white text-[33px] bold">SANSKAR!</p>
          <p className="text-white text-[13px] light">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
        {/* <div className="h-[900px] flex items-center !z-10">
          <div className="flex justify-center items-end flex-wrap gap-4">
            {students?.map((child: any, index: number) => (
              <div
                key={index}
                className="rounded-xl p-4 text-center h-full flex flex-col justify-center bg-[#D57D25] custom-shadow2 "
              >
                <img
                  className="w-[80px] h-[80px] mx-auto rounded-full"
                  src={child?.profile_image || "/images/user.png"}
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
                <p onClick={() => handleEdit(index)}>edit</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      <div className="lg:col-span-8 lg:p-10 col-span-12">
        <div className="bg-white lg:p-[10px] p-8 lg:px-[40px] rounded-[40px] mx-auto shadow-lg h-full">
          <div className="flex lg:flex-row flex-col justify-between items-center mb-5">
            <div>
              <p className="text-[28px] semibold">Student Information</p>
              <p className="text-[18px] regular">
                Student Fee :{" "}
                <span className="text-[#FF881A]">
                  {1000 * students.length || 1000}
                </span>
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
                    onSubmit={handleNext}
                    onCancel={() => navigate(-1)}
                    title="Next"
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
