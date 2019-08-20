using System.Collections.Generic;
using System.Threading.Tasks;
using BenefitsCalculatorApi.Domain.Models;

namespace BenefitsCalculatorApi.Domain.Repositories
{
  public interface IEmployeeRepository
  {

    Task<IEnumerable<Employee>> GetEmployeesAsync();
    Task<Employee> GetAsync(string id);
    Task AddAsync(Employee employee);
  }
}