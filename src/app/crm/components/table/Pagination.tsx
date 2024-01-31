import React from 'react';
import { Button } from 'designSystem/Buttons/Buttons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  hasNextPage,
  onPageChange,
  onNextPage,
  onPreviousPage,
}) => {
  return (
    <div className="flex justify-end mt-8 gap-4 mr-4">
      <Button
        onClick={() => {
          if (currentPage === 1) return;
          onPageChange(currentPage - 1);
          onPreviousPage();
        }}
        disabled={currentPage === 1}
      >
        Anterior
      </Button>
      <span className="mr-2">
        Página {currentPage} de {totalPages}
      </span>
      <Button
        onClick={() => {
          onNextPage();
          onPageChange(currentPage + 1);
        }}
        disabled={!hasNextPage}
      >
        Siguiente
      </Button>
    </div>
  );
};

export default Pagination;
