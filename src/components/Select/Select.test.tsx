import React from 'react';
import Select from './Select';
import { render, cleanup, fireEvent } from '@testing-library/react';

afterEach(cleanup);

test('toggle option list', () => {
  const { getByTestId } = render(
    <Select
      label='label name'
      onChange={() => {}}
      options={['test option a', 'test option b']}
    />
  );

  fireEvent.click(getByTestId('select-label'));
  expect(getByTestId('select-wrapper')).toHaveTextContent('test option a');
  expect(getByTestId('select-wrapper')).toHaveTextContent('test option b');

  fireEvent.click(getByTestId('select-label'));

  expect(getByTestId('select-wrapper')).not.toHaveTextContent('test option a');
});

test('select option correctly', () => {
  let value;
  const onChangeFn = jest.fn((val) => {
    value = val;
  });
  const mockProps = {
    label: 'label name',
    onChange: onChangeFn,
    options: ['test option a', 'test option b'],
  };

  const { getByTestId, getByText, debug, rerender } = render(
    <Select {...mockProps} value={value} />
  );

  expect(value).toBeUndefined();

  fireEvent.click(getByTestId('select-label'));
  fireEvent.click(getByText('test option a'));
  expect(onChangeFn).toBeCalledWith('test option a');
  rerender(<Select {...mockProps} value={value} />);
  expect(value).toBe('test option a');
  expect(getByTestId('selected-option')).toHaveTextContent('test option a');
});

test('blur select correctly', () => {
  let value = 'test option a';
  const onChangeFn = jest.fn((val) => {
    value = val;
  });

  const mockProps = {
    label: 'label name',
    onChange: onChangeFn,
    options: ['test option a', 'test option b'],
  };
  const { getByTestId, debug, rerender } = render(
    <Select {...mockProps} value={value} />
  );
  fireEvent.click(getByTestId('custom-select'));
  fireEvent.blur(getByTestId('custom-select'));
  rerender(<Select {...mockProps} value={value} />);
  expect(getByTestId('selected-option')).toHaveTextContent('');
});
