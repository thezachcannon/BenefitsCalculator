using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BenefitsCalculatorApi.Domain.Models;
using BenefitsCalculatorApi.Domain.Repositories;
using BenefitsCalculatorApi.Persistence.Contexts;
using System.Linq;

namespace BenefitsCalculatorApi.Persistence.Repositories
{
  public class DependentRepository : BaseRepository, IDependentRepository
  {
    public DependentRepository(AppDbContext context) : base(context)
    {
    }

    public async Task AddAsync(Dependent dependent)
    {
      await _context.People.AddAsync(dependent);
      await _context.SaveChangesAsync();
    }
  }
}