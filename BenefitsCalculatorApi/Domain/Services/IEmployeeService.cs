
using System.Collections.Generic;
using System.Threading.Tasks;
using BenefitsCalculatorApi.Domain.Models;
using BenefitsCalculatorApi.Domain.Services.Communication;

namespace BenefitsCalculatorApi.Domain.Services
{
  public interface IEmployeeService
  {
    Task<IEnumerable<Employee>> GetEmployeesAsync();
    Task<Employee> GetAsync(string id);
    Task<SaveEmployeeResponse> SaveAsync(Employee employee);
  }
}