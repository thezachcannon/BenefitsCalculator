using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using BenefitsCalculatorApi.Persistence.Contexts;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace BenefitsCalculatorApi
{
  public class Program
  {
    public static void Main(string[] args)
    {
      var host = BuildWebHost(args);

      using (var scope = host.Services.CreateScope())
      using (var context = scope.ServiceProvider.GetService<AppDbContext>())
      {
        context.Database.EnsureCreated();
      }

      host.Run();
    }

    public static IWebHost BuildWebHost(string[] args) =>
        WebHost.CreateDefaultBuilder(args)
        .UseStartup<Startup>()
        .Build();
  }
}
