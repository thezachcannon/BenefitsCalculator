using Microsoft.EntityFrameworkCore;
using BenefitsCalculatorApi.Domain.Models;
using System.Collections.Generic;

namespace BenefitsCalculatorApi.Persistence.Contexts
{
  public class AppDbContext : DbContext
  {
    public DbSet<Person> People { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);


      builder.Entity<Person>().ToTable("People")
      .HasDiscriminator<int>("PersonType")
      .HasValue<Employee>(1)
      .HasValue<Dependent>(2);

      builder.Entity<Employee>().HasMany(p => p.Dependents).WithOne(d => d.Employee).HasForeignKey(d => d.EmployeeId);

      builder.Entity<Employee>().HasData
        (
        new Employee { Id = "1", FirstName = "Zach", LastName = "Cannon" },
        new Employee { Id = "2", FirstName = "Johnny", LastName = "Appleseed" }
        );

      builder.Entity<Dependent>().HasData(
        new Dependent { Id= "3", FirstName = "Noah", LastName = "Cannon", EmployeeId = "1"},
        new Dependent { Id= "4", FirstName = "Adam", LastName = "Cannon", EmployeeId = "1"}
      );
    }
  }
}