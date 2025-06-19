import { Table, TablePaginationConfig } from "antd";
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
              // console.log("cellIndex:", cellIndex);
              // console.log(
              //   "columns[cellIndex]?.dataIndex:",
              //   columns[cellIndex]?.dataIndex
              // );
              if (columns[cellIndex]?.dataIndex === "actions") {
                event.stopPropagation();
              } else {
                onClick?.(row);
              }
            }
          },
        })}
        pagination={pagination ?? false}
        onChange={onPaginationChange}
      />
    </div>
  );
}
