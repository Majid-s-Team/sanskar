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
  const [students, setStudents] = useState<any[]>([]);
  const { state } = useLocation();

  console.log(students, "student");

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

  console.log(gurukalData);

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

  return (
    <div
      style={{
        backgroundImage: "url(/images/auth-bg2.png)",
        backgroundSize: "100% 100%",
      }}
      className="min-h-screen overflow-hidden grid lg:grid-cols-12 lg:p-10 p-5"
    >
      <div className="lg:col-span-4">
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
      </div>

      <div className="lg:col-span-8 lg:p-10 col-span-12">
        <div className="bg-white lg:p-[10px] p-8 lg:px-[40px] rounded-[40px] mx-auto shadow-lg h-full">
          <div className="flex lg:flex-row flex-col justify-between items-center mb-5">
            <p className="text-[28px] semibold">Student Information</p>
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
              <ImagePicker onChange={() => {}} initialImgSrc={""} />
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
