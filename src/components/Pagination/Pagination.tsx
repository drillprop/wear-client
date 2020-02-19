import React from 'react';
import {
  NextPrevPage,
  PageNumber,
  PageNumbersWrapper
} from './Pagination.styles';

interface Props {
  total?: number;
  take: number;
  skip: number;
  changePage: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Pagination: React.FC<Props> = ({ total = 0, take, skip, changePage }) => {
  const pageNumber = Math.ceil(skip / take + 1 || 1);
  const totalPages = Math.ceil(total / take);

  return totalPages >= 1 ? (
    <PageNumbersWrapper>
      <NextPrevPage onClick={changePage}>&lt;</NextPrevPage>
      <PageNumber>
        {pageNumber} of {totalPages}
      </PageNumber>
      <NextPrevPage onClick={changePage}>&gt;</NextPrevPage>
    </PageNumbersWrapper>
  ) : null;
};

export default Pagination;
