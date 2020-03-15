import React, { useEffect } from 'react';
import {
  NextPrevPage,
  PageNumber,
  PageNumbersWrapper
} from './Pagination.styles';
import LinkAnchor from '../LinkAnchor/LinkAnchor';
import Router, { useRouter } from 'next/router';

interface Props {
  total?: number;
  setNewState: React.Dispatch<React.SetStateAction<any>>;
  take: number;
  page: number;
}

const Pagination: React.FC<Props> = ({
  total = 0,
  setNewState,
  take,
  page
}) => {
  const { pathname } = useRouter();
  const totalPages = Math.ceil(total / take);

  useEffect(() => {
    if (page > totalPages) {
      Router.push(pathname);
    }
    setNewState((state: any) => ({
      ...state,
      skip: take * page - take
    }));
  }, [take, total, page]);

  return totalPages >= 1 ? (
    <PageNumbersWrapper>
      <LinkAnchor
        scroll={false}
        href={{
          pathname,
          query: {
            page: page - 1 || 1
          }
        }}
      >
        <NextPrevPage>&lt;</NextPrevPage>
      </LinkAnchor>
      <PageNumber>
        {page} of {totalPages}
      </PageNumber>
      <LinkAnchor
        scroll={false}
        href={{
          pathname,
          query: {
            page: totalPages > page ? page + 1 : totalPages
          }
        }}
      >
        <NextPrevPage>&gt;</NextPrevPage>
      </LinkAnchor>
    </PageNumbersWrapper>
  ) : null;
};

export default Pagination;
