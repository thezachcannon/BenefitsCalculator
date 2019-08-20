
using System.Collections.Generic;

namespace BenefitsCalculatorApi.Domain.Models
{
  public class Dependent : Person
  {
    public string EmployeeId { get; set; }
    public Employee Employee { get; set; }
  }
}