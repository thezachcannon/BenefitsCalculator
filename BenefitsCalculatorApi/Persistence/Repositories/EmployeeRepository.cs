using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BenefitsCalculatorApi.Domain.Models;
using BenefitsCalculatorApi.Domain.Repositories;
using BenefitsCalculatorApi.Persistence.Contexts;
using System.Linq;

namespace BenefitsCalculatorApi.Persistence.Repositories
{
  public class EmployeeRepository : BaseRepository, IEmployeeRepository
  {
    public EmployeeRepository(AppDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Employee>> GetEmployeesAsync(){
            return await _context.People.OfType<Employee>().Include("Dependents").ToListAsync();

    }
    public async Task<Employee> GetAsync(string id)
    {
      return await _context.People.OfType<Employee>().Where(employee => employee.Id == id).Include("Dependents").FirstAsync();
    }

    public async Task AddAsync(Employee employee)
    {
      await _context.People.AddAsync(employee);
      await _context.SaveChangesAsync();
    }
  }
}