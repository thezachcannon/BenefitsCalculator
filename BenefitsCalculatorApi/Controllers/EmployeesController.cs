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
  public class EmployeesController : ControllerBase
  {
    private readonly IEmployeeService _employeeService;
    private readonly IMapper _mapper;

    public EmployeesController(IEmployeeService employeeService, IMapper mapper)
    {
      _employeeService = employeeService;
      _mapper = mapper;
    }

    // GET api/employees
    [HttpGet]
    public async Task<IEnumerable<EmployeeResource>> GetEmployees()
    {
      var employees = await _employeeService.GetEmployeesAsync();
      var resources = _mapper.Map<IEnumerable<Employee>, IEnumerable<EmployeeResource>>(employees);
      return resources;
    }

    // GET api/employees/1
    [HttpGet("{id}")]
    public async Task<EmployeeResource> Get(string id)
    {
      var employee = await _employeeService.GetAsync(id);
      var resource = _mapper.Map<Employee, EmployeeResource>(employee);
      return resource;
    }

    // POST api/employees
    [HttpPost]
    public async Task<IActionResult> PostAsync([FromBody] SavePersonResource resource)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState.GetErrorMessages());

      var employee = _mapper.Map<SavePersonResource, Employee>(resource);
      var result = await _employeeService.SaveAsync(employee);

      if (!result.Success)
        return BadRequest(result.Message);

      var employeeResource = _mapper.Map<Employee, EmployeeResource>(result.Employee);
      return Ok(employeeResource);
    }

    // GET api/employees/benefits/1
    [HttpGet("benefits/{id}")]
    public async Task<RateCalculation> GetBenefitsRates(string id)
    {
      var employee = await _employeeService.GetAsync(id);

      var rateCalculation = employee.calculateRate();
      return rateCalculation;
    }
  }
}
