import { Category } from '../generated/types';

const getGenderCategories =  (gender: string) => {
  if (gender === 'MAN') {
    return Object.values(Category).filter(
      (cat) => cat !== Category.DRESS && cat !== Category.BLOUSE
    );
  }
  return Object.values(Category);
};

export default getGenderCategories