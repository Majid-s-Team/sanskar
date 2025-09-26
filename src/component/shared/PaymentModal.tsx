import { Modal } from "antd";

function PaymentModal({ open, onClose }: any) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="View Details"
      centered
      className="white-modal"
      width={800}
    >
      <p>No Data</p>
    </Modal>
  );
}

export default PaymentModal;
