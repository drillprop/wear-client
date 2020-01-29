import React from 'react';
import {
  PageNumber,
  PageNumbersWrapper,
  NextPrevPage
} from './Pagination.styles';

interface Props {
  total?: number;
  take: number;
  skip: number;
}

const Pagination: React.FC<Props> = ({ total, take, skip }) => {
  const tot = total || 0;
  const totalPages = Math.ceil(tot / take);
  const pageNumber = skip / take + 1 || 1;

  const changePage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { textContent } = e.currentTarget;
    if (textContent === '>') {
      // increase
    } else {
      //decrease
    }
  };
  return (
    <PageNumbersWrapper>
      <NextPrevPage onClick={changePage}>&lt;</NextPrevPage>
      <PageNumber>
        {pageNumber} of {totalPages}
      </PageNumber>
      <NextPrevPage onClick={changePage}>&gt;</NextPrevPage>
    </PageNumbersWrapper>
  );
};

export default Pagination;
