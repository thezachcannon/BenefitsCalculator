using BenefitsCalculatorApi.Domain.Models;

namespace BenefitsCalculatorApi.Domain.Services.Communication
{
    public class SaveDependentResponse : BaseResponse
    {
        public Dependent Dependent { get; private set; }

        private SaveDependentResponse(bool success, string message, Dependent dependent) : base(success, message)
        {
            Dependent = dependent;
        }

        public SaveDependentResponse(Dependent dependent) : this(true, string.Empty, dependent)
        { }

        public SaveDependentResponse(string message) : this(false, message, null)
        { }
    }
}