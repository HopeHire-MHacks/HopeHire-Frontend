import ApiService, { ApiData } from '@/api/ApiService';

export type JobData = {
  positionName: string;
  jobType: string;
  industryType: number;
  jobDescription: string;
  jobRequirements: string;
  jobFlexibility: string;
  hasDialysisSupport: boolean;
  hasFlexibleSchedule: boolean;
  physicalDemands: string;
  salaryType: string;
  country: string;
  city: string;
  state: string;
  postalCode: string;
  address: string;
  skills: number[];
  latLong: number[];
  salaryRange: number[];
  isOpen: boolean;
  scheduledType: string;
};

export type CreateJobData = {
  positionName: string;
  jobType: string;
  industryType: number;
  jobDescription: string;
  jobRequirements: string;
  jobFlexibility: string;
  hasDialysisSupport: boolean;
  hasFlexibleSchedule: boolean;
  physicalDemands: string;
  salaryType: string;
  country: string;
  city: string;
  state: string;
  postalCode: string;
  address: string;
  skills: number[];
  latLong: number[];
  salaryRange: number[];
  isOpen: boolean;
  scheduledType: string;
};

export default class JobService {
  private static getJobUrl() {
    return 'jobs';
  }

  public static async createJob(createJobData: CreateJobData): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getJobUrl()}`,
          method: 'POST',
          data: {
            positionName: createJobData.positionName,
            jobType: createJobData.jobType,
            industryType: createJobData.industryType,
            jobDescription: createJobData.jobDescription,
            jobRequirements: createJobData.jobRequirements,
            jobFlexibility: createJobData.jobFlexibility,
            hasDialysisSupport: createJobData.hasDialysisSupport,
            hasFlexibleSchedule: createJobData.hasFlexibleSchedule,
            physicalDemands: createJobData.physicalDemands,
            salaryType: createJobData.salaryType,
            country: createJobData.country,
            city: createJobData.city,
            state: createJobData.state,
            postalCode: createJobData.postalCode,
            address: createJobData.address,
            skills: createJobData.skills,
            latLong: createJobData.latLong,
            salaryRange: createJobData.salaryRange,
            isOpen: createJobData.isOpen,
            scheduledType: createJobData.scheduledType,
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

  public static async getRecommendedJobs(employeesId: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getJobUrl()}/recommended/employees`,
          data: {
            employee_id: employeesId,
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
