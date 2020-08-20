import { CategoryArr } from './constants';

const getGenderCategories = (gender: string) => {
  if (gender === 'MAN') {
    return CategoryArr.filter((cat) => cat !== 'DRESS' && cat !== 'BLOUSE');
  }
  return CategoryArr;
};

export default getGenderCategories;
