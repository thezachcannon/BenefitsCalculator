using System.Collections.Generic;
using System.Threading.Tasks;
using BenefitsCalculatorApi.Domain.Models;
using BenefitsCalculatorApi.Domain.Services;
using BenefitsCalculatorApi.Domain.Repositories;
using BenefitsCalculatorApi.Domain.Services.Communication;
using System;

namespace BenefitsCalculatorApi.Services
{
  public class EmployeeService : IEmployeeService
  {
    private readonly IEmployeeRepository _employeeRepository;

    public EmployeeService(IEmployeeRepository employeeRepository)
    {
      this._employeeRepository = employeeRepository;
    }
    public async Task<IEnumerable<Employee>> GetEmployeesAsync()
    {
      return await _employeeRepository.GetEmployeesAsync();
    }
    public async Task<Employee> GetAsync(string id)
    {
      return await _employeeRepository.GetAsync(id);
    }

    public async Task<SaveEmployeeResponse> SaveAsync(Employee employee)
    {
      try
      {
        await _employeeRepository.AddAsync(employee);
        return new SaveEmployeeResponse(employee);
      }
      catch (Exception ex)
      {
        return new SaveEmployeeResponse($"An error occurred when saving the category: {ex.Message}");
      }
    }
  }
}