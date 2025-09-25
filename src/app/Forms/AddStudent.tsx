import { Form } from "antd";
import HomeLayout from "../../component/shared/HomeLayout";
import { addStudentForm } from "../../config";
import BaseInput from "../../component/shared/BaseInput";
import CustomButton from "../../component/shared/CustomButton";
import { useNavigate, useParams } from "react-router-dom";
import { withAuthGuard } from "../../component/higherOrder/withAuth";
import { useEffect } from "react";
import { useRequest } from "../../hooks/useRequest";
import { grade, gurukal, teeshirtSize } from "../../repositories";
import { Student } from "../../types";
import dayjs from "dayjs";
import ImagePicker from "../../component/partial/ImagePicker";
import { optionpPicker } from "../../helper";
import { useAuth } from "../../hooks/useAuth";

function AddStudent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const { user: userData } = useAuth();

  const {
    data: studentData,
    loading,
    execute,
  } = useRequest<Student>("/student", "GET", {});

  const { loading: createLoading, execute: create } = useRequest<Student>(
    "/student",
    "POST",
    {}
  );

  const { execute: update, loading: updateLoading } = useRequest<Student>(
    "/student",
    "PUT",
    {}
  );

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

  useEffect(() => {
    if (id) {
      execute({
        type: "mount",
        routeParams: String(id),
      });
    }
  }, [id]);

  useEffect(() => {
    if (id && studentData) {
      form.setFieldsValue({
        ...studentData,
        dob: studentData.dob ? dayjs(studentData.dob) : undefined,
        is_new_student: studentData.is_new_student ? true : false,
        is_school_year_around: studentData.is_school_year_around ? true : false,
        join_the_club: studentData.join_the_club ? true : false,
      });
    }
  }, [studentData]);

  const onFinish = (values: any) => {
    if (id) {
      update({
        body: { ...values, dob: dayjs(values.dob).format("YYYY-MM-DD") },
        routeParams: String(id),
        type: "mount",
        cbSuccess: () => {
          navigate("/home");
        },
      });
    } else {
      create({
        body: {
          ...values,
          dob: dayjs(values.dob).format("YYYY-MM-DD"),
          user_id: userData?.user?.id,
        },
        type: "mount",
        cbSuccess: () => {
          navigate("/home");
        },
      });
    }
  };

  return (
    <HomeLayout loading={loading}>
      <div className="bg-white p-8 rounded-[24.59px]">
        <p className="text-[30px] semibold">Student Information</p>
        <Form
          onFinish={onFinish}
          form={form}
          layout="vertical"
          className="mt-5 form-m"
        >
          <Form.Item
            label="Profile Picture"
            name="profile_image"
            className="py-5"
            rules={[
              {
                required: true,
                message: "Please upload profile picture",
              },
            ]}
          >
            <ImagePicker
              onChange={() => {}}
              initialImgSrc={studentData?.profile_image as string}
            />
          </Form.Item>
          <div className="grid grid-cols-2 gap-5">
            {addStudentForm.map((item) => {
              return (
                <Form.Item
                  label={item.title}
                  key={item.name}
                  name={item.name}
                  rules={item.rules}
                >
                  <BaseInput
                    {...item}
                    disabled={
                      id &&
                      [
                        "is_new_student",
                        "gurukal_id",
                        "join_the_club",
                      ].includes(item.name)
                    }
                    options={
                      item.name === "gurukal_id"
                        ? optionpPicker(gurukalData as any[])
                        : item.name === "school_grade_id"
                        ? optionpPicker(gradeData as any[])
                        : item.name === "teeshirt_size_id"
                        ? optionpPicker(teeshirtSizeData as any[])
                        : item.options
                    }
                  />
                </Form.Item>
              );
            })}
          </div>
          <div className="flex justify-end mt-10">
            <CustomButton
              htmlType="submit"
              title="Submit"
              loading={updateLoading || createLoading}
            />
          </div>
        </Form>
      </div>
    </HomeLayout>
  );
}

export default withAuthGuard(AddStudent);
