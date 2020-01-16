import React from 'react';
import {
  DropDownWrapper,
  DropDownList,
  DropDownItem
} from './DropDownMenu.styles';
import LinkAnchor from '../../../../LinkAnchor/LinkAnchor';
import { useSignoutMutation } from '../../../../../generated/types';
import { ME } from '../../../../../graphql/queries';

const DropDownMenu = () => {
  const [signOut] = useSignoutMutation({
    refetchQueries: [{ query: ME }]
  });
  return (
    <DropDownWrapper>
      <DropDownList>
        <DropDownItem>
          <LinkAnchor href='/profile'> my profile</LinkAnchor>
        </DropDownItem>
        <DropDownItem>
          <LinkAnchor href='/orders'>my orders </LinkAnchor>
        </DropDownItem>
        <DropDownItem>
          <LinkAnchor href='/checkout'>my cart </LinkAnchor>
        </DropDownItem>
        <DropDownItem onClick={() => signOut()}>logout</DropDownItem>
      </DropDownList>
    </DropDownWrapper>
  );
};

export default DropDownMenu;
