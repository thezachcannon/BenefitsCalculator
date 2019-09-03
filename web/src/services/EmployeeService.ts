import axios, { AxiosResponse } from 'axios';
export interface Employee {
  firstName: string;
  lastName: string;
  id: string;
}
const EmployeeService = {
  getEmployees: (): Promise<AxiosResponse> =>{
    return axios.get('https://localhost:5001/api/employees')
  },
  saveEmployee: (employee: any): Promise<AxiosResponse> => {
    return axios.post('https://localhost:5001/api/employees', employee)
  },
  saveDependent: (dependent: any): Promise<AxiosResponse> => {
    return axios.post('https://localhost:5001/api/dependents', dependent)
  },
  calculateBenefits: (employeeId: string): Promise<AxiosResponse> => {
    return axios.get(`https://localhost:5001/api/employees/benefits/${employeeId}`)
  }
}

export default EmployeeService;