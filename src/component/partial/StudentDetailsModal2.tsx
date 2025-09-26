import { Avatar, Modal } from "antd";

type Props = {
  isModalOpen: boolean;
  handleCancel: () => void;
  record: any;
};

function StudentDetailsModal2({ isModalOpen, handleCancel, record }: Props) {
  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      centered
      width={800}
    >
      <div className="flex justify-center flex-col items-center p-5">
        <div className="text-center">
          <Avatar
            size={100}
            src={record?.profile_image || "/images/teacher.png"}
          />
          <div className={"mt-5"}>
            <p className="text-[24px] bold capitalize">
              {record?.first_name + " " + record?.last_name}
            </p>
            <p className="text-[18px] regular">
              {record?.student_mobile_number || "+011 384 792302"}
            </p>
            <p className="text-[18px] regular capitalize">
              {record?.student_email || "janecooper@gmail.com"}
            </p>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-5 mt-10 w-full px-10">
          {[
            {
              title: "Student ID",
              value: record?.id || "#123",
            },
            {
              title: "School Name",
              value: record?.school_name || "The School",
            },
            {
              title: "Date Of Birth",
              value: record?.dob || "01/01/2000",
            },
            // {
            //   title: "House",
            //   value: "The School",
            // },
            {
              title: "Parent Name",
              value: record?.user?.father_name || "Doe",
            },
            {
              title: "Parent Email",
              value: record?.user?.primary_email || "janecooper@gmail.com",
            },
            {
              title: "Parent Phone #",
              value: record?.user?.mobile_number || "+011 384 792302",
            },
            {
              title: "Hobbies/Interests",
              value: record?.hobbies_interest || "Football",
            },
          ].map((item, index) => {
            return (
              <div key={index} className="">
                <p className="text-[18px] bold">{item.title}</p>
                <p className="text-[18px] regular capitalize">{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}

export default StudentDetailsModal2;
