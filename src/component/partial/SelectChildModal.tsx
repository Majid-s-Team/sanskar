import { Modal } from "antd";
import { useState } from "react";
import CustomButton from "../shared/CustomButton";
import { useNavigate } from "react-router-dom";

type Props = {
  isModalOpen: boolean;
  handleCancel: () => void;
};

function SelectChildModal({ isModalOpen, handleCancel }: Props) {
  const navigate = useNavigate();
  const [selectedChildren, setSelectedChildren] = useState<any[]>([]); // array for multiple

  const children = [
    { id: 1, name: "Child1", image: "/images/parent.png" },
    { id: 2, name: "Child2", image: "/images/parent.png" },
  ];

  const handleSubmit = () => {
    if (selectedChildren.length > 0) {
      console.log("Selected Children:", selectedChildren);
      navigate("/events-rsvp");
    } else {
      alert("Please select at least one child");
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
    <Modal open={isModalOpen} onCancel={handleCancel} footer={null} centered>
      <p className="text-[30px] bold text-center my-5">Select Child</p>
      <div className="space-y-4">
        {children.map((child) => (
          <div
            key={child.id}
            className="flex items-center justify-between mb-4 p-3 bg-[#D57D25] rounded-[14px] custom-shadow2 cursor-pointer"
            onClick={() => handleCheckboxChange(child)}
          >
            <div className="flex items-center">
              <img
                src={child.image}
                alt={child.name}
                className="w-12 h-12 rounded-full mr-3"
              />
              <span className="text-white font-medium">{child.name}</span>
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
            className="text-[18px] h-[50px] w-[200px] mt-5"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </Modal>
  );
}

export default SelectChildModal;
