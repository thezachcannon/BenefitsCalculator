using System.Collections.Generic;
using System.Threading.Tasks;
using BenefitsCalculatorApi.Domain.Models;

namespace BenefitsCalculatorApi.Domain.Repositories
{
  public interface IDependentRepository
  {
    Task AddAsync(Dependent dependent);
  }
}