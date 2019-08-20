using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using BenefitsCalculatorApi.Domain.Services;
using BenefitsCalculatorApi.Services;
using BenefitsCalculatorApi.Domain.Repositories;
using BenefitsCalculatorApi.Persistence.Repositories;
using BenefitsCalculatorApi.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace BenefitsCalculatorApi
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

      services.AddDbContext<AppDbContext>(options =>
      {
        options.UseInMemoryDatabase("benefits-calculator-api-in-memory");
      });
      services.AddScoped<IEmployeeService, EmployeeService>();
      services.AddScoped<IEmployeeRepository, EmployeeRepository>();

      services.AddScoped<IDependentService, DependentService>();
      services.AddScoped<IDependentRepository, DependentRepository>();

      services.AddAutoMapper();

      services.AddCors(c =>
      {
        c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin());
      });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
      }

      app.UseHttpsRedirection();
      app.UseCors(options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
      app.UseMvc();
    }
  }
}
