import { Category } from '../generated/types';

export default (gender: string) => {
  if (gender === 'MAN') {
    return Object.values(Category).filter(
      (cat) => cat !== Category.DRESS && cat !== Category.BLOUSE
    );
  }
  return Object.values(Category);
};
