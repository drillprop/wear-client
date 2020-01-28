import React, { FC } from 'react';
import Link, { LinkProps } from 'next/link';
import { StyledAnchor } from './LinkAnchor.styles';
import { useRouter } from 'next/router';

interface Props {
  highlight?: boolean;
}

const LinkAnchor: FC<LinkProps & Props> = ({ href, children, highlight }) => {
  const { pathname } = useRouter();
  return (
    <Link href={href}>
      <StyledAnchor active={highlight && pathname === href}>
        {children}
      </StyledAnchor>
    </Link>
  );
};

export default LinkAnchor;
