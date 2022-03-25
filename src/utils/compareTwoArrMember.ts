import { Member, User } from 'share/types';

export const compareTwoArrMember = (_arr1: Member[], _arr2: User[]) => {
  // .concat() to not mutate arguments
  const arr1 = _arr1.concat().sort((a, b) => parseInt(a.id) - parseInt(b.id));
  const arr2 = _arr2.concat().sort((a, b) => parseInt(a.id) - parseInt(b.id));
  if (!Array.isArray(_arr1) || !Array.isArray(_arr2) || _arr1.length !== _arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i].id !== arr2[i].id) {
      return false;
    }
  }

  return true;
};
