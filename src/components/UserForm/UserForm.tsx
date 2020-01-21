import React from 'react';
import { StyledForm, StyledFormTitle } from './UserForm.styles';
import Button from '../Button/Button';

interface Props {
  title?: string;
  onSubmit: ((event: React.FormEvent<HTMLFormElement>) => void) | undefined;
  buttonText: string;
}

const UserForm: React.FC<Props> = ({
  children,
  title,
  onSubmit,
  buttonText
}) => {
  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledFormTitle>{title}</StyledFormTitle>
      {children}
      <Button type='submit'>{buttonText}</Button>
    </StyledForm>
  );
};

export default UserForm;
