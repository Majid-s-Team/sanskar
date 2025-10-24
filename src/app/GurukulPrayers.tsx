import { Input, Pagination } from "antd";
import HomeLayout from "../component/shared/HomeLayout";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import { useRequest } from "../hooks";
import AudioPlayer from "../component/shared/AudioPlayer";

function GurukulPrayers() {
  const { data, loading, pagination, onPaginationChange } = useRequest<any>(
    "/gurukal-prayers",
    "GET",
    {
      type: "mount",
    }
  );
  return (
    <HomeLayout loading={loading}>
      <div className="bg-white p-5 rounded-[24.59px]">
        <div className="flex lg:flex-row flex-col gap-5 justify-between lg:items-center">
          <p className="text-[40px] semibold">Gurukul Prayers</p>
          <div className="flex gap-5 items-center">
            {/* <div>
              <img className="w-[25px]" src="/icons/filter.png" />
            </div> */}
            <Input
              placeholder="Search"
              className={`search-input h-[35px] lg:w-[227.28px]`}
              style={{
                borderRadius: 6,
                backgroundColor: "#F5F4F9",
                border: "none",
              }}
              prefix={<img className="w-[20px]" src="/icons/search.png" />}
            />
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-5 p-5 mt-5">
          {data?.map((item: any, index: number) => {
            if (!item?.url || !item?.url.endsWith(".mp3")) return null;
            return (
              <div key={index} className="space-y-3">
                <p className="text-[24px] semibold capitalize">{item.text}</p>
                <AudioPlayer url={item.url} />
              </div>
            );
          })}
        </div>
        <Pagination
          onChange={(page: number, pageSize: number) =>
            onPaginationChange({ current: page, pageSize })
          }
          {...pagination}
          className="mt-5 flex justify-end"
        />
      </div>
    </HomeLayout>
  );
}

export default withAuthGuard(GurukulPrayers);
