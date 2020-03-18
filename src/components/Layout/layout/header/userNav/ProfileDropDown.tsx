import React from 'react';
import {
  useSignoutMutation,
  useMeQuery,
  UserRole
} from '../../../../../generated/types';
import ME from '../../../../../graphql/queries/ME';
import LinkAnchor from '../../../../LinkAnchor/LinkAnchor';
import {
  ProfileDropDownItem,
  ProfileDropDownList,
  ProfileDropDownWrapper
} from './ProfileDropDown.styles';

const ProfileDropDown: React.FC = () => {
  const [signOut] = useSignoutMutation({
    refetchQueries: [{ query: ME }]
  });
  const { data } = useMeQuery();
  const admin = data?.me?.role === UserRole.ADMIN;
  return (
    <>
      <LinkAnchor href='/sign'>
        <img src='/user-icon.svg' alt='profile icon' />
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
      ) : null}
    </>
  );
};

export default ProfileDropDown;
