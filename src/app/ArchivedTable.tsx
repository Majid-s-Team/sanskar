import { useEffect, useState } from "react";
import HomeLayout from "../component/shared/HomeLayout";
import TableData from "../component/shared/Table";
import { DatePicker, Input, notification } from "antd";
import {
  myClassColumns,
  otherClassColumns,
  teacherManagementColumns,
  weeklyUpdateData,
} from "../config";
import { Link, useLocation } from "react-router-dom";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import { useRequest } from "../hooks/useRequest";
import ViewDetails from "../component/shared/ViewDetails";
import axios from "axios";
import saveAs from "file-saver";
import { useDebounce } from "../hooks";

const tabs = [
  {
    id: 1,
    label: "My Class Updates",
    columns: myClassColumns,
    url: "/weekly-updates",
  },
  {
    id: 2,
    label: "Other Class Updates",
    columns: otherClassColumns,
    url: null,
  },
  {
    id: 3,
    label: "Teacher List",
    columns: teacherManagementColumns,
    url: "/teachers",
  },
];

function ArchivedTable() {
  const { state } = useLocation();
  const [open, setOpen] = useState(false);
  const [viewDetails, setViewDetails] = useState<any>();
  const [search, setSearch] = useState<string | undefined>(undefined);
  const searchFIlter = useDebounce(search, 500);
  const [rangeDate, setRangeDate] = useState<any>(null);
  const [active, setActive] = useState<number>(() => {
    const id = typeof state === "number" ? state : 1;
    return tabs.some((tab) => tab.id === id) ? id : tabs[3].id;
  });
  const activeTab = tabs.find((tab) => tab.id === active);

  const handleTabClick = (id: number) => {
    setActive(id);
  };

  const {
    data,
    loading,
    setData,
    pagination: pagination2,
    onPaginationChange: onPaginationChange2,
    execute: searchExecute2,
  } = useRequest("/weekly-updates", "GET", {
    type: "mount",
  });

  const {
    data: teacherList,
    loading: teacherListLoading,
    pagination,
    onPaginationChange,
    execute: searchExecute,
  } = useRequest("/teachers", "GET", {
    type: "mount",
  });

  const handleDownload = async (url: string, name: string) => {
    try {
      const response = await axios.get(`${url}`, { responseType: "blob" });
      saveAs(response.data, name);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleViewDetails = (data: any) => {
    setOpen(true);
    setViewDetails(data);
  };

  const { execute: executeDelete, loading: deleteLoading } = useRequest(
    "/weekly-updates",
    "DELETE",
    {}
  );

  const handleDelete = (id: string) => {
    executeDelete({
      routeParams: String(id),
      type: "mount",
      cbSuccess: () => {
        setData((p: any[]) => p.filter((item) => item.id !== id));
      },
      cbFailure(error) {
        notification.error({
          message: "Error",
          description: error.message,
        });
      },
    });
  };

  useEffect(() => {
    if (rangeDate) {
      searchExecute2({
        type: "mount",
        params: {
          start_date: rangeDate[0].format("YYYY-MM-DD"),
          end_date: rangeDate[1].format("YYYY-MM-DD"),
        },
      });
    }
  }, [rangeDate]);

  useEffect(() => {
    if (searchFIlter && searchFIlter.trim() !== "") {
      // 🔍 search API
      searchExecute({
        type: "mount",
        params: { full_name: searchFIlter },
      });
    } else {
      // 🔄 reset full list
      searchExecute({
        type: "mount",
        params: {},
      });
    }
  }, [searchFIlter]);

  return (
    <HomeLayout>
      <div className="w-full overflow-x-auto lg:flex items-center hide-scrollbar">
        <div className="flex gap-5 items-center h-[150px] whitespace-nowrap px-4 mx-auto">
          {tabs.map((tab) => (
            <p
              key={tab.id}
              style={{
                boxShadow:
                  active === tab.id
                    ? "0px 10.87px 32.62px 0px #FF993A66"
                    : "none",
              }}
              onClick={() => handleTabClick(tab.id)}
              className={`semibold p-5 rounded-[21.75px] cursor-pointer ${
                active === tab.id
                  ? "text-white bg-[#D57D25] text-xl scale-105 transition-transform duration-300 ease-out"
                  : "text-[#242424] border border-[#CCCCCC] bg-white text-lg transition-transform duration-300 ease-in"
              }`}
            >
              {tab.label}
            </p>
          ))}
        </div>
      </div>
      <div className="bg-white p-5 rounded-[24.59px]">
        <TableData
          // @ts-ignore
          columns={
            activeTab?.id === 1
              ? myClassColumns({
                  handleDownload,
                  handleViewDetails,
                  handleDelete,
                })
              : activeTab?.columns
          }
          scroll={activeTab?.id === 1 ? 1000 : 800}
          data={
            activeTab?.id === 1
              ? data
              : activeTab?.id === 2
              ? (weeklyUpdateData as any)
              : teacherList
          }
          loading={loading || deleteLoading || teacherListLoading}
          title={
            activeTab?.id === 1
              ? activeTab?.label
              : activeTab?.id === 2
              ? activeTab?.label
              : "Teachers List"
          }
          pagination={
            activeTab?.id === 1
              ? pagination2
              : activeTab?.id === 2
              ? pagination
              : false
          }
          onPaginationChange={
            activeTab?.id === 1
              ? onPaginationChange2
              : activeTab?.id === 2
              ? undefined
              : onPaginationChange
          }
          input={
            <div className="flex lg:flex-row flex-col gap-5 items-center">
              <div className="flex gap-5 items-center">
                {/* <img className="w-[25px]" src="/icons/filter.png" /> */}
                {activeTab?.id === 1 ? (
                  <DatePicker.RangePicker
                    onChange={(e) => setRangeDate(e)}
                    style={{
                      borderRadius: 6,
                      backgroundColor: "#F5F4F9",
                      border: "none",
                    }}
                    className={`search-input h-[47px] w-full lg:w-[300px]`}
                    allowClear={true}
                  />
                ) : (
                  <Input
                    placeholder="Search"
                    className={`search-input h-[47px] w-[300px] lg:w-[227.28px]`}
                    style={{
                      borderRadius: 6,
                      backgroundColor: "#F5F4F9",
                      border: "none",
                    }}
                    onChange={
                      activeTab?.id === 3
                        ? (e) => {
                            setSearch(e.target.value);
                          }
                        : undefined
                    }
                    prefix={
                      <img className="w-[20px]" src="/icons/search.png" />
                    }
                  />
                )}
              </div>

              {activeTab?.id === 1 && (
                <Link
                  to={"/add-weekly-updates"}
                  style={{
                    backgroundImage: "url(/images/card2.png)",
                    backgroundSize: "100% 100%",
                  }}
                  className="p-4 rounded-[20px] flex gap-4 items-center shadow-[0px_9.06px_27.18px_0px_rgba(255,153,58,0.4)]"
                >
                  <img className="w-[30px]" src="/icons/plus.png" alt="" />
                  <p className="text-white text-[14px] medium">
                    Add Weekly Updates
                  </p>
                </Link>
              )}
            </div>
          }
        />
      </div>
      {open && (
        <ViewDetails
          open={open}
          onClose={() => setOpen(false)}
          data={viewDetails}
        />
      )}
    </HomeLayout>
  );
}

export default withAuthGuard(ArchivedTable);
