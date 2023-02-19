import ApiService, { ApiData } from '@/api/ApiService';
import { EventData } from '@components/Calendar/Calendar';
import { EmployerData } from '../Employer/EmployerService';

export type SalaryTypes = 'fixed' | 'ranged' | 'none-yet';
export type JobData = {
  id: number;
  positionName: string;
  jobType: string;
  industryType: number;
  jobDescription: string;
  jobRequirements: string;
  jobFlexibility: string;
  latLong: number[];
  hasDialysisSupport: boolean;
  hasFlexibleSchedule: boolean;
  physicalDemands: string;
  salaryType: string;
  scheduledType: string;
  openingTime: string;
  isOpen: boolean;
  skills: number[];
  salaryRange: number[];
  country: string;
  city: string;
  state: string;
  postalCode: string;
  employerId: number;
  createdAt: string;
  updatedAt: string;
  employer: EmployerData;
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
  salaryType: SalaryTypes;
  country: string;
  city: string;
  state: string;
  postalCode: string;
  address: string;
  skills: number[];
  latLong: number[];
  salaryRange: number[];
  availableTimes: string[];
  openingTime: string;

  // Non-API fields
  openImmediately: boolean;
  minSalary: number | null;
  maxSalary: number | null;
  workScheduleCalendar: EventData[];
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
            isOpen: true,
            openingTime: createJobData.openingTime,
            scheduledType: '',
            availableTimes: createJobData.availableTimes,
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

  public static async getJobByEmployerId(id: number): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `employers/${id}/${this.getJobUrl()}`,
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

  public static async getOpenJobs(): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: `${this.getJobUrl()}/open`,
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
