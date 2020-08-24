import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { StyledAnchor } from './LinkAnchor.styles';

interface Props {
  wordToHighlight?: string;
  highlight?: boolean;
}

const LinkAnchor: FC<LinkProps & Props> = ({
  wordToHighlight,
  highlight,
  children,
  ...props
}) => {
  const router = useRouter();
  const path = router ? router.asPath.split(/\/|\?/gi) : '';

  const isPathIncludes = wordToHighlight
    ? path.includes(wordToHighlight)
    : false;

  return (
    <Link {...props} passHref>
      <StyledAnchor active={highlight || isPathIncludes}>
        {children}
      </StyledAnchor>
    </Link>
  );
};

export default LinkAnchor;
