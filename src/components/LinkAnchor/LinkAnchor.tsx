import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { StyledAnchor } from './LinkAnchor.styles';

interface Props {
  wordToHighlight?: string;
}

const LinkAnchor: FC<LinkProps & Props> = ({
  wordToHighlight,
  children,
  ...props
}) => {
  const { asPath } = useRouter();
  const path = asPath.split('/').slice(-2);

  const isPathIncludes = wordToHighlight
    ? path.includes(wordToHighlight)
    : false;

  return (
    <Link {...props}>
      <StyledAnchor active={isPathIncludes}>{children}</StyledAnchor>
    </Link>
  );
};

export default LinkAnchor;
