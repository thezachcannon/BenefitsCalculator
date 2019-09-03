using System;
using System.Collections.Generic;
using Xunit;
using BenefitsCalculatorApi.Domain.Models;

namespace BenefitsCalculatorApi.Tests
{
  public class RateCalculationTest
  {

    [Fact]
    public void EmployeeCostWithoutDiscountShouldBe()
    {
      RateCalculation rateCalculation = new RateCalculation();
      var costWithoutDiscount = Math.Round(rateCalculation.calculateCostWithoutDiscount(0), 2);
      Assert.Equal(38.46, costWithoutDiscount);
    }

    [Fact]
    public void EmployeeCostWithDiscountShouldBe()
    {
      RateCalculation rateCalculation = new RateCalculation();
      rateCalculation.Discounts = new List<double>(new double[] { .1 });
      var costWithDiscount = Math.Round(rateCalculation.calculateCostWithDiscount(0), 2);
      Assert.Equal(Math.Round(34.62, 2), costWithDiscount);
    }
  }
}
