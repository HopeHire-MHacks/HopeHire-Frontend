import ApiService, { ApiData } from '@/api/ApiService';

export default class JobService {
  private static getJobUrl() {
    return 'jobs';
  }

  public static async getAll(): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getJobUrl()}`,
          method: 'GET',
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getJobById(id: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getJobUrl()}/${id}`,
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
