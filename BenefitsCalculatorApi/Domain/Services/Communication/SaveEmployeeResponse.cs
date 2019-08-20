using BenefitsCalculatorApi.Domain.Models;

namespace BenefitsCalculatorApi.Domain.Services.Communication
{
    public class SaveEmployeeResponse : BaseResponse
    {
        public Employee Employee { get; private set; }

        private SaveEmployeeResponse(bool success, string message, Employee employee) : base(success, message)
        {
            Employee = employee;
        }

        public SaveEmployeeResponse(Employee employee) : this(true, string.Empty, employee)
        { }

        public SaveEmployeeResponse(string message) : this(false, message, null)
        { }
    }
}