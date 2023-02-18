import ApiService, { ApiData } from '@/api/ApiService';
import { EventData } from '@/components/Calendar';
import { convertToBlob } from '@/utils/miscellaneous';

export type EmployeeData = {
  name: string;
  userId: number;
  personalStatement: string;
  skills: number[];
  interests: number[];
  isAvailable: boolean;
  dateOfBirth: string;
  remarks: string;
  availableTimes: string[];
  preferredLocation: number[];
  dialysisFrequency: number;
  country: string;
  city: string;
  state: string;
  postalCode: string;
  address: string;
};

export type CreateEmployeeData = {
  name: string;
  personalStatement: string;
  skills: number[];
  interests: number[];
  dateOfBirth: string;
  remarks: string;
  availableTimes: string[];
  preferredLocation: number[];
  dialysisFrequency: number;
  profilePhoto: ArrayBuffer | null;
  resume: ArrayBuffer | null;
  country: string;
  city: string;
  state: string;
  postalCode: string;
  address: string;
  availableTimesCalendar: EventData[];
  resumeName: string;
};

export default class EmployeeService {
  private static getEmployeeUrl() {
    return 'employees';
  }

  public static async createEmployee(createEmployerData: CreateEmployeeData): Promise<ApiData> {
    // const imageBlob = convertToBlob(createEmployerData.profilePhoto);
    // const resumeBlob = convertToBlob(createEmployerData.resume);

    try {
      const response = await ApiService.request(
        {
          url: `${this.getEmployeeUrl()}`,
          method: 'POST',
          data: {
            name: createEmployerData.name,
            personalStatement: createEmployerData.personalStatement,
            skills: createEmployerData.skills,
            interests: createEmployerData.interests,
            isAvailable: true,
            dateOfBirth: createEmployerData.dateOfBirth,
            remarks: createEmployerData.remarks,
            availableTimes: createEmployerData.availableTimes,
            preferredLocation: createEmployerData.preferredLocation,
            dialysisFrequency: createEmployerData.dialysisFrequency,
            profilePicture: createEmployerData.profilePhoto,
            resume: createEmployerData.resume,
            country: createEmployerData.country,
            city: createEmployerData.city,
            state: createEmployerData.state,
            postalCode: createEmployerData.postalCode,
            address: createEmployerData.address,
          },
        },
        true,
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async getAllEmployees(): Promise<ApiData> {
    try {
      const response = await ApiService.request(
        {
          url: this.getEmployeeUrl(),
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
