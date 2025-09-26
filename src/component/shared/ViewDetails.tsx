// import { Modal } from "antd";

// function ViewDetails({ open, onClose, data }: any) {
//   console.log(data);

//   const renderContent = () => {
//     if (data) {
//       return /\.(jpg|jpeg|png)$/i.test(data) ? (
//         <img className="w-full h-full rounded" src={data} alt="Uploaded File" />
//       ) : (
//         <embed src={data} type="application/pdf" width="100%" height="600px" />
//       );
//     }

//     return <NoData />;
//   };

//   return (
//     <Modal
//       open={open}
//       onCancel={onClose}
//       footer={null}
//       title={"View Details"}
//       centered
//       className="white-modal"
//     >
//       <div className="mt-4">{renderContent()}</div>
//     </Modal>
//   );
// }

// const NoData = () => <p className="text-center text-[20px] medium">No Data</p>;

// export default ViewDetails;

import { Modal } from "antd";

function ViewDetails({ open, onClose, data }: any) {
  const renderContent = () => {
    if (!data) return <NoData />;

    const lower = data.toLowerCase();

    // Image
    if (/\.(jpg|jpeg|png|gif|webp)$/i.test(lower)) {
      return (
        <img
          className="w-[100%] h-[400px] object-contain rounded"
          src={data}
          alt="Uploaded"
        />
      );
    }

    // PDF
    if (/\.pdf$/i.test(lower)) {
      return (
        <embed src={data} type="application/pdf" width="100%" height="600px" />
      );
    }

    // Word
    if (/\.(doc|docx)$/i.test(lower)) {
      return (
        <iframe
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
            data
          )}`}
          width="100%"
          height="600px"
          frameBorder="0"
          title="Word Document"
        />
      );
    }

    // PowerPoint
    if (/\.(ppt|pptx)$/i.test(lower)) {
      return (
        <iframe
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
            data
          )}`}
          width="100%"
          height="600px"
          frameBorder="0"
          title="PowerPoint"
        />
      );
    }

    // Video
    if (/\.(mp4|webm|ogg)$/i.test(lower)) {
      return (
        <video controls className="w-full h-[400px] rounded">
          <source src={data} type="video/mp4" />
          Your browser does not support video.
        </video>
      );
    }

    // Excel
    if (/\.(xls|xlsx|csv)$/i.test(lower)) {
      return (
        <iframe
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
            data
          )}`}
          width="100%"
          height="600px"
          frameBorder="0"
          title="Excel File"
        />
      );
    }

    // Audio
    if (/\.(mp3|wav|ogg|m4a)$/i.test(lower)) {
      return (
        <audio controls className="w-full mt-4">
          <source src={data} type="audio/mpeg" />
          Your browser does not support audio.
        </audio>
      );
    }

    // Default
    return (
      <p className="text-center text-[16px] text-gray-500">
        Unsupported file format
      </p>
    );
  };

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
      <div className="mt-4">{renderContent()}</div>
    </Modal>
  );
}

const NoData = () => <p className="text-center text-[20px] medium">No Data</p>;

export default ViewDetails;
