import ReactPlayer from "react-player";
import { getFileIcon } from "../../helper";
import { Link } from "lucide-react";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Popconfirm } from "antd";

const validVideoTypes = [".mp4", ".mov", ".mkv", ".avi", ".webm"];
function MediaCard({
  data,
  handleView,
  openAttachment,
  onDelete,
  onEdit,
  role,
}: any) {
  const isVideo = (url: string) =>
    validVideoTypes.some((ext) => url?.includes(ext));
  return (
    <div className="grid lg:grid-cols-3 gap-8 my-10">
      {data?.map((item: any, index: number) => {
        const Icon = getFileIcon(item.url);
        return (
          <div
            key={index}
            className="rounded-xl bg-[#F1F2F1] p-4 text-center h-[250px] flex flex-col justify-center items-center"
          >
            {isVideo(item.url) ? (
              <ReactPlayer
                width="100%"
                height={"80%"}
                controls
                src={item.url}
              />
            ) : item.attachment_url ? (
              <Link
                className="text-gray-700 bg-gray-200 p-4 rounded-[20px] cursor-pointer"
                size={60}
                onClick={() => openAttachment(item.attachment_url)}
              />
            ) : (
              <Icon
                size={60}
                className="text-gray-700 bg-gray-200 p-4 rounded-[20px] cursor-pointer"
                onClick={
                  item.attachment_url
                    ? () => openAttachment(item.attachment_url)
                    : () => handleView(item.url)
                }
              />
            )}
            <h3 className="mt-2 semibold text-[18px] capitalize">
              {item.title}
            </h3>
            <p className="text-[10px] regular capitalize">{item.description}</p>
            {role === "teacher" && (
              <div className="flex gap-5 mt-5">
                <EditFilled
                  className="text-[18px] text-[#d57d26]"
                  onClick={() => onEdit(item)}
                />
                <Popconfirm
                  title="Are you sure you want to delete this media?"
                  onConfirm={() => onDelete(item.id)}
                >
                  <DeleteFilled className="text-[18px] text-[#d57d26]" />
                </Popconfirm>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default MediaCard;
