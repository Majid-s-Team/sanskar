import { useEffect, useState } from "react";
import { DatePicker, notification, Select, Spin } from "antd";
import { Link, useLocation } from "react-router-dom";
import HomeLayout from "../component/shared/HomeLayout";
import TableData from "../component/shared/Table";
import ViewDetails from "../component/shared/ViewDetails";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import { useRequest } from "../hooks/useRequest";
import { archivedColumns, myClassColumns, otherClassColumns } from "../config";
import { optionpPicker } from "../helper";

const tabs = [
  {
    id: 1,
    label: "My Class Updates",
    columns: myClassColumns,
    url: "/weekly-updates",
  },
  { id: 2, label: "Other Class Updates", columns: otherClassColumns },
  { id: 3, label: "Archived", columns: archivedColumns, url: "/teachers" },
];

function ArchivedTable() {
  const { state } = useLocation();
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState<any>();
  const [rangeDate, setRangeDate] = useState<any>(null);
  const [selectedFilter, setSelectedFilter] = useState<number | undefined>();
  const [active, setActive] = useState<number>(
    typeof state === "number" && tabs.some((t) => t.id === state) ? state : 1,
  );

  const activeTab = tabs.find((t) => t.id === active)!;

  /** 🔹 Requests Setup */
  const {
    data,
    loading,
    setData,
    pagination: paginationMain,
    onPaginationChange: onPaginateMain,
    execute: executeSearch,
  } = useRequest("/weekly-updates", "GET", {
    type: "mount",
    // params: active === 2 ? { other: true } : {},
  });

  const {
    data: otherClassData,
    loading: otherClassLoading,
    pagination: otherClassPagination,
    onPaginationChange: onPaginateOther,
    execute: executeSearchOther,
  } = useRequest("/weekly-updates", "GET", {
    type: "mount",
    params: { other: true, gurukal_id: selectedFilter },
  });

  const {
    data: archivedData,
    pagination: paginationArchived,
    onPaginationChange: onPaginateArchived,
    setData: setArchivedData,
    execute: getArchivedData,
    loading: archivedLoading,
  } = useRequest("/weekly-updates/bookmark/list", "GET", {
    type: "mount",
    params: {
      gurukal_id: selectedFilter,
    },
  });

  const { execute: deleteUpdate, loading: deleteLoading } = useRequest(
    "/weekly-updates",
    "DELETE",
    {},
  );
  const { execute: archiveUpdate, loading: archiveLoading } = useRequest(
    "/weekly-updates",
    "POST",
    {},
  );
  const { execute: unarchiveUpdate, loading: unarchiveLoading } = useRequest(
    "/weekly-updates",
    "DELETE",
    {},
  );

  const { data: gurukalClassData } = useRequest<any>("/gurukal", "GET", {
    type: "mount",
  });

  /** 🔹 Handlers */
  const handleDownload = (url: string, name: string) => {
    const link = Object.assign(document.createElement("a"), {
      href: url,
      target: "_blank",
      download: name,
    });
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleViewDetails = (item: any) => {
    setDetails(item);
    setOpen(true);
  };

  const handleDelete = (id: string) =>
    deleteUpdate({
      routeParams: String(id),
      cbSuccess: () =>
        setData((prev: any[]) => prev.filter((i) => i.id !== id)),
      cbFailure: (err) =>
        notification.error({ message: "Error", description: err.message }),
    });

  const handleArchive = (id: string) =>
    archiveUpdate({
      routeParams: `${id}/bookmark`,
      // cbSuccess: () =>
      //   setData((prev: any[]) => prev.filter((i) => i.id !== id)),
      cbFailure: (err) =>
        notification.error({ message: "Error", description: err.message }),
    });

  const handleUnArchive = (id: string) =>
    unarchiveUpdate({
      routeParams: `${id}/unbookmark`,
      cbSuccess: () =>
        setArchivedData((prev: any[]) => prev.filter((i) => i.id !== id)),
      cbFailure: (err) =>
        notification.error({ message: "Error", description: err.message }),
    });

  /** 🔹 Effects */
  useEffect(() => {
    const params =
      rangeDate?.[0] && rangeDate?.[1]
        ? {
            start_date: rangeDate[0].format("YYYY-MM-DD"),
            end_date: rangeDate[1].format("YYYY-MM-DD"),
          }
        : {};
    const params2 = {
      other: true,
      start_date: rangeDate?.[0]?.format("YYYY-MM-DD"),
      end_date: rangeDate?.[1]?.format("YYYY-MM-DD"),
    };

    if (active === 2)
      executeSearchOther({
        type: "mount",
        params: { ...params2, gurukal_id: selectedFilter },
      });
    if (active === 1) executeSearch({ type: "mount", params });
    else if (active === 3)
      getArchivedData({
        type: "mount",
        params: { ...params, gurukal_id: selectedFilter },
      });
  }, [rangeDate, selectedFilter]);

  console.log(selectedFilter, "se");

  useEffect(() => {
    if (active === 1) {
      executeSearch({ type: "mount" });
    } else if (active === 3) {
      getArchivedData({ type: "mount" });
    } else if (active === 2) {
      executeSearchOther({ type: "mount" });
    }
  }, [active]);

  /** 🔹 Table Configuration */
  const getColumns = () => {
    const handlers = { handleDownload, handleViewDetails };
    if (active === 1)
      return myClassColumns({ ...handlers, handleArchive, handleDelete });
    if (active === 2) return otherClassColumns({ ...handlers, handleArchive });
    return archivedColumns({ ...handlers, handleUnArchive });
  };

  const tableData =
    active === 3 ? archivedData : active === 2 ? otherClassData : data;
  const pagination =
    active === 3
      ? paginationArchived
      : active === 2
        ? otherClassPagination
        : paginationMain;
  const onPaginate =
    active === 3
      ? onPaginateArchived
      : active === 2
        ? onPaginateOther
        : onPaginateMain;

  const loadingState = loading || archivedLoading || otherClassLoading;

  useEffect(() => {
    setRangeDate(null);
    setSelectedFilter(undefined);
  }, [activeTab]);

  /** 🔹 UI */
  return (
    <HomeLayout>
      {/* Tabs */}
      <div className="w-full overflow-x-auto lg:flex items-center hide-scrollbar">
        <div className="flex gap-5 items-center h-[150px] whitespace-nowrap px-4 mx-auto">
          {tabs.map((tab) => (
            <p
              key={tab.id}
              onClick={() => setActive(tab.id)}
              style={{
                boxShadow:
                  active === tab.id
                    ? "0px 10.87px 32.62px 0px #FF993A66"
                    : "none",
              }}
              className={`semibold p-5 rounded-[21.75px] cursor-pointer ${
                active === tab.id
                  ? "text-white bg-[#D57D25] text-xl scale-105 transition-transform"
                  : "text-[#242424] border border-[#CCCCCC] bg-white text-lg"
              }`}
            >
              {tab.label}
            </p>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-5 rounded-[24.59px] ">
        {loadingState ? (
          <div className="flex justify-center items-center bg-white h-[80vh] ">
            <Spin size="large" />
          </div>
        ) : (
          <TableData
            columns={getColumns()}
            // scroll={active === 1 ? 1000 : 800}
            data={tableData as any}
            loading={deleteLoading || archiveLoading || unarchiveLoading}
            title={activeTab.label}
            pagination={pagination}
            onPaginationChange={onPaginate}
            input={
              <div className="flex lg:flex-row flex-col gap-5 items-center">
                {active !== 1 && (
                  <Select
                    style={{ width: 150 }}
                    options={optionpPicker(gurukalClassData as any)}
                    value={selectedFilter}
                    onChange={(value) => {
                      setSelectedFilter(value);
                    }}
                  />
                )}
                <DatePicker.RangePicker
                  onChange={setRangeDate}
                  format="MM-DD-YYYY"
                  style={{
                    borderRadius: 6,
                    backgroundColor: "#F5F4F9",
                    border: "none",
                  }}
                  value={rangeDate}
                  className="search-input h-[47px] w-full lg:w-[300px]"
                  allowClear
                />
                {active === 1 && (
                  <Link
                    to="/add-weekly-updates"
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
        )}
      </div>

      {/* View Details Modal */}
      {open && (
        <ViewDetails
          open={open}
          onClose={() => setOpen(false)}
          data={details}
        />
      )}
    </HomeLayout>
  );
}

export default withAuthGuard(ArchivedTable);
