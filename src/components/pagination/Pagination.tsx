// components/pagination/Pagination.tsx
import { FC } from "react";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <div className={styles.pagination}>
      <button 
        onClick={() => {
          console.log("Previous clicked, currentPage:", currentPage);
          onPageChange(currentPage - 1);
        }} 
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {pages.map(page => (
        <button
          key={page}
          onClick={() => {
            console.log("Page clicked:", page);
            onPageChange(page);
          }}
          className={currentPage === page ? styles.active : ''}
        >
          {page + 1} 
        </button>
      ))}
      
      <button 
        onClick={() => {
          console.log("Next clicked, currentPage:", currentPage);
          onPageChange(currentPage + 1);
        }} 
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};