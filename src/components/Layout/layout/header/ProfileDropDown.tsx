import React from 'react';
import { useMeQuery, useSignoutMutation } from '../../../../generated/types';
import ME from '../../../../graphql/queries/ME';
import LinkAnchor from '../../../LinkAnchor/LinkAnchor';
import {
  LiWithDropdown,
  ProfileDropDownItem,
  ProfileDropDownList,
  ProfileDropDownWrapper,
} from './ProfileDropDown.styles';

const ProfileDropDown: React.FC = () => {
  const [signOut] = useSignoutMutation({
    refetchQueries: [{ query: ME }],
  });
  const { data } = useMeQuery();
  const isAdmin = data?.me?.role === 'ADMIN';
  return (
    <LiWithDropdown>
      <LinkAnchor href='/sign'>
        <img className='icon' src='/user-icon.svg' alt='profile icon' />
        {data?.me ? data.me.email : 'login'}
      </LinkAnchor>
      {data?.me ? (
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
            {isAdmin && (
              <ProfileDropDownItem admin>
                <LinkAnchor href='/admin/users'>admin panel</LinkAnchor>
              </ProfileDropDownItem>
            )}
            <ProfileDropDownItem onClick={() => signOut()}>
              logout
            </ProfileDropDownItem>
          </ProfileDropDownList>
        </ProfileDropDownWrapper>
      ) : null}
    </LiWithDropdown>
  );
};

export default ProfileDropDown;
