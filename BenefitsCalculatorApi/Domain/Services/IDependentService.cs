
using System.Collections.Generic;
using System.Threading.Tasks;
using BenefitsCalculatorApi.Domain.Models;
using BenefitsCalculatorApi.Domain.Services.Communication;

namespace BenefitsCalculatorApi.Domain.Services
{
  public interface IDependentService
  {
    Task<SaveDependentResponse> SaveAsync(Dependent dependent);
  }
}