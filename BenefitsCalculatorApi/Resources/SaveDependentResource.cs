using System.ComponentModel.DataAnnotations;

namespace BenefitsCalculatorApi.Resources
{
  public class SaveDependentResource : SavePersonResource
  {
    [Required]
    public string EmployeeId { get; set; }
  }
}