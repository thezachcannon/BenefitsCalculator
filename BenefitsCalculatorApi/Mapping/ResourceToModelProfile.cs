
using AutoMapper;
using BenefitsCalculatorApi.Domain.Models;
using BenefitsCalculatorApi.Resources;

namespace BenefitsCalculatorApi.Mapping
{
  public class ResourceToModelProfile : Profile
  {
    public ResourceToModelProfile()
    {
      CreateMap<SavePersonResource, Employee>();
      CreateMap<SaveDependentResource, Dependent>();

    }
  }
}
