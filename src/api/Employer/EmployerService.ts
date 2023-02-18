import ApiService, { ApiData } from '@/api/ApiService';
import { convertToBlob } from '@/utils/miscellaneous';

export type EmployerData = {
  name: string;
  companyDescription: string;
  logo: Blob;
  webAddress: string;
  userId: number;
  id: number;
  latLong: number[];
  numberOfEmployees: number;
  country: string;
  city: string;
  state: string;
  postalCode: string;
  address: string;
};

export type CreateEmployerData = {
  name: string;
  companyDescription: string;
  logo: string;
  webAddress: string;
  country: string;
  city: string;
  state: string;
  postalCode: string;
  address: string;
  numberOfEmployees: number;
  latLong: number[];
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
            name: createEmployerData.name,
            companyDescription: createEmployerData.companyDescription,
            logo: imageBlob,
            address: createEmployerData.address,
            numberOfEmployees: createEmployerData.numberOfEmployees,
            latLong: createEmployerData.latLong,
            webAddress: createEmployerData.webAddress,
            country: createEmployerData.country,
            city: createEmployerData.city,
            state: createEmployerData.state,
            postalCode: createEmployerData.postalCode,
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

  public static async getEmployerById(id: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getEmployerUrl()}/${id}`,
          method: 'GET',
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getRecommendedEmployees(employerId: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `employees/recommended/employers`,
          data: {
            employer_id: employerId,
          },
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
