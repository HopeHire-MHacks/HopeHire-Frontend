import { removeLocalStorageValue, setLocalStorageValue } from '@/utils/miscellaneous';
import ApiService, { ApiData } from '@/api/ApiService';
import { EmployerData } from '@/api/Employer/EmployerService';
import { EmployeeData } from '@/api/Employee/EmployeeService';

export type UserData = {
  id: number;
  email: string;
  employee: EmployeeData | null;
  employer: EmployerData | null;
};

export interface UserSignUpData {
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface LoginData {
  accessToken: string;
  user: UserData;
}

export default class AuthService {
  private static getAuthUrl() {
    return '';
  }

  public static async login(email: string, password: string): Promise<ApiData<LoginData>> {
    try {
      //get the token
      const response = await ApiService.request({
        url: `${this.getAuthUrl()}/signIn`,
        method: 'POST',
        data: {
          email,
          password,
        },
      });

      if (!response || !response.data.accessToken) {
        //login failed
        throw new Error('login failed!');
      }

      // store the x-auth-token in localStorage
      const accessToken: string = response.data.accessToken;
      setLocalStorageValue(ApiService.authTokenKey, accessToken);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static async register(userRegisterData: UserSignUpData): Promise<ApiData> {
    try {
      const response = await ApiService.request({
        url: `${this.getAuthUrl()}/signUp`,
        method: 'POST',
        data: {
          ...userRegisterData,
        },
      });

      if (!response || !response.data.accessToken) {
        //login failed
        throw new Error('signup failed!');
      }

      // store the x-auth-token in localStorage
      const accessToken: string = response.data.accessToken;
      setLocalStorageValue(ApiService.authTokenKey, accessToken);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public static logout(): void {
    removeLocalStorageValue(ApiService.authTokenKey);
  }
}
