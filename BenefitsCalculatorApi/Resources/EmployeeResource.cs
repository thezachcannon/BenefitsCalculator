using System.Collections.Generic;
using BenefitsCalculatorApi.Domain.Models;

namespace BenefitsCalculatorApi.Resources
{
  public class EmployeeResource
  {
    public string Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }

    public ICollection<DependentResource> Dependents {get;set;}
  }
}