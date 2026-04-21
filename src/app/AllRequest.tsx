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
  const [status, setStatus] = useState<string>("all");
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState<any | null>(null);

  const { data, loading, pagination, onPaginationChange, execute } = useRequest<
    any[]
  >("/teacher-requests", "GET", {
    type: "delay",
  });

  const handleRecord = (record: any) => {
    setOpen(true);
    setRecord(record);
  };

  useEffect(() => {
    execute({
      params: {
        type: filter,
        ...(status !== "all" && { status }),
      },
    });
  }, [filter, status]);

  return (
    <HomeLayout>
      <div className="bg-white p-5 rounded-[24.59px]">
        <TableData
          columns={teacherRequestColumns({ handleRecord })}
          pagination={pagination}
          onPaginationChange={onPaginationChange}
          loading={loading}
          data={data as any}
          title="All Requests"
          input={
            <div className="flex items-center gap-3">
              {/* ✅ Status Filter */}
              <Select
                style={{ width: 150 }}
                value={status}
                onChange={setStatus}
                options={[
                  { value: "all", label: "All" },
                  { value: "pending", label: "Pending" },
                  { value: "approved", label: "Approved" },
                  { value: "rejected", label: "Rejected" },
                ]}
              />

              {/* ✅ Type Filter */}
              <Select
                value={filter}
                onChange={setFilter}
                options={[
                  { value: "fuel", label: "Expense Reimbursement" },
                  { value: "arts_crafts", label: "Art and Craft" },
                  { value: "absent", label: "Absent" },
                ]}
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
