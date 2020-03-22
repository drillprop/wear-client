import React, { useEffect, useState } from 'react';
import {
  NextPrevPage,
  PageNumber,
  PageNumbersWrapper
} from './Pagination.styles';
import LinkAnchor from '../LinkAnchor/LinkAnchor';
import { useRouter } from 'next/router';

interface Props {
  total?: number;
  refetch: any;
  take: number;
  page: number;
}

const Pagination: React.FC<Props> = ({ total = 0, refetch, take, page }) => {
  const { pathname, query } = useRouter();
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    refetch({
      skip: take * page - take
    });
  }, [take, page]);

  useEffect(() => {
    setTotalPages(Math.ceil(total / take));
  }, [total, take]);

  return totalPages >= 1 ? (
    <PageNumbersWrapper>
      <LinkAnchor
        scroll={false}
        href={{
          pathname,
          query: {
            ...query,
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
            ...query,
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
