import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Gender } from '../../../../generated/types';
import getGenderCategories from '../../../../utils/getGenderCategories';
import LinkAnchor from '../../../LinkAnchor/LinkAnchor';
import ToggleableList from '../../../ToggleableList/ToggleableList';
import {
  HamburgerButton,
  HamburgerButtonSwitch,
  HamburgerButtonWrapper,
  Menu,
} from './MobileMenu.styles';

const MobileMenu = () => {
  const manCategories = getGenderCategories(Gender.MAN);
  const womanCategories = getGenderCategories(Gender.WOMAN);
  const [menuActive, setMenuActive] = useState(true);
  const { asPath } = useRouter();

  useEffect(() => {
    if (menuActive) {
      setMenuActive(false);
    }
  }, [asPath]);

  return (
    <>
      <HamburgerButtonWrapper>
        <HamburgerButtonSwitch
          type='checkbox'
          checked={menuActive}
          onChange={(e) => setMenuActive(e.target.checked)}
        />
        <HamburgerButton menuActive={menuActive} />
      </HamburgerButtonWrapper>
      {menuActive && (
        <Menu>
          <ul>
            <ToggleableList title='ACCOUNT'>
              <li>
                <LinkAnchor href='/account/profile'>my profile</LinkAnchor>
              </li>
              <li>
                <LinkAnchor href='/account/contact'>contact details</LinkAnchor>
              </li>
              <li>
                <LinkAnchor href='/account/orders'>orders</LinkAnchor>
              </li>
            </ToggleableList>
            <ToggleableList title='WOMAN'>
              {womanCategories.map((category) => (
                <li key={category}>
                  <LinkAnchor
                    href='/shop/[gender]/[category]'
                    as={`/shop/woman/${category.toLowerCase()}`}
                  >
                    {category}
                  </LinkAnchor>
                </li>
              ))}
            </ToggleableList>
            <ToggleableList title='MAN'>
              {manCategories.map((category) => (
                <li key={category}>
                  <LinkAnchor
                    href='/shop/[gender]/[category]'
                    as={`/shop/man/${category.toLowerCase()}`}
                  >
                    {category}
                  </LinkAnchor>
                </li>
              ))}
            </ToggleableList>
            <ToggleableList title='ADMIN'>
              <li>
                <LinkAnchor href='/admin/users'>users</LinkAnchor>
              </li>
              <li>
                <LinkAnchor href='/admin/items'>items</LinkAnchor>
              </li>
              <li>
                <LinkAnchor href='/admin/orders'>user's orders</LinkAnchor>
              </li>
            </ToggleableList>
            <li>
              <LinkAnchor href='/cart'>YOUR CART</LinkAnchor>
            </li>
            <li>LOGOUT</li>
          </ul>
        </Menu>
      )}
    </>
  );
};

export default MobileMenu;
