import { Pagination } from "antd";
import HomeLayout from "../component/shared/HomeLayout";
import { useState, useCallback } from "react";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import { useRequest } from "../hooks";
import ReactPlayer from "react-player";
import ViewDetails from "../component/shared/ViewDetails";

const validVideoTypes = [".mp4", ".mov", ".mkv", ".avi", ".webm"];

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

  const isVideo = (url: string) =>
    validVideoTypes.some((ext) => url?.includes(ext));

  const openAttachment = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <HomeLayout loading={loading}>
      <div className="bg-white p-5 rounded-[24.59px]">
        <div className="flex lg:flex-row flex-col gap-5 justify-between lg:items-center">
          <p className="text-[30px] semibold">Gurukul Multimedia</p>

          {/* <Input
            placeholder="Search"
            className="search-input h-[35px] lg:w-[227.28px]"
            style={{
              borderRadius: 6,
              backgroundColor: "#F5F4F9",
              border: "none",
            }}
            prefix={<img className="w-[20px]" src="/icons/search.png" />}
          /> */}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 my-10">
          {data?.map((item, index) => (
            <div
              key={index}
              className="rounded-xl bg-[#F1F2F1] p-4 text-center h-full flex flex-col justify-center items-center"
            >
              {isVideo(item.url) ? (
                <ReactPlayer
                  width="100%"
                  height={"100%"}
                  controls
                  src={item.url}
                />
              ) : (
                <img
                  onClick={
                    item.attachment_url
                      ? () => openAttachment(item.attachment_url)
                      : () => handleView(item.url)
                  }
                  className="w-[81.96px] h-[81.96px] mb-5 mx-auto cursor-pointer"
                  src="/icons/pdf.png"
                  alt="pdf"
                />
              )}

              <h3 className="mt-2 semibold text-[18px] capitalize">
                {item.title}
              </h3>
              <p className="text-[10px] regular capitalize">
                {item.description}
              </p>
            </div>
          ))}
        </div>
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
