
using System;
using System.Collections.Generic;

namespace BenefitsCalculatorApi.Domain.Models
{
  public class RateCalculation
  {
    const double EMPLOYEE_COST_YEARLY = 1000.000;
    const double DEPENDENT_COST_YEARLY = 500.00;
    public IEnumerable<double> Discounts { get; set; }
    public double CostWithoutDiscount { get; set; }

    public double CostWithDiscount { get; set; }

    public double NetSalaryAfterCost { get; set; }

    public double calculateCostWithoutDiscount (int noOfDependents){
      var employeePaycheckCost = EMPLOYEE_COST_YEARLY / 26;
      var dependentPaycheckCost = (DEPENDENT_COST_YEARLY * noOfDependents) / 26;
      return employeePaycheckCost + dependentPaycheckCost;
    }

    public double calculateCostWithDiscount (int noOfDependents){
      var withoutDiscountcost = this.calculateCostWithoutDiscount(noOfDependents);
      var costWithDiscount = withoutDiscountcost;

      foreach(var discount in this.Discounts){
        costWithDiscount = this.applyDiscount(costWithDiscount, discount);
      }

      return costWithDiscount;
    }

    private double applyDiscount (double amount, double discount){
      return amount * (1 + discount);
    }

    internal double calculateNetSalaryAfterCost(double salary, int noOfDependents)
    {
      var paycheck = salary/26;
      return paycheck - calculateCostWithDiscount(noOfDependents);
    }
  }
}