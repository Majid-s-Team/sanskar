import { Avatar, Modal } from "antd";

type Props = {
  isModalOpen: boolean;
  handleCancel: () => void;
};

const details = [
  {
    title: "Student ID",
    value: "#123",
  },
  {
    title: "House",
    value: "The School",
  },
  {
    title: "Date Of Birth",
    value: "01/01/2000",
  },
  {
    title: "House",
    value: "The School",
  },
  {
    title: "Parent Name",
    value: "Doe",
  },
  {
    title: "Parent Email",
    value: "janecooper@gmail.com",
  },
  {
    title: "Parent Phone #",
    value: "+011 384 792302",
  },
  {
    title: "Hobbies/Interests",
    value: "Football",
  },
];

function StudentDetailsModal({ isModalOpen, handleCancel }: Props) {
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
          <Avatar size={100} src="/images/teacher.png" />
          <div className={"mt-5"}>
            <p className="text-[24px] bold">Jane Cooper</p>
            <p className="text-[18px] regular">+011 384 792302</p>
            <p className="text-[18px] regular">janecooper@gmail.com</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-5 mt-10 w-full px-10">
          {details.map((item, index) => {
            return (
              <div key={index} className="">
                <p className="text-[18px] bold">{item.title}</p>
                <p className="text-[18px] regular">{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}

export default StudentDetailsModal;
