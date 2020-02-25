import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { StyledAnchor } from './LinkAnchor.styles';

interface Props {
  highlight?: boolean;
  queryHighlight?: boolean;
}

const LinkAnchor: FC<LinkProps & Props> = ({
  href,
  children,
  highlight,
  queryHighlight
}) => {
  const { pathname } = useRouter();
  return (
    <Link href={href}>
      <StyledAnchor active={(highlight && pathname === href) || queryHighlight}>
        {children}
      </StyledAnchor>
    </Link>
  );
};

export default LinkAnchor;
