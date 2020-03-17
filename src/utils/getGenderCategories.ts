import { Category, Gender } from '../generated/types';

export default (gender: Gender.MAN | Gender.WOMAN) => {
  if (gender === Gender.MAN) {
    return Object.values(Category).filter(
      cat => cat !== Category.DRESS && cat !== Category.BLOUSE
    );
  }
  return Object.values(Category);
};
