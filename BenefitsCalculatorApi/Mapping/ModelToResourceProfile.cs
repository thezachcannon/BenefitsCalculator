using AutoMapper;
using BenefitsCalculatorApi.Domain.Models;
using BenefitsCalculatorApi.Resources;

namespace BenefitsCalculatorApi.Mapping
{
    public class ModelToResourceProfile : Profile
    {
        public ModelToResourceProfile()
        {
            CreateMap<Employee, EmployeeResource>();
            CreateMap<Dependent, DependentResource>();
        }
    }
}