
using System;
using System.Collections.Generic;

namespace BenefitsCalculatorApi.Domain.Models
{
    public class Employee : Person
    {

        public ICollection<Dependent> Dependents {get;set;}

        public double Salary {get; set;}

        public Employee ( ) {
            this.Salary = 52000;
        }

        public RateCalculation calculateRate (){
            var rateCalculation = new RateCalculation();
            var discounts = new List<double>();
            var family = new List<Person>();
            family.AddRange(this.Dependents);
            foreach(var member in family){
                if(member.FirstName.ToLower().StartsWith('a')){
                    discounts.Add(.1);
                    break;
                }
            }

            rateCalculation.Discounts = discounts;

            var numberOfDependents = Dependents.Count;
            rateCalculation.CostWithoutDiscount = Math.Round(rateCalculation.calculateCostWithoutDiscount(numberOfDependents), 2);
            rateCalculation.CostWithDiscount = Math.Round(rateCalculation.calculateCostWithDiscount(numberOfDependents), 2);
            rateCalculation.NetSalaryAfterCost = Math.Round(rateCalculation.calculateNetSalaryAfterCost(this.Salary, numberOfDependents),2);
            return rateCalculation;
        }
    }
}