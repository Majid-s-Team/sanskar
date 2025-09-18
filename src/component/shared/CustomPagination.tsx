export const CustomPagination = ({
  current = 1,
  total = 1,
  onChange,
  pageSize = 10,
}: {
  current: number;
  total: number;
  onChange: (page: number) => void;
  pageSize?: number;
}) => {
  return (
    <div className="flex justify-between items-center px-4 py-2 mt-5">
      <button
        className="border border-[#DEDEDE] px-4 py-1 rounded-[6.15px] text-[#404040] regular cursor-pointer !bg-white"
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
      >
        Previous
      </button>

      <span className="text-[#CBCCCD] semibold text-[14px]">
        Page {current} of {Math.ceil(total / pageSize)}
      </span>

      <button
        className="border border-[#DEDEDE] px-4 py-1 rounded-[6.15px] !bg-white text-[#404040] regular cursor-pointer"
        disabled={current === total}
        onClick={() => onChange(current + 1)}
      >
        Next
      </button>
    </div>
  );
};
