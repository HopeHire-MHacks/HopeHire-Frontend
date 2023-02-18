import ApiService, { ApiData } from '@/api/ApiService';
import { convertToBlob } from '@/utils/miscellaneous';

export type EmployerData = {
  name: string;
  companyDescription: string;
  logo: Blob;
  webAddress: string;
  userId: number;
  country: string;
  city: string;
  state: string;
  postalCode: string;
  address: string;
};

export type CreateEmployerData = {
  companyName: string;
  companyWebsite: string;
  companyDescription: string;
  logo: string;
  address: string;
  userId: number;
  latLong: number[];
  numberOfEmployees: number;
};

export default class EmployerService {
  private static getEmployerUrl() {
    return 'employers';
  }

  public static async createEmployer(createEmployerData: CreateEmployerData): Promise<ApiData> {
    const imageBlob = convertToBlob(createEmployerData.logo);

    try {
      const response = await ApiService.request(
        {
          url: `${this.getEmployerUrl()}`,
          method: 'POST',
          data: {
            name: createEmployerData.companyName,
            companyDescription: createEmployerData.companyDescription,
            logo: imageBlob,
            address: createEmployerData.address,
            numberOfEmployees: createEmployerData.numberOfEmployees,
            latLong: createEmployerData.latLong,
            userId: createEmployerData.userId,
          },
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getAllEmployers(): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: this.getEmployerUrl(),
          method: 'GET',
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
