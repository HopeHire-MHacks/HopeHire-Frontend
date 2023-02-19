import ApiService, { ApiData } from '@/api/ApiService';
import { JobData } from '../Jobs/JobService';

export type ApplicationData = {
  id: number;
  jobId: number;
  remarks: string;
  status: string;
  job?: JobData;
};

export type CreateApplicationData = {
  jobId: number;
  remarks: string;
  status: string;
};

export default class ApplicationService {
  private static getApplicationUrl() {
    return 'applications';
  }

  public static async createApplication(createApplicationData: CreateApplicationData): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getApplicationUrl()}`,
          method: 'POST',
          data: {
            jobId: createApplicationData.jobId,
            remarks: createApplicationData.remarks,
            status: createApplicationData.status,
          },
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getAll(): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getApplicationUrl()}`,
          method: 'GET',
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getApplicationById(id: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getApplicationUrl()}/${id}`,
          method: 'GET',
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getApplicationByEmployeeId(id: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `employees/${id}/${this.getApplicationUrl()}`,
          method: 'GET',
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getApplicationByJobId(id: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `jobs/${id}/${this.getApplicationUrl()}`,
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
