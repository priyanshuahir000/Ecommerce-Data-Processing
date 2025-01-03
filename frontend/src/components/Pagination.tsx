import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationModalProps = {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
};

export function PaginationModal({
  page,
  setPage,
  totalPages,
}: PaginationModalProps) {
  const handlePageChange = (currentPage: number) => () => {
    if (currentPage < 1 || currentPage > totalPages) return;
    setPage(currentPage);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={page == 1 ? "cursor-not-allowed" : ""}
            onClick={(e) => {
              if (page === 1) {
                e.preventDefault();
              } else {
                setPage(page - 1);
              }
            }}
            href="#"
          />
        </PaginationItem>
        {page === 1 && (
          <>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive
                onClick={handlePageChange(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" onClick={handlePageChange(page + 1)}>
                {page + 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" onClick={handlePageChange(page + 2)}>
                {page + 2}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" onClick={handlePageChange(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        {page !== 1 && page !== totalPages && (
          <>
            <PaginationItem>
              <PaginationLink href="#" onClick={handlePageChange(page - 1)}>
                {page - 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive
                onClick={handlePageChange(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" onClick={handlePageChange(page + 1)}>
                {page + 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" onClick={handlePageChange(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        {page === totalPages && (
          <>
            <PaginationItem>
              <PaginationLink href="#" onClick={handlePageChange(1)}>
                {1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" onClick={handlePageChange(page - 2)}>
                {page - 2}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" onClick={handlePageChange(page - 1)}>
                {page - 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive
                onClick={handlePageChange(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationNext
            href="#"
            className={page == totalPages ? "cursor-not-allowed" : ""}
            onClick={(e) => {
              if (page === totalPages) {
                e.preventDefault();
              } else {
                setPage(page + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
