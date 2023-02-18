import { atom } from 'recoil';
import { UserData } from '@/api/Authentication/AuthService';

export const userAtom = atom<UserData>({
  key: 'userAtom',
  default: {
    id: 0,
    email: '',
    employee: null,
    employer: null,
  },
});
