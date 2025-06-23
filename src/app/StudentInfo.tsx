import { Link } from "react-router-dom";
import HomeLayout from "../component/shared/HomeLayout";
import { addStudentForm } from "../config";
import { Form, Input } from "antd";

const studentData = {
  first_name: "John",
  last_name: "Doe",
  date_of_birth: "2005-01-01",
  school_name: "Springfield High School",
  school_grade: "A",
  student_email_address: "johndoe@example.com",
  is_school_year_round: "Yes",
  hobbies_interests: "Reading, Soccer",
  student_mobile_number: "123-456-7890",
  last_year_class: "B",
  tee_shirt_size: "M",
  join_book_club: "yes",
  any_allergies: "Peanuts",
};

type StudentDataKey = keyof typeof studentData;

function StudentInfo() {
  return (
    <HomeLayout>
      <div className="bg-white p-8 rounded-[24.59px]">
        <div className="flex justify-between items-center">
          <p className="text-[30px] semibold">Student Information</p>
          <Link
            to={"/forms/add-student"}
            className="float-right px-8 mb-5 h-[45px] flex justify-center items-center !bg-[#FF881A] rounded-[10px] !border-none text-[16px] medium !text-white shadow-[0px_4px_4px_0px_rgba(245,223,201)]"
          >
            Edit
          </Link>
        </div>
        <Form layout="vertical" className="mt-5 form-m">
          <div className="grid grid-cols-2 gap-5 ">
            {addStudentForm.map((item) => {
              return (
                <Form.Item
                  label={item.title}
                  key={item.name}
                  name={item.name}
                  rules={item.rules}
                  initialValue={studentData[item.name as StudentDataKey]}
                >
                  <Input
                    disabled
                    className="!bg-[#F2F2F2] !border-none !rounded-[10px] h-[50px] !text-[14px] light"
                    {...item}
                  />
                </Form.Item>
              );
            })}
          </div>
        </Form>
      </div>
    </HomeLayout>
  );
}

export default StudentInfo;
