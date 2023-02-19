import ApiService, { ApiData } from '@/api/ApiService';
import { Buffer } from 'buffer';

export type EmployerData = {
  name: string;
  companyDescription: string;
  logo: { type: 'Buffer'; data: number[] };
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
  logo: ArrayBuffer | null;
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
    const logoBuffer = createEmployerData.logo != null ? Buffer.from(createEmployerData.logo) : null;

    try {
      const response = await ApiService.request(
        {
          url: `${this.getEmployerUrl()}`,
          method: 'POST',
          data: {
            name: createEmployerData.name,
            companyDescription: createEmployerData.companyDescription,
            logo: logoBuffer,
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

  public static async getRecommendedEmployees(jobId: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `employees/recommended/jobs`,
          data: {
            job_id: jobId,
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
