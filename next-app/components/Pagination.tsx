'use client';

export function Pagination({
  currentPage,
  totalPages,
  onChangePage,
}: {
  currentPage: number;
  totalPages: number;
  onChangePage: (page: number) => void;
}) {
  return (
    <div className="flex gap-4 justify-center items-center mt-4 text-[#636363]">
      <button
        disabled={currentPage === 1}
        onClick={() => onChangePage(currentPage - 1)}
        className="cursor-pointer px-3 py-1 bg-white/20 rounded disabled:opacity-0 disabled:cursor-auto"
      >
        Prev
      </button>

      <span className="font-semibold">
        Page {currentPage} / {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onChangePage(currentPage + 1)}
        className="cursor-pointer px-3 py-1 bg-white/20 rounded disabled:opacity-0 disabled:cursor-auto"
      >
        Next
      </button>
    </div>
  );
}
