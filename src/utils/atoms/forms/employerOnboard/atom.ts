import { atom } from 'recoil';
import { CreateEmployerData } from '@/api/Employer/EmployerService';

export const employerOnboardAtom = atom<CreateEmployerData>({
  key: 'employerOnboardAtom',
  default: {
    name: '',
    companyDescription: '',
    logo: '',
    webAddress: '',
    country: '',
    city: '',
    state: '',
    postalCode: '',
    address: '',
    numberOfEmployees: 0,
    latLong: [],
  },
});
