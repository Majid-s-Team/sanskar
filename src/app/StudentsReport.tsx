import HomeLayout from "../component/shared/HomeLayout";
import { Table } from "antd";
import { studentReportColumns } from "../config";

function StudentsReport() {
  return (
    <HomeLayout>
      <div className="bg-white p-5 rounded-[24.59px]">
        <div className="lg:flex justify-between mb-5">
          <p className="text-[#242424] text-[40px] semibold lg:mb-0 mb-4">
            Student 
          </p>
        </div>

        <Table
          // pagination={pagination}
          // onPaginationChange={onPaginationChange}
          columns={studentReportColumns()}
          dataSource={[]}
          pagination={false}
          // data={studentList?.students as any}
          //   loading={loading}
        />
      </div>
    </HomeLayout>
  );
}

export default StudentsReport;
