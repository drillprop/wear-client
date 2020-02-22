import React, { useEffect } from 'react';
import {
  NextPrevPage,
  PageNumber,
  PageNumbersWrapper
} from './Pagination.styles';

interface Props {
  total?: number;
  setNewState: React.Dispatch<React.SetStateAction<any>>;
  state?: any;
}

const Pagination: React.FC<Props> = ({ total = 0, setNewState, state }) => {
  const { take, skip } = state;
  const pageNumber = Math.ceil(skip / take + 1 || 1);
  const totalPages = Math.ceil(total / take);

  useEffect(() => {
    setNewState({
      ...state,
      skip: 0
    });
  }, [take, total]);

  const changePage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { textContent } = e.currentTarget;
    if (textContent === '>')
      setNewState({
        ...state,
        skip: total > skip + take ? skip + take : skip
      });
    if (textContent === '<')
      setNewState({
        ...state,
        skip: Math.max(0, skip - take)
      });
  };

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
