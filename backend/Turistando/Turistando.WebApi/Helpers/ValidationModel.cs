using System.Collections.Generic;

namespace Turistando.WebApi.Helpers
{
    public class ValidationModel
    {
        public ValidationModel()
        {
            this.Valido = true;
            this.Erros = new List<string>();
        }

        public bool Valido { get; set; }
        public ICollection<string> Erros { get; set; }
    }
}