import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { StyledAnchor } from './LinkAnchor.styles';

interface Props {
  highlight?: boolean;
  queryHighlight?: boolean;
}

const LinkAnchor: FC<LinkProps & Props> = ({
  queryHighlight,
  highlight,
  children,
  ...props
}) => {
  const { pathname } = useRouter();
  return (
    <Link {...props}>
      <StyledAnchor
        active={(highlight && pathname === props.href) || queryHighlight}
      >
        {children}
      </StyledAnchor>
    </Link>
  );
};

export default LinkAnchor;
