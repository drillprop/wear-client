import { useState, ChangeEvent } from 'react';

const useForm = (initialState: any) => {
  const [values, setForm] = useState(initialState);

  const handleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

export default useForm;
