import { useState, ChangeEvent } from 'react';

export default (initialState: any) => {
  const [values, setForm] = useState(initialState);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...values, [e.target.name]: e.target.value });
  };

  const clearForm = (state: any) => {
    const reset = Object.keys(state).reduce((acc: any, key) => {
      acc[key] = '';
      return acc;
    }, {});
    setForm(reset);
  };

  return { values, handleInput, clearForm, setForm };
};
