// components/pagination/Pagination.tsx
import { FC } from "react";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <div className={styles.pagination}>
      <div className={styles.totalPage}>{currentPage + 1} of {totalPages} Pages</div>
      <div className={styles.navigationContainer}>
        <button
          onClick={() => {
            console.log("Previous clicked, currentPage:", currentPage);
            onPageChange(currentPage - 1);
          }}
          disabled={currentPage === 0}
        >
          <p>&lt;</p>
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => {
              console.log("Page clicked:", page);
              onPageChange(page);
            }}
            className={currentPage === page ? styles.active : ""}
          >
            {page + 1}
          </button>
        ))}

        <button
          onClick={() => {
            console.log("Next clicked, currentPage:", currentPage);
            onPageChange(currentPage + 1);
          }}
          disabled={currentPage === totalPages - 1}
        >
          &gt;
        </button>
      </div>
      <div className={styles.pageOn}>
        <div className={styles.pg}>
      <p>The page on</p>
      </div>
      <select
        value={currentPage}
        onChange={(e) => onPageChange(Number(e.target.value))}
        className={styles.pageSelect}
      > 
        {pages.map((page) => (
          <option key={page} value={page}>
            {page + 1}
          </option>
        ))}
      </select>
      </div>
    </div>
  );
};
