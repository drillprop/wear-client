import React from 'react';
import { CartIconSvg } from './CartIcon.styles';
import { black } from '../../styles/colors';

interface Props {
  color?: string;
  size?: number | string;
  fill?: string;
}

const CartIcon: React.FC<Props> = ({ color = black, size = 24, fill }) => {
  return (
    <CartIconSvg height={size} viewBox='0 0 24 24' width={size} color={color}>
      <circle
        cx='8'
        cy='21'
        fill='none'
        r='2.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
      <circle
        cx='20'
        cy='21'
        fill='none'
        r='2.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
      <path
        d='M5.67,6H23l-1.68,8.39a2,2,0,0,1-2,1.61H8.75a2,2,0,0,1-2-1.74L5.23,2.74A2,2,0,0,0,3.25,1H1'
        fill={fill ? fill : 'none'}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2.5'
      />
    </CartIconSvg>
  );
};

export default CartIcon;
