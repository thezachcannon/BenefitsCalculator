import axios, { AxiosResponse } from 'axios';

const EmployeeService = {
  getEmployees: (): Promise<AxiosResponse> =>{
    return axios.get('https://localhost:5001/api/employees')
  },
  saveEmployee: (employee: any): Promise<AxiosResponse> => {
    return axios.post('https://localhost:5001/api/employees', employee)
  }
}

export default EmployeeService;