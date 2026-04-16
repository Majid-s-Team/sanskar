import { Select } from "antd";
import { withAuthGuard } from "../component/higherOrder/withAuth";
import HomeLayout from "../component/shared/HomeLayout";
import TableData from "../component/shared/Table";
import { teacherRequestColumns } from "../config";
import { useEffect, useState } from "react";
import { useRequest } from "../hooks";
import TeacherReqModal from "../component/partial/TeacherReqModal";

function AllRequest() {
  const [filter, setFilter] = useState<string>("fuel");
  const [selectedFilter, setSelectedFilter] = useState<any>(undefined);
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState<any | null>(null);

  const {
    data,
    loading,
    pagination,
    onPaginationChange,
    execute: searchExecute
  } = useRequest<any[]>("/teacher-requests", "GET", {
    type: "mount",
    params: {
      type: filter,
    },
  });

  const handleRecord = (record: any) => {
    setOpen(true);
    setRecord(record);
  };

  //   const { execute: deleteAbsent, loading: deleteAbsentLoading } = useRequest(
  //     "/absent-requests",
  //     "DELETE",
  //     {
  //       type: "delay",
  //     },
  //   );

  //   const handleDelete = (id: string) => {
  //     deleteAbsent({
  //       routeParams: String(id),
  //       cbSuccess: () => {
  //         setData((p: any) => p.filter((item: any) => item.id !== id));
  //       },
  //     });
  //   };

  console.log(setFilter);

  useEffect(() => {
    if (selectedFilter) {
      searchExecute({
        type: "mount",
        params: selectedFilter === "all" ? {} : { status: selectedFilter },
      });
    }
  }, [selectedFilter]);

  useEffect(() => {
    if (filter) {
      searchExecute({
        type: "mount",
        params: { type: filter },
      });
    }
  }, [filter]);

  return (
    <HomeLayout>
      <div className="bg-white p-5 rounded-[24.59px]">
        <TableData
          columns={teacherRequestColumns({
            handleRecord,
          })}
          pagination={pagination}
          onPaginationChange={onPaginationChange}
          loading={loading}
          // @ts-ignore
          data={data?.fuel_requests as any}
          title="All Requests"
          input={
            <div className="flex items-center gap-3">
              <Select
                style={{ width: 150 }}
                options={[
                  {
                    value: "all",
                    label: "All",
                  },
                  {
                    value: "pending",
                    label: "Pending",
                  },
                  {
                    value: "approved",
                    label: "Approved",
                  },
                  {
                    value: "rejected",
                    label: "Rejected",
                  },
                ]}
                value={selectedFilter}
                defaultValue="all"
                onChange={(e) => setSelectedFilter(e)}
              />
              <Select
                // style={{ width: 200 }}
                options={[
                  {
                    value: "fuel",
                    label: "Expense Reimbursement",
                  },
                  {
                    value: "arts_crafts",
                    label: "Art and Craft",
                  },
                ]}
                value={filter}
                defaultValue="csv"
                onChange={(e) => setFilter(e)}
              />
            </div>
          }
        />
      </div>
      {open && (
        <TeacherReqModal
          open={open}
          onClose={() => setOpen(false)}
          record={record}
        />
      )}
    </HomeLayout>
  );
}

export default withAuthGuard(AllRequest);
