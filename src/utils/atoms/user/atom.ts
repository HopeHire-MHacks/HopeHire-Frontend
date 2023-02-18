import { atom } from 'recoil';
import { UserData } from '@/api/Authentication/AuthService';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const userAtom = atom<UserData>({
  key: 'userAtom',
  default: {
    id: 0,
    email: '',
    employee: null,
    employer: null,
  },
  effects_UNSTABLE: [persistAtom],
});
