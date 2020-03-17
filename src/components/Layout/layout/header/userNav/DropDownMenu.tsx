import React from 'react';
import { useSignoutMutation } from '../../../../../generated/types';
import ME from '../../../../../graphql/queries/ME';
import LinkAnchor from '../../../../LinkAnchor/LinkAnchor';
import {
  DropDownItem,
  DropDownList,
  DropDownWrapper
} from './DropDownMenu.styles';

interface Props {
  admin?: boolean;
}

const DropDownMenu: React.FC<Props> = ({ admin }) => {
  const [signOut] = useSignoutMutation({
    refetchQueries: [{ query: ME }]
  });
  return (
    <DropDownWrapper>
      <DropDownList>
        <DropDownItem>
          <LinkAnchor href='/account/profile'> my profile</LinkAnchor>
        </DropDownItem>
        <DropDownItem>
          <LinkAnchor href='/account/orders'>my orders </LinkAnchor>
        </DropDownItem>
        <DropDownItem>
          <LinkAnchor href='/cart'>my cart </LinkAnchor>
        </DropDownItem>
        {admin && (
          <DropDownItem admin>
            <LinkAnchor href='/admin/users'>admin panel</LinkAnchor>
          </DropDownItem>
        )}
        <DropDownItem onClick={() => signOut()}>logout</DropDownItem>
      </DropDownList>
    </DropDownWrapper>
  );
};

export default DropDownMenu;
