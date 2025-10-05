import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, onPageChange }: PaginationProps) {
  // TODO: Podaj totalPages z fetchNotes (np. przez props albo context)
  const totalPages = 5;

  if (totalPages <= 1) return null;

  return (
    <ReactPaginate
      containerClassName={css.pagination}
      activeClassName={css.active}
      pageCount={totalPages}
      forcePage={currentPage - 1}
      onPageChange={(selected) => onPageChange(selected.selected + 1)}
    />
  );
}

export default Pagination;
