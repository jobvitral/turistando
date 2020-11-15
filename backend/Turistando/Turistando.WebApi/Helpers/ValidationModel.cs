using System.Collections.Generic;
using Microsoft.VisualBasic;

namespace Turistando.WebApi.Helpers
{
    public class ValidationModel
    {
        public ValidationModel()
        {
            this.Valido = true;
            this.Erros = new List<string>();
        }

        public ValidationModel(string erro)
        {
            this.Valido = true;
            this.Erros = new List<string> {erro};
        }

        public bool Valido { get; set; }
        public ICollection<string> Erros { get; set; }
    }
}