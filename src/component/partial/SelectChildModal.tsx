import { Modal, notification } from "antd";
import { useState } from "react";
import CustomButton from "../shared/CustomButton";
import { useNavigate, useParams } from "react-router-dom";
import { Student } from "../../types";
import { useRequest } from "../../hooks";
import { useData } from "../higherOrder/DataProvider";

type Props = {
  isModalOpen: boolean;
  handleCancel: () => void;
};

function SelectChildModal({ isModalOpen, handleCancel }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { student, loading: studentLoading } = useData();
  const [selectedChildren, setSelectedChildren] = useState<any[]>([]); // array for multiple

  const { execute: execute2, loading } = useRequest<any>("/events", "POST", {
    type: "delay",
  });

  const handleSubmit = () => {
    if (selectedChildren.length > 0) {
      execute2({
        body: {
          student_ids: selectedChildren.map((child) => child.id),
          status: "attending",
        },
        routeParams: String(id) + "/rsvp",
        cbSuccess() {
          navigate("/events-rsvp");
        },
        cbFailure(error) {
          notification.error({
            message: error.message,
            // description: error.message,
          });
        },
      });
    } else {
      notification.error({
        message: "Error",
        description: "Please select at least one child.",
      });
    }
  };

  const handleCheckboxChange = (child: any) => {
    const isSelected = selectedChildren.find((c) => c.id === child.id);
    if (isSelected) {
      setSelectedChildren(selectedChildren.filter((c) => c.id !== child.id));
    } else {
      setSelectedChildren([...selectedChildren, child]);
    }
  };

  return (
    <Modal
      loading={studentLoading}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      centered
    >
      <p className="text-[30px] bold text-center my-5">Select Child</p>
      <div className="space-y-4">
        {student?.map((child: Student) => (
          <div
            key={child.id}
            className="flex items-center justify-between mb-4 p-3 bg-[#D57D25] rounded-[14px] custom-shadow2 cursor-pointer"
            onClick={() => handleCheckboxChange(child)}
          >
            <div className="flex items-center">
              <img
                src={child?.profile_image || "/images/parent.png"}
                alt={child.first_name + " " + child.last_name}
                className="w-12 h-12 rounded-full mr-3"
              />
              <span className="text-white medium capitalize">
                {child.first_name + " " + child.last_name}
              </span>
            </div>
            <input
              type="checkbox"
              style={{ borderRadius: "50%" }}
              checked={selectedChildren.some((c) => c.id === child.id)}
              onChange={() => {}} // avoid double firing, checkbox changes handled by parent div
              className="w-5 h-5 !rounded text-orange-500 focus:ring-orange-500 pointer-events-none"
            />
          </div>
        ))}

        <div className="flex justify-center">
          <CustomButton
            title="Submit"
            loading={loading}
            className="text-[18px] h-[50px] w-[200px] mt-5"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </Modal>
  );
}

export default SelectChildModal;
