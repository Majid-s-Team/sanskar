import { Pagination } from "antd";
import HomeLayout from "../component/shared/HomeLayout";
import { useState, useCallback } from "react";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import { useRequest } from "../hooks";
import ViewDetails from "../component/shared/ViewDetails";
import MediaCard from "../component/shared/MediaCard";

function GurukulMultimedia() {
  const [open2, setOpen2] = useState(false);
  const [record, setRecord] = useState<any | null>(null);

  const { data, loading, pagination, onPaginationChange } = useRequest<any[]>(
    "/multimedia",
    "GET",
    {
      params: { type: "admin" },
      type: "mount",
    },
  );

  const handleView = useCallback((item: any) => {
    setRecord(item);
    setOpen2(true);
  }, []);

  const openAttachment = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <HomeLayout loading={loading}>
      <div className="bg-white p-5 rounded-[24.59px]">
        <div className="flex lg:flex-row flex-col gap-5 justify-between lg:items-center">
          <p className="text-[30px] semibold">Gurukul Multimedia</p>
        </div>

        {/* <div className="grid lg:grid-cols-3 gap-8 my-10">
          {data?.map((item, index) => {
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
                ) : // <img
                //   onClick={
                //     item.attachment_url
                //       ? () => openAttachment(item.attachment_url)
                //       : () => handleView(item.url)
                //   }
                //   className="w-[81.96px] h-[81.96px] mb-5 mx-auto cursor-pointer"
                //   src="/icons/pdf.png"
                //   alt="pdf"
                // />
                item.attachment_url ? (
                  <Link
                    className="text-gray-700 bg-gray-200 p-4 rounded-[20px] cursor-pointer"
                    size={60}
                    onClick={() => openAttachment(item.attachment_url)}
                  />
                ) : (
                  <Icon
                    size={60}
                    className="text-gray-700 bg-gray-200 p-4 rounded-[20px] cursor-pointer"
                    onClick={() => handleView(item.url)}
                  />
                )}

                <h3 className="mt-2 semibold text-[20px] capitalize">
                  {item.title}
                </h3>
                <p className="text-[12px] regular capitalize">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div> */}
        <MediaCard
          data={data}
          handleView={handleView}
          openAttachment={openAttachment}
        />
        {data && data?.length > 0 && (
          <div className="flex justify-center mt-5">
            <Pagination
              onChange={(page: number, pageSize: number) =>
                onPaginationChange({ current: page, pageSize })
              }
              {...pagination}
            />
          </div>
        )}
        {data?.length === 0 && (
          <div className="text-center h-[70vh] flex justify-center items-center">
            <p className="semibold text-[20px]">No media found</p>
          </div>
        )}
      </div>

      {open2 && (
        <ViewDetails
          open={open2}
          onClose={() => setOpen2(false)}
          data={record}
        />
      )}
    </HomeLayout>
  );
}

export default withAuthGuard(GurukulMultimedia);
