using System.ComponentModel.DataAnnotations;

namespace BenefitsCalculatorApi.Resources
{
  public class SavePersonResource
  {
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
  }
}