import React, { FC } from 'react';
import Link, { LinkProps } from 'next/link';

const LinkAnchor: FC<LinkProps> = ({ href, children }) => {
  return (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  );
};

export default LinkAnchor;
