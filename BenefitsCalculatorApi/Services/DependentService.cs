using System.Collections.Generic;
using System.Threading.Tasks;
using BenefitsCalculatorApi.Domain.Models;
using BenefitsCalculatorApi.Domain.Services;
using BenefitsCalculatorApi.Domain.Repositories;
using BenefitsCalculatorApi.Domain.Services.Communication;
using System;

namespace BenefitsCalculatorApi.Services
{
  public class DependentService : IDependentService
  {
    private readonly IDependentRepository _dependentRepository;

    public DependentService(IDependentRepository dependentRepository)
    {
      this._dependentRepository = dependentRepository;
    }

    public async Task<SaveDependentResponse> SaveAsync(Dependent dependent)
    {
      try
      {
        await _dependentRepository.AddAsync(dependent);
        return new SaveDependentResponse(dependent);
      }
      catch (Exception ex)
      {
        return new SaveDependentResponse($"An error occurred when saving the category: {ex.Message}");
      }
    }
  }
}