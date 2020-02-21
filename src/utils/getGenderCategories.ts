import { Category, Gender } from '../generated/types';

export default (gender: Gender.Man | Gender.Woman) => {
  if (gender === Gender.Man) {
    return Object.values(Category).filter(
      cat => cat !== Category.Dress && cat !== Category.Blouse
    );
  }
  return Object.values(Category);
};
