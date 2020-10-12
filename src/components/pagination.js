/* eslint-disable no-plusplus */
import React from "react";
import PropTypes from "prop-types";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export const Paginate = ({
  postPerPage,
  totalPosts,
  paginate,
  currentPage
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination aria-label="Page navigation example">
      {currentPage === 1 ? null : (
        <PaginationItem>
          <PaginationLink
            style={{ color: "black" }}
            previous
            href="#"
            onClick={() => paginate(currentPage - 1)}
          />
        </PaginationItem>
      )}
      {pageNumbers.map(number => (
        <>
          <PaginationItem
            key={number}
            active={currentPage === number ? true : false}
            className="page-item"
          >
            <PaginationLink
              key={number}
              href="#"
              onClick={() => paginate(number)}
              style={{ color: "black" }}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        </>
      ))}
      {pageNumbers.length > 1 && currentPage !== pageNumbers.pop() ? (
        <PaginationItem>
          <PaginationLink
            style={{ color: "black" }}
            next
            href="#"
            onClick={() => paginate(currentPage + 1)}
          />
        </PaginationItem>
      ) : null}
    </Pagination>
  );
};

Paginate.propTypes = {
  postPerPage: PropTypes.number,
  totalPosts: PropTypes.number,
  paginate: PropTypes.func,
  currentPage: PropTypes.number
};
