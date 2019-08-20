using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using BenefitsCalculatorApi.Domain.Services;
using BenefitsCalculatorApi.Domain.Models;
using BenefitsCalculatorApi.Resources;
using BenefitsCalculatorApi.Extensions;

namespace BenefitsCalculatorApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class DependentsController : ControllerBase
  {
    private readonly IDependentService _dependentService;
    private readonly IMapper _mapper;

    public DependentsController(IDependentService dependentService, IMapper mapper)
    {
      _dependentService = dependentService;
      _mapper = mapper;
    }

    // POST api/dependents
    [HttpPost]
    public async Task<IActionResult> PostAsync([FromBody] SaveDependentResource resource)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState.GetErrorMessages());

      var dependent = _mapper.Map<SaveDependentResource, Dependent>(resource);
      var result = await _dependentService.SaveAsync(dependent);

      if (!result.Success)
        return BadRequest(result.Message);

      var employeeResource = _mapper.Map<Dependent, DependentResource>(result.Dependent);
      return Ok(employeeResource);
    }
  }
}
