import React from 'react';
import { useSignoutMutation } from '../../../../../generated/types';
import ME from '../../../../../graphql/queries/ME';
import LinkAnchor from '../../../../LinkAnchor/LinkAnchor';
import {
  ProfileDropDownItem,
  ProfileDropDownList,
  ProfileDropDownWrapper
} from './ProfileDropDown.styles';

interface Props {
  admin?: boolean;
}

const ProfileDropDown: React.FC<Props> = ({ admin }) => {
  const [signOut] = useSignoutMutation({
    refetchQueries: [{ query: ME }]
  });
  return (
    <ProfileDropDownWrapper>
      <ProfileDropDownList>
        <ProfileDropDownItem>
          <LinkAnchor href='/account/profile'> my profile</LinkAnchor>
        </ProfileDropDownItem>
        <ProfileDropDownItem>
          <LinkAnchor href='/account/orders'>my orders </LinkAnchor>
        </ProfileDropDownItem>
        <ProfileDropDownItem>
          <LinkAnchor href='/cart'>my cart </LinkAnchor>
        </ProfileDropDownItem>
        {admin && (
          <ProfileDropDownItem admin>
            <LinkAnchor href='/admin/users'>admin panel</LinkAnchor>
          </ProfileDropDownItem>
        )}
        <ProfileDropDownItem onClick={() => signOut()}>
          logout
        </ProfileDropDownItem>
      </ProfileDropDownList>
    </ProfileDropDownWrapper>
  );
};

export default ProfileDropDown;
