import { Modal } from "antd";
type Props = {
  isModalOpen: boolean;
  handleCancel: () => void;
  record?: any;
};

function EventMemberModal({ isModalOpen, handleCancel, record }: Props) {
  // const { data, loading, execute } = useRequest<any>("/events", "GET", {
  //   type: "delay",
  //   routeParams: String(record),
  // });

  // useEffect(() => {
  //   execute({
  //     type: "mount",
  //     routeParams: String(record),
  //   });
  // }, [record]);

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      centered
      title="Event Members"
    >
      <div>
        {record?.students?.map((student: any) => (
          <div
            key={student.id}
            className="flex items-center gap-4 mt-5 border border-[#ECECEC] p-4 rounded-[18px] justify-between "
          >
            <div className="flex items-center gap-5">
              {/* <Avatar
                size={50}
                src={student?.profile_image || "/images/teacher.png"}
              /> */}
              <p className="text-[16px] medium capitalize">
                {student.student_name}
              </p>
            </div>
            <p
              className={`text-[14px] medium ${student?.status === "not_attending" ? "text-red-500" : student?.status === "attending" ? "text-[#4BD670]" : "text-[#D6A54B]"}`}
            >
              {student?.status === "not_attending"
                ? "Not Attending"
                : student?.status === "attending"
                  ? "Attending"
                  : "Not Responded"}
            </p>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default EventMemberModal;
