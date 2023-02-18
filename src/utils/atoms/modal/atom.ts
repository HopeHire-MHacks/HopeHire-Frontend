import { atom } from 'recoil';

export const enum ModalType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}

interface ModalState {
  isShown: boolean;
  title: string;
  message: string;
  type: ModalType;
  onPrimaryBtnClick?: () => void;
  onSecondaryBtnClick?: () => void;
}

export const modalAtom = atom<ModalState>({
  key: 'modalAtom',
  default: {
    isShown: false,
    title: '',
    message: '',
    type: ModalType.SUCCESS,
    onPrimaryBtnClick: () => '',
    onSecondaryBtnClick: () => '',
  },
});
