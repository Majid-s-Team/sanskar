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
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="flex justify-between items-center px-4 py-2 mt-5">
      <button
        className="border border-[#DEDEDE] px-4 py-1 rounded-[6.15px] text-[#404040] regular cursor-pointer !bg-white disabled:opacity-50"
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
      >
        Previous
      </button>

      <span className="text-[#CBCCCD] semibold text-[14px]">
        Page {current} of {totalPages}
      </span>

      <button
        className="border border-[#DEDEDE] px-4 py-1 rounded-[6.15px] !bg-white text-[#404040] regular cursor-pointer disabled:opacity-50"
        disabled={current === totalPages}
        onClick={() => onChange(current + 1)}
      >
        Next
      </button>
    </div>
  );
};
