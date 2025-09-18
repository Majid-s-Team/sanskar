import { Modal } from "antd";

function ViewDetails({ open, onClose, data }: any) {
  console.log(data);

  const renderContent = () => {
    // if (type === "Selfie") {
    //   return info?.image ? (
    //     <img className="w-full h-full rounded" src={info.image} alt="Selfie" />
    //   ) : (
    //     <NoData />
    //   );
    // }

    // if (type === "Passport") {
    //   return info?.card_back_image_url && info?.card_front_image_url ? (
    //     <div className="space-y-4">
    //       <img
    //         className="w-full h-[200px] rounded"
    //         src={info.card_back_image_url}
    //         alt="Passport Back"
    //       />
    //       <img
    //         className="w-full h-[200px] rounded"
    //         src={info.card_front_image_url}
    //         alt="Passport Front"
    //       />
    //     </div>
    //   ) : (
    //     <NoData />
    //   );
    // }

    if (data) {
      return /\.(jpg|jpeg|png)$/i.test(data) ? (
        <img className="w-full h-full rounded" src={data} alt="Uploaded File" />
      ) : (
        <embed src={data} type="application/pdf" width="100%" height="600px" />
      );
    }

    return <NoData />;
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={"View Details"}
      centered
      className="white-modal"
    >
      <div className="mt-4">{renderContent()}</div>
    </Modal>
  );
}

const NoData = () => <p className="text-center text-[20px] medium">No Data</p>;

export default ViewDetails;
