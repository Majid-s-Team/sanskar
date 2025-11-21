import { Link } from "react-router-dom";
import HomeLayout from "../component/shared/HomeLayout";
import { useRequest } from "../hooks/useRequest";
import { Spin } from "antd";

function EarlyPickupReq() {
  const { data: allRequests, loading } = useRequest<any[]>(
    "/teacher/early-pickup",
    "GET",
    {
      type: "mount",
    }
  );

  return (
    <HomeLayout>
      <div className="bg-white p-5 rounded-[24.59px]">
        <div className="flex lg:flex-row flex-col gap-5 lg:justify-between items-center  ">
          <p className="lg:text-[40px] text-[24px] semibold">
            Early Pick-up Request
          </p>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Spin tip="Loading" size="large" />
          </div>
        ) : (
          <div className="mt-8">
            {allRequests && allRequests?.length > 0 ? (
              <div className="space-y-5">
                {allRequests?.map((item: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="flex lg:flex-row flex-col lg:text-left text-center items-center gap-2 lg:gap-5 border border-[#ECECEC] p-5 rounded-[20px]"
                    >
                      <img
                        className="w-[50px]"
                        src={"/icons/wallet.png"}
                        alt=""
                      />
                      <div>
                        <p className="text-[16px] semibold !text-black capitalize">
                          {item?.student?.first_name +
                            " " +
                            item?.student?.last_name}
                        </p>
                        <p className="text-[14px] text-[#A6A6A6] regular capitalize">
                          Status: {item?.status}
                        </p>
                      </div>
                      <div className="flex-1"></div>
                      <Link
                        to={`/early-pickup-details/${item?.id}`}
                        state={item}
                        className="flex items-center gap-2 bg-[#D57D25] p-4 rounded-[12px]"
                      >
                        <img className="w-[20px]" src="/icons/doc.png" alt="" />
                        <p className="text-[16px] semibol text-white">
                          View Details
                        </p>
                      </Link>
                    </div>
                  );
                })}
                {/* <Pagination
                  onChange={(page: number, pageSize: number) =>
                    onPaginationChange({ current: page, pageSize })
                  }
                  {...pagination}
                  className="mt-5 flex justify-end"
                /> */}
              </div>
            ) : (
              <div className="text-center flex items-center justify-center">
                <p className="text-[20px] text-[#A6A6A6] regular capitalize">
                  No requests available
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </HomeLayout>
  );
}

export default EarlyPickupReq;
