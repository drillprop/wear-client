import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useCart } from '../../../../contexts/CartContext';
import {
  Gender,
  useMeQuery,
  UserRole,
  useSignoutMutation,
} from '../../../../generated/types';
import ME from '../../../../graphql/queries/ME';
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
  const { data } = useMeQuery();

  const { cartItems } = useCart();
  const cartItemsLength = cartItems.length;

  const [signOut] = useSignoutMutation({
    refetchQueries: [{ query: ME }],
  });

  useEffect(() => {
    if (menuActive) {
      setMenuActive(false);
    }
  }, [asPath]);

  const isUser = data?.me;
  const isEmployee =
    data?.me?.role === UserRole.EMPLOYEE || data?.me?.role === UserRole.ADMIN;
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
      <AnimatePresence>
        {menuActive && (
          <Menu
            transition={{
              bounceDamping: 0,
            }}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
          >
            <ul>
              {isUser ? (
                <ToggleableList title='ACCOUNT'>
                  <li>
                    <LinkAnchor href='/account/profile'>my profile</LinkAnchor>
                  </li>
                  <li>
                    <LinkAnchor href='/account/contact'>
                      contact details
                    </LinkAnchor>
                  </li>
                  <li>
                    <LinkAnchor href='/account/orders'>orders</LinkAnchor>
                  </li>
                </ToggleableList>
              ) : (
                <li>
                  <LinkAnchor href='/sign'>login</LinkAnchor>
                </li>
              )}
              <ToggleableList title='WOMAN'>
                {womanCategories.map((category) => (
                  <li key={category}>
                    <LinkAnchor
                      href='/[gender]/[category]'
                      as={`/woman/${category.toLowerCase()}`}
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
                      href='/[gender]/[category]'
                      as={`/man/${category.toLowerCase()}`}
                    >
                      {category}
                    </LinkAnchor>
                  </li>
                ))}
              </ToggleableList>
              {isEmployee && (
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
              )}
              <li>
                <LinkAnchor href='/cart'>
                  YOUR CART {cartItemsLength ? `(${cartItemsLength})` : ''}
                </LinkAnchor>
              </li>
              {isUser && <li onClick={() => signOut()}>LOGOUT</li>}
            </ul>
          </Menu>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
