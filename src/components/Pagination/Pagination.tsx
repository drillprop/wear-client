import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  NextPrevPage,
  PageNumber,
  PageNumbersWrapper,
} from './Pagination.styles';

interface Props {
  path: string;
  total?: number;
  refetch: any;
  take: number;
  page: number;
  asPath?: string;
}

const Pagination: React.FC<Props> = ({
  total = 0,
  refetch,
  take,
  page,
  path,
  asPath,
}) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (refetch) {
      refetch({
        skip: take * page - take,
      });
    }
  }, [take, page, refetch]);

  useEffect(() => {
    setTotalPages(Math.ceil(total / take));
  }, [total, take]);

  return totalPages >= 1 ? (
    <PageNumbersWrapper>
      <Link
        passHref
        scroll={false}
        href={{
          pathname: path,
          query: {
            page: page - 1 || 1,
          },
        }}
        as={`${asPath ? asPath : path}?page=${page - 1 || 1}`}
      >
        <NextPrevPage>&lt;</NextPrevPage>
      </Link>
      <PageNumber>
        {page} of {totalPages}
      </PageNumber>
      <Link
        passHref
        scroll={false}
        href={{
          pathname: path,
          query: {
            page: totalPages > page ? page + 1 : totalPages,
          },
        }}
        as={`${asPath ? asPath : path}?page=${
          totalPages > page ? page + 1 : totalPages
        }`}
      >
        <NextPrevPage>&gt;</NextPrevPage>
      </Link>
    </PageNumbersWrapper>
  ) : null;
};

export default Pagination;
