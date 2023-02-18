import { atom } from 'recoil';

interface EmployerFormState {
  companyName: string;
  companyWebsite: string;
  companyDescription: string;
  logo: string;
  postalCode: string;
  address: string;
  numberOfEmployees: number;
  latLong: number[];
}

export const employerOnboardAtom = atom<EmployerFormState>({
  key: 'employerOnboardAtom',
  default: {
    companyName: '',
    companyWebsite: '',
    companyDescription: '',
    logo: '',
    postalCode: '',
    address: '',
    numberOfEmployees: 0,
    latLong: [0, 0],
  },
});
