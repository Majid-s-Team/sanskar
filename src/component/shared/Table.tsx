import { Table, TablePaginationConfig } from "antd";
import { CustomPagination } from "./CustomPagination";
// import { ColumnType } from "antd/es/table";
interface TableDataProps<T = Record<string, unknown>> {
  columns: any[];
  data: T[];
  input?: React.ReactNode;
  title?: string;
  onClick?: (row: T) => void;
  pagination?: false | TablePaginationConfig | null | undefined;
  onPaginationChange?: (
    pagination: TablePaginationConfig,
    filters: Record<string, any>,
    sorter: any // Can be refined further if sorter structure is known
  ) => void;
  loading?: boolean;
}

export default function TableData({
  columns,
  data,
  input,
  title,
  onClick,
  pagination,
  onPaginationChange,
  loading,
}: TableDataProps) {
  return (
    <div>
      <div className="lg:flex justify-between mb-5">
        <p className="text-[#242424] text-[30px] semibold lg:mb-0 mb-4">
          {title}
        </p>
        <div className="flex items-center gap-5">{input}</div>
      </div>
      <div className="border-l border-r border-[#E0E0E0] rounded-[12px] overflow-hidden">
        <Table
          scroll={{ x: 800 }}
          columns={columns}
          dataSource={data}
          loading={loading}
          onRow={(row) => ({
            onClick: (event) => {
              const td = (event.target as HTMLElement).closest("td");
              if (td) {
                const cellIndex = td.parentNode
                  ? Array.from(td.parentNode.children).indexOf(td)
                  : -1;
                if (columns[cellIndex]?.dataIndex === "actions") {
                  event.stopPropagation();
                } else {
                  onClick?.(row);
                }
              }
            },
          })}
          pagination={false}
          onChange={onPaginationChange}
        />
      </div>
      <CustomPagination
        current={(pagination === false ? 1 : pagination?.current) || 1}
        total={(pagination as TablePaginationConfig)?.total || 1}
        onChange={(page) => {
          onPaginationChange?.({ ...pagination, current: page }, {}, {});
        }}
        pageSize={(pagination as TablePaginationConfig)?.pageSize || 10}
      />
    </div>
  );
}
