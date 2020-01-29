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
  changePage: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Pagination: React.FC<Props> = ({ total = 0, take, skip, changePage }) => {
  const totalPages = Math.ceil(total / take);
  const pageNumber = skip / take + 1 || 1;

  return (
    <PageNumbersWrapper>
      <NextPrevPage onClick={e => (pageNumber < skip ? changePage(e) : null)}>
        &lt;
      </NextPrevPage>
      <PageNumber>
        {pageNumber} of {totalPages}
      </PageNumber>
      <NextPrevPage
        onClick={e => (pageNumber < totalPages ? changePage(e) : null)}
      >
        &gt;
      </NextPrevPage>
    </PageNumbersWrapper>
  );
};

export default Pagination;
